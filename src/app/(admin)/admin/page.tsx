import Link from "next/link"
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { fetchOrders, getOrderStats } from "../../../../mock/order"
import { type Order, type OrderStatus } from "@/apis/orderApi"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price)
}

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

function statusVariant(status: OrderStatus): "default" | "secondary" | "outline" {
    if (status === "completed") {
        return "default"
    }

    if (status === "processing" || status === "shipping") {
        return "secondary"
    }

    return "outline"
}

function getTodayOrderCount(orders: Order[]): number {
    const now = new Date()
    return orders.filter((order) => {
        const createdAt = new Date(order.createdAt)
        return (
            createdAt.getDate() === now.getDate() &&
            createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear()
        )
    }).length
}

export default async function AdminPage() {
    const orders = await fetchOrders()
    const orderStats = getOrderStats(orders)
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6)

    const uniqueCustomers = new Set(orders.map((order) => order.userId)).size
    const processingOrders = orderStats.pending + orderStats.processing + orderStats.shipping

    const stats = [
        {
            title: "Doanh thu hoàn thành",
            value: formatPrice(orderStats.totalRevenue),
            delta: `${orderStats.completed} don da hoàn thành`,
            icon: DollarSign,
        },
        {
            title: "Tổng đơn hàng",
            value: String(orderStats.total),
            delta: `${getTodayOrderCount(orders)} don tao hôm nay`,
            icon: ShoppingCart,
        },
        {
            title: "Don can xu ly",
            value: String(processingOrders),
            delta: `${orderStats.pending} chờ xử lý, ${orderStats.shipping} đang giao`,
            icon: Package,
        },
        {
            title: "Khách hàng dat don",
            value: String(uniqueCustomers),
            delta: "Tính theo userId  trong dữ liệu don",
            icon: Users,
        },
    ]
    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Tổng quan Admin</h1>
                    <p className="text-sm text-muted-foreground">
                        Quản lý đơn hàng, sản phẩm va hoat dong ban hang  trong ngày.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href="/admin/products">Quản lý sản phẩm</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/products">Xem cửa hàng</Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                    const Icon = item.icon
                    return (
                        <Card key={item.title}>
                            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <p className="text-2xl font-bold">{item.value}</p>
                                <p className="text-xs text-muted-foreground">{item.delta}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Đơn hàng gần đây</CardTitle>
                    <CardDescription>Theo dõi trạng thái đơn hàng moi nhat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ma don</TableHead>
                                <TableHead>Khách hàng</TableHead>
                                <TableHead>Tổng tien</TableHead>
                                <TableHead>Trạng thái</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">DH-{order.id}</TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>{formatPrice(order.finalAmount)}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant(order.status)}>
                                            {statusLabel(order.status)}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
