import { fetchOrders } from "../../../../../mock/order"
import { type Order, type OrderStatus, type PaymentMethod, type PaymentStatus } from "@/apis/orderApi"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatPrice } from "@/utils/format"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

function statusLabel(status: OrderStatus): string {
	const labels: Record<OrderStatus, string> = {
		pending: "Chờ xử lý",
		processing: "Đang xử lý",
		shipping: "Đang giao",
		completed: "Hoàn thành",
		cancelled: "Đã hủy",
	}
	return labels[status]
}

function paymentStatusLabel(status: PaymentStatus): string {
	const labels: Record<PaymentStatus, string> = {
		pending: "Cho thanh toan",
		paid: "Da thanh toan",
		failed: "Thanh toán loi",
		refunded: "Da hoan tien",
	}
	return labels[status]
}

function paymentMethodLabel(method?: PaymentMethod): string {
	const labels: Record<PaymentMethod, string> = {
		cod: "Tiền mặt",
		bank_transfer: "Chuyển khoản",
		credit_card: "The",
		momo: "MoMo",
		vnpay: "VNPay",
	}

	if (!method) {
		return "Không ro"
	}

	return labels[method]
}

function statusVariant(status: OrderStatus): "default" | "secondary" | "outline" {
	if (status === "completed") {
		return "default"
	}
	if (status === "processing" || status === "shipping") {
		return "secondary"
	}
	return "outline"
}

function toPercent(value: number, total: number): number {
	if (!total) {
		return 0
	}
	return Math.round((value / total) * 100)
}

