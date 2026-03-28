"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((i) => i.id === item.id)
            if (existingItem) {
                return currentItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...currentItems, { ...item, quantity: 1 }]
        })
        setIsCartOpen(true)
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((currentItems) => currentItems.filter((item) => item.id !== id))
        } else {
            setItems((currentItems) =>
                currentItems.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            )
        }
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
                itemCount,
                isCartOpen,
                setIsCartOpen,
            }
            }
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
