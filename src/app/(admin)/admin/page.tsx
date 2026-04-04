import Link from "next/link"
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"

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

const stats = [
    {
        title: "Doanh thu hom nay",
        value: "12.450.000 VND",
        delta: "+12% so voi hom qua",
        icon: DollarSign,
    },
    {
        title: "Don hang moi",
        value: "38",
        delta: "+6 don trong 1 gio qua",
        icon: ShoppingCart,
    },
    {
        title: "San pham dang ban",
        value: "1.284",
        delta: "24 san pham sap het hang",
        icon: Package,
    },
    {
        title: "Khach hang",
        value: "8.921",
        delta: "+45 tai khoan moi tuan nay",
        icon: Users,
    },
]

const recentOrders = [
    {
        id: "DH-2201",
        customer: "Nguyen Anh",
        total: "560.000 VND",
        status: "Da giao",
    },
    {
        id: "DH-2202",
        customer: "Tran Minh",
        total: "1.240.000 VND",
        status: "Dang xu ly",
    },
    {
        id: "DH-2203",
        customer: "Le Thu",
        total: "890.000 VND",
        status: "Cho thanh toan",
    },
]

export default function AdminPage() {
    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Tong quan Admin</h1>
                    <p className="text-sm text-muted-foreground">
                        Quan ly don hang, san pham va hoat dong ban hang trong ngay.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href="/admin/products">Quan ly san pham</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/products">Xem cua hang</Link>
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
                    <CardTitle>Don hang gan day</CardTitle>
                    <CardDescription>Theo doi trang thai don hang moi nhat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ma don</TableHead>
                                <TableHead>Khach hang</TableHead>
                                <TableHead>Tong tien</TableHead>
                                <TableHead>Trang thai</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                order.status === "Da giao"
                                                    ? "default"
                                                    : order.status === "Dang xu ly"
                                                        ? "secondary"
                                                        : "outline"
                                            }
                                        >
                                            {order.status}
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
