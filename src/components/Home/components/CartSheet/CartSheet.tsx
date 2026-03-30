"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"


function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price)
}

export function CartSheet() {
    const { items, removeItem, updateQuantity, total, itemCount, isCartOpen, setIsCartOpen, clearCart } = useCart()

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle className="flex items-center gap-2 font-serif text-xl">
                        <ShoppingBag className="h-5 w-5" />
                        Giỏ hàng ({itemCount})
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <ShoppingBag />
                                </EmptyMedia>
                                <EmptyTitle>Giỏ hàng trống</EmptyTitle>
                                <EmptyDescription>Chưa có sản phẩm nào trong giỏ hàng</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                        <Button className="mt-4" onClick={() => setIsCartOpen(false)}>
                            Tiếp tục mua sắm
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-4">
                            <div className="flex flex-col gap-4 py-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white p-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">{item.category}</p>
                                                    <h4 className="line-clamp-1 text-sm font-medium">{item.name}</h4>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <p className="text-sm font-semibold">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="space-y-4 pt-4">
                            <Separator />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Tạm tính</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Phí vận chuyển</span>
                                    <span className="text-green-600">Miễn phí</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between font-semibold">
                                <span>Tổng cộng</span>
                                <span className="text-lg">{formatPrice(total)}</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button size="lg" className="w-full">
                                    Thanh toán ({formatPrice(total)})
                                </Button>
                                <Button variant="outline" size="lg" className="w-full gap-2" onClick={clearCart}>
                                    <Trash2 className="h-4 w-4" />
                                    Xóa giỏ hàng
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
