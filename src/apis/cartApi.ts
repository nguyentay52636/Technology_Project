export interface CartProduct {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedTotal: number
  thumbnail: string
}

export interface Cart {
  id: number
  products: CartProduct[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

interface UserCartsResponse {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}

const BASE_URL = "https://dummyjson.com/carts"

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const cartApi = {
  getCartsByUserId: async (userId: string | number): Promise<Cart[]> => {
    const data = await fetchJson<UserCartsResponse>(`${BASE_URL}/user/${userId}`)
    return data.carts
  },

  // Some users may have multiple carts. This method flattens products
  // and keeps one entry per product id with summed quantity.
  getMergedProductsByUserId: async (userId: string | number): Promise<CartProduct[]> => {
    const carts = await cartApi.getCartsByUserId(userId)

    const productMap = new Map<number, CartProduct>()

    for (const cart of carts) {
      for (const product of cart.products) {
        const existing = productMap.get(product.id)

        if (!existing) {
          productMap.set(product.id, { ...product })
          continue
        }

        const quantity = existing.quantity + product.quantity
        const total = existing.total + product.total
        const discountedTotal = existing.discountedTotal + product.discountedTotal

        productMap.set(product.id, {
          ...existing,
          quantity,
          total,
          discountedTotal,
        })
      }
    }

    return Array.from(productMap.values())
  },
}
