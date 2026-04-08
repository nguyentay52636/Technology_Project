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

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)

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

  // Get single cart by ID
  getCartById: async (cartId: string | number): Promise<Cart> => {
    return fetchJson<Cart>(`${BASE_URL}/${cartId}`)
  },

  // 📝 POST cart - create new cart
  // This will create a new cart with initial products
  createCart: async (userId: string | number, products: CartProduct[]): Promise<Cart> => {
    return fetchJson<Cart>(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, products }),
    })
  },

  // 📝 PATCH cart - update products
  // This will add new product or update existing quantity
  patchCart: async (cartId: string | number, products: CartProduct[]): Promise<Cart> => {
    return fetchJson<Cart>(`${BASE_URL}/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    })
  },

  // 🗑️ DELETE cart - remove cart completely
  deleteCart: async (cartId: string | number): Promise<{ id: number }> => {
    return fetchJson<{ id: number }>(`${BASE_URL}/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
