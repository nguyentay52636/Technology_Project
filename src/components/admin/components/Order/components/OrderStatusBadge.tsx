"use client"

import { Badge } from "@/components/ui/badge"
import {
    Clock,
    Settings,
    Truck,
    CheckCircle,
    XCircle,
    CreditCard,
    AlertCircle,
    RefreshCcw
} from "lucide-react"

type OrderStatus = "pending" | "processing" | "shipping" | "completed" | "cancelled"
type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

interface OrderStatusBadgeProps {
    status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const config: Record<OrderStatus, { label: string; className: string; icon: typeof Clock }> = {
        pending: {
            label: "Cho xu ly",
            className: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
            icon: Clock,
        },
        processing: {
            label: "Dang xu ly",
            className: "bg-blue-500/10 text-blue-600 border-blue-200",
            icon: Settings,
        },
        shipping: {
            label: "Dang giao",
            className: "bg-purple-500/10 text-purple-600 border-purple-200",
            icon: Truck,
        },
        completed: {
            label: "Hoan thanh",
            className: "bg-green-500/10 text-green-600 border-green-200",
            icon: CheckCircle,
        },
        cancelled: {
            label: "Da huy",
            className: "bg-red-500/10 text-red-600 border-red-200",
            icon: XCircle,
        },
    }

    const { label, className, icon: Icon } = config[status]

    return (
        <Badge variant="outline" className={`gap-1 ${className}`}>
            <Icon className="h-3 w-3" />
            {label}
        </Badge>
    )
}

interface PaymentStatusBadgeProps {
    status: PaymentStatus
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    const config: Record<PaymentStatus, { label: string; className: string; icon: typeof Clock }> = {
        pending: {
            label: "Chua thanh toan",
            className: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
            icon: Clock,
        },
        paid: {
            label: "Da thanh toan",
            className: "bg-green-500/10 text-green-600 border-green-200",
            icon: CreditCard,
        },
        failed: {
            label: "That bai",
            className: "bg-red-500/10 text-red-600 border-red-200",
            icon: AlertCircle,
        },
        refunded: {
            label: "Da hoan tien",
            className: "bg-gray-500/10 text-gray-600 border-gray-200",
            icon: RefreshCcw,
        },
    }

    const { label, className, icon: Icon } = config[status]

    return (
        <Badge variant="outline" className={`gap-1 ${className}`}>
            <Icon className="h-3 w-3" />
            {label}
        </Badge>
    )
}
