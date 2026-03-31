"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

export interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    description?: string
    image: string
    rating: number
    reviews: number
    category: string
    isNew?: boolean
    isSale?: boolean
}

interface ProductCardProps {
    product: Product
}

export function CardProduct({ product }: ProductCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const { addItem } = useCart()

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
        })
        toast.success(`Đã thêm ${product.name} vào giỏ hàng`, {
            description: "Mở giỏ hàng để xem chi tiết",
            action: {
                label: "Xem giỏ",
                onClick: () => console.log("Open cart"), // This should ideally be a call to setIsCartOpen(true) but that's handled by addItem
            },
        })
    }

    return (
        <div
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Badges */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <Badge className="bg-foreground text-background">Mới</Badge>
                )}
                {product.isSale && discount > 0 && (
                    <Badge variant="destructive">-{discount}%</Badge>
                )}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
            >
                <Heart
                    className={cn(
                        "h-5 w-5 transition-colors",
                        isLiked ? "fill-accent text-accent" : "text-muted-foreground"
                    )}
                />
            </button>

            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-white p-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Quick Add Button */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 flex justify-center p-3 transition-all duration-300",
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    )}
                >
                    <Button className="w-full gap-2" onClick={handleAddToCart}>
                        <ShoppingCart className="h-4 w-4" />
                        Thêm vào giỏ
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {product.category}
                </p>
                <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium">{product.name}</h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "h-3.5 w-3.5",
                                    i < Math.floor(product.rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted-foreground/30"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