export default async function AdminStatisticsPage() {
	const orders = await fetchOrders()

	const totalOrders = orders.length
	const completedOrders = orders.filter((o) => o.status === "completed")
	const pendingOrders = orders.filter((o) => o.status === "pending").length
	const cancelledOrders = orders.filter((o) => o.status === "cancelled").length
	const totalRevenue = completedOrders.reduce((sum, o) => sum + o.finalAmount, 0)
	const totalDiscount = orders.reduce((sum, o) => sum + (o.discountAmount ?? 0), 0)
	const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length
	const uniqueCustomers = new Set(orders.map((o) => o.userId)).size
	const totalItems = orders.reduce(
		(sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
		0
	)

	const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0
	const completionRate = toPercent(completedOrders.length, totalOrders)
	const paidRate = toPercent(paidOrders, totalOrders)

	const statusCounts: Record<OrderStatus, number> = {
		pending: 0,
		processing: 0,
		shipping: 0,
		completed: 0,
		cancelled: 0,
	}

	const paymentMethodCounts: Record<string, number> = {}
	const dailyRevenue = new Map<string, { revenue: number; orders: number }>()
	const customerSummary = new Map<number, { name: string; orders: number; revenue: number }>()

	for (const order of orders) {
		statusCounts[order.status] += 1

		const method = paymentMethodLabel(order.paymentMethod)
		paymentMethodCounts[method] = (paymentMethodCounts[method] ?? 0) + 1

		const day = formatDate(order.createdAt)
		const dayRow = dailyRevenue.get(day) ?? { revenue: 0, orders: 0 }
		dailyRevenue.set(day, {
			revenue: dayRow.revenue + (order.status === "completed" ? order.finalAmount : 0),
			orders: dayRow.orders + 1,
		})

		const customer = customerSummary.get(order.userId) ?? {
			name: order.customerName,
			orders: 0,
			revenue: 0,
		}
		customerSummary.set(order.userId, {
			name: customer.name,
			orders: customer.orders + 1,
			revenue: customer.revenue + order.finalAmount,
		})
	}

	const topCustomers = Array.from(customerSummary.entries())
		.map(([userId, value]) => ({ userId, ...value }))
		.sort((a, b) => b.revenue - a.revenue)
		.slice(0, 5)

	const dailyRevenueRows = Array.from(dailyRevenue.entries())
		.map(([date, value]) => ({ date, ...value }))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const latestOrders = [...orders]
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 8)

	return (
		<div className="space-y-6 p-6 md:p-8">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Thông ke chi tiet</h1>
				<p className="text-sm text-muted-foreground">
					Tổng hop hiệu suất đơn hàng va doanh thu tu dữ liệu mock.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<Card>
					<CardHeader className="space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Tổng đơn hàng</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{totalOrders}</p>
						<p className="text-xs text-muted-foreground">{totalItems} sản phẩm da dat</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Doanh thu hoàn thành</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
						<p className="text-xs text-muted-foreground">AOV: {formatPrice(averageOrderValue)}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Ty le hoàn thành</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{completionRate}%</p>
						<p className="text-xs text-muted-foreground">{completedOrders.length}/{totalOrders} don</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Khách hàng dat don</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{uniqueCustomers}</p>
						<p className="text-xs text-muted-foreground">Ty le da thanh toan: {paidRate}%</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Phan bo trạng thái don</CardTitle>
						<CardDescription>{pendingOrders} don chờ xử lý, {cancelledOrders} don đã hủy</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{(Object.keys(statusCounts) as OrderStatus[]).map((status) => {
							const count = statusCounts[status]
							const percent = toPercent(count, totalOrders)
							return (
								<div key={status} className="space-y-1">
									<div className="flex items-center justify-between text-sm">
										<span>{statusLabel(status)}</span>
										<span className="text-muted-foreground">{count} don ({percent}%)</span>
									</div>
									<div className="h-2 rounded-full bg-muted">
										<div className="h-2 rounded-full bg-primary" style={{ width: `${percent}%` }} />
									</div>
								</div>
							)
						})}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Phuong thuc thanh toan</CardTitle>
						<CardDescription>Gom theo paymentMethod  trong đơn hàng</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{Object.entries(paymentMethodCounts)
							.sort((a, b) => b[1] - a[1])
							.map(([method, count]) => {
								const percent = toPercent(count, totalOrders)
								return (
									<div key={method} className="flex items-center justify-between rounded-md border p-3 text-sm">
										<span>{method}</span>
										<span className="text-muted-foreground">{count} don ({percent}%)</span>
									</div>
								)
							})}
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 xl:grid-cols-3">
				<Card className="xl:col-span-2">
					<CardHeader>
						<CardTitle>Doanh thu theo ngày</CardTitle>
						<CardDescription>Chi tinh doanh thu don hoàn thành</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Ngay</TableHead>
									<TableHead>So don</TableHead>
									<TableHead className="text-right">Doanh thu</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{dailyRevenueRows.map((row) => (
									<TableRow key={row.date}>
										<TableCell>{row.date}</TableCell>
										<TableCell>{row.orders}</TableCell>
										<TableCell className="text-right">{formatPrice(row.revenue)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Top khách hàng</CardTitle>
						<CardDescription>Theo gia tri đơn hàng</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{topCustomers.map((customer) => (
							<div key={customer.userId} className="rounded-md border p-3">
								<p className="text-sm font-medium">{customer.name}</p>
								<p className="text-xs text-muted-foreground">User #{customer.userId} • {customer.orders} don</p>
								<p className="mt-1 text-sm font-semibold">{formatPrice(customer.revenue)}</p>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Đơn hàng moi nhat</CardTitle>
					<CardDescription>Trạng thái don va thanh toan gần nhất</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ma don</TableHead>
								<TableHead>Khách hàng</TableHead>
								<TableHead>Ngay tao</TableHead>
								<TableHead>Thanh toán</TableHead>
								<TableHead className="text-right">Tổng tien</TableHead>
								<TableHead>Trạng thái</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{latestOrders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">DH-{order.id}</TableCell>
									<TableCell>{order.customerName}</TableCell>
									<TableCell>{formatDate(order.createdAt)}</TableCell>
									<TableCell>{paymentStatusLabel(order.paymentStatus)}</TableCell>
									<TableCell className="text-right">{formatPrice(order.finalAmount)}</TableCell>
									<TableCell>
										<Badge variant={statusVariant(order.status)}>{statusLabel(order.status)}</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Chi phi giam gia</CardTitle>
					<CardDescription>Tổng ưu đãi da ap dung tren toan bo don</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{formatPrice(totalDiscount)}</p>
					<p className="text-sm text-muted-foreground">Tinh tổng tu truong discountAmount cua đơn hàng.</p>
				</CardContent>
			</Card>
		</div>
	)
}
