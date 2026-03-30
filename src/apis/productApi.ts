export interface Product {
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

export const productApi = {
    getProducts: async (): Promise<Product[]> => {
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        return await response.json()
    },
}
