"use client"

import { useProductContext } from "@/lib/product-context"

export function useProduct() {
    const { products, loading, error, refreshProducts } = useProductContext()
    return { products, loading, error, refreshProducts }
}
