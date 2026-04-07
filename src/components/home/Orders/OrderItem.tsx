"use client"

import { useState } from "react"
import Image from "next/image"
import {
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    CreditCard,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { type Order, type OrderStatus, type PaymentStatus } from "@/apis/orderApi"
import { formatPrice, formatDate, formatPaymentMethod } from "@/utils/format"

interface OrderItemProps {
    order: Order
}

const orderStatusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
    pending: {
        label: "Cho duyet",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: <Clock className="h-4 w-4" />,
    },
    processing: {
        label: "Dang xu ly",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Package className="h-4 w-4" />,
    },
    shipping: {
        label: "Dang giao",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: <Truck className="h-4 w-4" />,
    },
    completed: {
        label: "Hoan thanh",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: <CheckCircle className="h-4 w-4" />,
    },
    cancelled: {
        label: "Da huy",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="h-4 w-4" />,
    },
}

const paymentStatusConfig: Record<PaymentStatus, { label: string; color: string }> = {
    pending: { label: "Chua thanh toan", color: "bg-amber-100 text-amber-800" },
    paid: { label: "Da thanh toan", color: "bg-emerald-100 text-emerald-800" },
    failed: { label: "That bai", color: "bg-red-100 text-red-800" },
    refunded: { label: "Da hoan tien", color: "bg-gray-100 text-gray-800" },
}

export default function OrderItem({ order }: OrderItemProps) {
    const [expanded, setExpanded] = useState(false)
    const statusConfig = orderStatusConfig[order.status]
    const paymentConfig = paymentStatusConfig[order.paymentStatus]

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">Don hang #{order.id}</CardTitle>
                        <Badge variant="outline" className={statusConfig.color}>
                            <span className="mr-1">{statusConfig.icon}</span>
                            {statusConfig.label}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formatDate(order.createdAt)}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {order.items.slice(0, 3).map((item, index) => (
                                <div
                                    key={item.id}
                                    className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-background bg-muted"
                                    style={{ zIndex: 3 - index }}
                                >
                                    {item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.productTitle}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    ) : null}
                                </div>
                            ))}
                            {order.items.length > 3 && (
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-background bg-muted text-xs font-medium">
                                    +{order.items.length - 3}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">{order.items.length} san pham</p>
                            <p className="text-sm text-muted-foreground">
                                {order.items.map((i) => i.productTitle).slice(0, 2).join(", ")}
                                {order.items.length > 2 && "..."}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-accent">{formatPrice(order.finalAmount)}</p>
                        <Badge variant="outline" className={paymentConfig.color}>
                            <CreditCard className="mr-1 h-3 w-3" />
                            {paymentConfig.label}
                        </Badge>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? (
                        <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Thu gon
                        </>
                    ) : (
                        <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            Xem chi tiet
                        </>
                    )}
                </Button>

                {
                    expanded && (
                        <div className="space-y-4 pt-2">
                            <Separator />
                            <div className="space-y-3">
                                <h4 className="font-medium">San pham</h4>
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-background">
                                            {item.thumbnail ? (
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.productTitle}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            ) : null}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium line-clamp-1">{item.productTitle}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatPrice(item.productPrice)} x {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium">{formatPrice(item.productPrice * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h4 className="mb-2 font-medium">Thong tin giao hang</h4>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="text-muted-foreground">Nguoi nhan:</span> {order.customerName}</p>
                                        <p><span className="text-muted-foreground">SDT:</span> {order.customerPhone}</p>
                                        <p><span className="text-muted-foreground">Dia chi:</span> {order.shippingAddress}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-medium">Thanh toan</h4>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="text-muted-foreground">Phuong thuc:</span> {formatPaymentMethod(order.paymentMethod)}</p>
                                        <p><span className="text-muted-foreground">Tam tinh:</span> {formatPrice(order.totalAmount)}</p>
                                        {(order.discountAmount ?? 0) > 0 && (
                                            <p><span className="text-muted-foreground">Giam gia:</span> -{formatPrice(order.discountAmount ?? 0)}</p>
                                        )}
                                        <p className="font-medium"><span className="text-muted-foreground">Tong cong:</span> {formatPrice(order.finalAmount)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                {order.status === "pending" && (
                                    <Button variant="destructive" size="sm">Huy don hang</Button>
                                )}
                                {order.status === "completed" && (
                                    <Button variant="outline" size="sm">Mua lai</Button>
                                )}
                                <Button variant="outline" size="sm">Lien he ho tro</Button>
                            </div>
                        </div>
                    )
                }
            </CardContent >
        </Card >
    )
}
