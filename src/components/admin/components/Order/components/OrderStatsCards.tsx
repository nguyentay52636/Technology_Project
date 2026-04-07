"use client"

import {
    ShoppingCart,
    Clock,
    Truck,
    CheckCircle,
    DollarSign
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "../../../../../../utils/format"

interface OrderStatsCardsProps {
    stats: {
        total: number
        pending: number
        processing: number
        shipping: number
        completed: number
        cancelled: number
        totalRevenue: number
    }
}

export function OrderStatsCards({ stats }: OrderStatsCardsProps) {
    const cards = [
        {
            title: "Tong don hang",
            value: stats.total,
            icon: ShoppingCart,
            color: "bg-blue-500/10 text-blue-600",
        },
        {
            title: "Cho xu ly",
            value: stats.pending,
            icon: Clock,
            color: "bg-yellow-500/10 text-yellow-600",
        },
        {
            title: "Dang giao",
            value: stats.shipping,
            icon: Truck,
            color: "bg-purple-500/10 text-purple-600",
        },
        {
            title: "Hoan thanh",
            value: stats.completed,
            icon: CheckCircle,
            color: "bg-green-500/10 text-green-600",
        },
        {
            title: "Doanh thu",
            value: formatPrice(stats.totalRevenue),
            icon: DollarSign,
            color: "bg-emerald-500/10 text-emerald-600",
            isPrice: true,
        },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((card) => (
                <Card key={card.title}>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className={`rounded-lg p-2.5 ${card.color}`}>
                            <card.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{card.title}</p>
                            <p className={`font-semibold ${card.isPrice ? "text-lg" : "text-2xl"}`}>
                                {card.value}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
