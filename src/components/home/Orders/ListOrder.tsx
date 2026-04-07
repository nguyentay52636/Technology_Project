import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type Order, type OrderStatus } from "@/apis/orderApi"
import OrderItem from "./OrderItem"

interface ListOrderProps {
    loading: boolean
    orders: Order[]
    activeTab: string
}

const orderStatusLabel: Record<OrderStatus, string> = {
    pending: "Cho duyet",
    processing: "Dang xu ly",
    shipping: "Dang giao",
    completed: "Hoan thanh",
    cancelled: "Da huy",
}

export default function ListOrder({ loading, orders, activeTab }: ListOrderProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium">Khong co don hang</h3>
                    <p className="mb-4 text-center text-muted-foreground">
                        {activeTab === "all"
                            ? "Ban chua co don hang nao. Hay bat dau mua sam!"
                            : `Khong co don hang nao o trang thai "${orderStatusLabel[activeTab as OrderStatus] || activeTab}"`}
                    </p>
                    <Button asChild>
                        <Link href="/">Mua sam ngay</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </>
    )
}
