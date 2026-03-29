"use client"

import { useState, useCallback, useEffect } from "react"
import { toast } from "sonner"
import { productApi, type Product } from "@/app/apis/productApi"

export function useProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await productApi.getProducts()
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

    return {
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
    }
}
