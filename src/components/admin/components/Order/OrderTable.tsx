"use client"

import { MoreHorizontal, Eye, Truck, CheckCircle, XCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Order, type OrderStatus } from "@/apis/orderApi"
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge"
import { formatPrice, formatDate } from "@/utils/format"

interface OrderTableProps {
    orders: Order[]
    onViewDetail: (order: Order) => void
    onUpdateStatus: (orderId: number, status: OrderStatus) => void
}

export function OrderTable({ orders, onViewDetail, onUpdateStatus }: OrderTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Ma don</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead className="hidden lg:table-cell">Sản phẩm</TableHead>
                    <TableHead>Tổng tien</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="hidden md:table-cell">Thanh toán</TableHead>
                    <TableHead className="hidden sm:table-cell">Ngay dat</TableHead>
                    <TableHead className="w-12"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                            Không co đơn hàng nao
                        </TableCell>
                    </TableRow>
                ) : (
                    orders.map((order) => (
                        <TableRow
                            key={order.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => onViewDetail(order)}
                        >
                            <TableCell className="font-medium">#{order.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs bg-primary/10">
                                            {order.customerName
                                                .split(" ")
                                                .map((n: string) => n[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{order.customerName}</p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {order.customerPhone}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden max-w-[200px] lg:table-cell">
                                <div className="flex items-center gap-2">
                                    {order.items[0]?.thumbnail && (
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border">
                                            <img
                                                src={order.items[0].thumbnail}
                                                alt={order.items[0].productTitle}
                                                className="h-full w-full object-contain p-1"
                                            />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="truncate text-sm">{order.items[0]?.productTitle}</p>
                                        {order.items.length > 1 && (
                                            <p className="text-xs text-muted-foreground">
                                                +{order.items.length - 1} sản phẩm khac
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium">{formatPrice(order.finalAmount)}</p>
                                    {order.discountAmount && order.discountAmount > 0 && (
                                        <p className="text-xs text-green-600">
                                            -{formatPrice(order.discountAmount)}
                                        </p>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <OrderStatusBadge status={order.status} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <PaymentStatusBadge status={order.paymentStatus} />
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground">
                                {formatDate(order.createdAt)}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenuItem onClick={() => onViewDetail(order)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Xem chi tiet
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {order.status === "pending" && (
                                            <DropdownMenuItem
                                                onClick={() => onUpdateStatus(order.id, "processing")}
                                            >
                                                <Settings className="mr-2 h-4 w-4" />
                                                Xu ly don
                                            </DropdownMenuItem>
                                        )}
                                        {order.status === "processing" && (
                                            <DropdownMenuItem
                                                onClick={() => onUpdateStatus(order.id, "shipping")}
                                            >
                                                <Truck className="mr-2 h-4 w-4" />
                                                Giao hang
                                            </DropdownMenuItem>
                                        )}
                                        {order.status === "shipping" && (
                                            <DropdownMenuItem
                                                onClick={() => onUpdateStatus(order.id, "completed")}
                                            >
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Hoàn thành
                                            </DropdownMenuItem>
                                        )}
                                        {order.status !== "completed" && order.status !== "cancelled" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => onUpdateStatus(order.id, "cancelled")}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Huy don
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
