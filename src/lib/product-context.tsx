"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

export interface ApiProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

interface ProductContextType {
    products: ApiProduct[]
    loading: boolean
    error: string | null
    refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<ApiProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch("https://fakestoreapi.com/products")
            if (!response.ok) throw new Error("Failed to fetch products")
            const data = await response.json()
            setProducts(data)
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred"
            setError(message)
            toast.error("Co loi khi tai san pham: " + message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <ProductContext.Provider value={{ products, loading, error, refreshProducts: fetchProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProductContext() {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error("useProductContext must be used within a ProductProvider")
    }
    return context
}
