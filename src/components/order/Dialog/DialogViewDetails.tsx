"use client"

import { MapPin, Phone, Mail, Package, Calendar, CreditCard } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type Order, type OrderStatus } from "@/apis/orderApi"
import { OrderStatusBadge, PaymentStatusBadge } from "../OrderStatusBadge"
import { formatPrice, formatDateTime, formatPaymentMethod } from "@/utils/format"

interface OrderDetailDialogProps {
    order: Order | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onUpdateStatus: (orderId: number, status: OrderStatus) => void
}

export function OrderDetailDialog({
    order,
    open,
    onOpenChange,
    onUpdateStatus,
}: OrderDetailDialogProps) {
    if (!order) return null

    const getNextStatus = (): OrderStatus | null => {
        switch (order.status) {
            case "pending":
                return "processing"
            case "processing":
                return "shipping"
            case "shipping":
                return "completed"
            default:
                return null
        }
    }

    const getNextStatusLabel = (): string => {
        switch (order.status) {
            case "pending":
                return "Xu ly don"
            case "processing":
                return "Bat dau giao"
            case "shipping":
                return "Hoàn thành"
            default:
                return ""
        }
    }

    const nextStatus = getNextStatus()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl! max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Chi tiet đơn hàng #{order.id}</span>
                        <OrderStatusBadge status={order.status} />
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3 font-semibold">Thông tin khách hàng</h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{order.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{order.customerPhone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm sm:col-span-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{order.customerEmail}</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm sm:col-span-2">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                    <span>{order.shippingAddress}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Info */}
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3 font-semibold">Thông tin đơn hàng</h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{formatDateTime(order.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
x                                    <span>{formatPaymentMethod(order.paymentMethod)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Thanh toán:</span>
                                    <PaymentStatusBadge status={order.paymentStatus} />
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3 font-semibold">Sản phẩm ({order.items.length})</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={item.id || index} className="flex gap-3">
                                        {item.thumbnail && (
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.productTitle}
                                                    className="h-full w-full object-contain p-1"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-1 flex-col justify-center">
                                            <p className="font-medium line-clamp-2">{item.productTitle}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-sm text-muted-foreground">
                                                    {formatPrice(item.productPrice)} x {item.quantity}
                                                </span>
                                                <span className="font-medium">
                                                    {formatPrice(item.productPrice * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3 font-semibold">Tổng ket</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tam tinh</span>
                                    <span>{formatPrice(order.totalAmount)}</span>
                                </div>
                                {order.discountAmount && order.discountAmount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Giam gia</span>
                                        <span className="text-green-600">
                                            -{formatPrice(order.discountAmount)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Phi van chuyển</span>
                                    <span className="text-green-600">Mien phi</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>Tổng cong</span>
                                    <span className="text-lg">{formatPrice(order.finalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        {order.status !== "completed" && order.status !== "cancelled" && (
                            <div className="flex gap-2">
                                {nextStatus && (
                                    <Button
                                        className="flex-1"
                                        onClick={() => {
                                            onUpdateStatus(order.id, nextStatus)
                                            onOpenChange(false)
                                        }}
                                    >
                                        {getNextStatusLabel()}
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        onUpdateStatus(order.id, "cancelled")
                                        onOpenChange(false)
                                    }}
                                >
                                    Huy don
                                </Button>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
