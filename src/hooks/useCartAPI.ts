"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import { cartApi } from "@/apis/cartApi"

export function useCartAPI() {
  const { addItem, updateQuantity, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [cartId, setCartId] = useState<number | null>(null)

  /**
   * 📍 Lấy userId từ localStorage (đã lưu khi login)
   */
  const getCurrentUserId = useCallback((): number => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          return user.id
        } catch {
          return 1
        }
      }
    }
    return 1
  }, [])

  /**
   * 🔄 KHỞI TẠO GIỎ - Gọi khi user login
   * Load giỏ hiện tại từ API (chỉ cho khách hàng đã có giỏ)
   */
  const initializeCart = useCallback(async () => {
    try {
      const userId = getCurrentUserId()

      const userCarts = await cartApi.getCartsByUserId(userId)

      if (userCarts.length > 0) {
        // ✅ User có ít nhất 1 giỏ → lấy giỏ đầu tiên
        const cart = userCarts[0]
        setCartId(cart.id)

        // Load sản phẩm vào Context
        cart.products.forEach((product) => {
          addItem({
            id: String(product.id),
            name: product.title,
            price: product.price,
            image: product.thumbnail,
            quantity: product.quantity,
          })
        })
      } else {
        // ❌ User chưa có giỏ
        setCartId(null)
      }
    } catch (error) {
      console.warn("⚠️ Error loading cart:", error)
      // Không show toast vì có thể user không có cart sẵn
    }
  }, [getCurrentUserId, addItem])

  /**
   * ✨ THÊM SẢN PHẨM VÀO GIỎ (PATCH hoặc POST)
   * - Nếu user có cart → PATCH
   * - Nếu user chưa có cart → POST (tạo mới)
   */
  const addToCartAPI = useCallback(
    async (product: {
      id: string | number
      name: string
      price: number
      image: string
      category?: string
    }) => {
      try {
        setLoading(true)
        const userId = getCurrentUserId()
        const productId = Number(product.id)

        // Lấy danh sách giỏ của user
        const userCarts = await cartApi.getCartsByUserId(userId)
        let currentCartId = cartId

        if (userCarts.length === 0) {
          // ❌ USER CHƯA CÓ GIỎ → POST tạo mới
          const newProduct: any = {
            id: productId,
            title: product.name,
            price: product.price,
            quantity: 1,
            thumbnail: product.image,
            total: product.price,
            discountPercentage: 0,
            discountedTotal: product.price,
          }

          try {
            const newCart = await cartApi.createCart(userId, [newProduct])
            currentCartId = newCart.id
            setCartId(currentCartId)
            toast.success(`✅ Tạo giỏ hàng và thêm "${product.name}"`)
          } catch (postError) {
            console.error("❌ POST failed (expected):", postError)
            toast.error(`❌ POST chỉ trả status - điều tôi muốn chứng minh`)
            return
          }
        } else {
          // ✅ USER ĐÃ CÓ GIỎ → PATCH cập nhật
          currentCartId = userCarts[0].id
          setCartId(currentCartId)

          // Lấy giỏ hiện tại
          const cart = await cartApi.getCartById(currentCartId)

          // Kiểm tra sản phẩm đã có trong giỏ chưa
          const existingProduct = cart.products.find((p) => p.id === productId)

          if (existingProduct) {
            // 📝 Sản phẩm đã có → tăng số lượng
            existingProduct.quantity += 1
            existingProduct.total = existingProduct.price * existingProduct.quantity
          } else {
            // ➕ Sản phẩm mới → thêm vào
            cart.products.push({
              id: productId,
              title: product.name,
              price: product.price,
              quantity: 1,
              thumbnail: product.image,
              total: product.price,
              discountPercentage: 0,
              discountedTotal: product.price,
            })
          }

          // ✏️ PATCH cập nhật cart
          await cartApi.patchCart(currentCartId, cart.products)
          toast.success(`✅ Thêm "${product.name}" vào giỏ`)
        }

        // Cập nhật Context
        addItem({
          id: String(productId),
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        })
      } catch (error) {
        console.error("❌ Error adding to cart:", error)
        toast.error(
          `❌ ${error instanceof Error ? error.message : "Lỗi thêm vào giỏ"}`
        )
      } finally {
        setLoading(false)
      }
    },
    [cartId, getCurrentUserId, addItem]
  )

  /**
   * 📊 CẬP NHẬT SỐ LƯỢNG SẢN PHẨM (PATCH)
   * Auto-load cart nếu chưa được load
   */
  const updateQuantityAPI = useCallback(
    async (productId: string | number, newQuantity: number) => {
      try {
        setLoading(true)

        let currentCartId = cartId

        // 🔄 Nếu chưa có cartId, auto-load từ API
        if (!currentCartId) {
          const userId = getCurrentUserId()
          const userCarts = await cartApi.getCartsByUserId(userId)

          if (userCarts.length === 0) {
            toast.error("❌ Không có giỏ hàng")
            return
          }

          currentCartId = userCarts[0].id
          setCartId(currentCartId)
        }

        // Lấy giỏ hiện tại
        const cart = await cartApi.getCartById(currentCartId)
        const pId = Number(productId)

        if (newQuantity <= 0) {
          // ✂️ Xóa sản phẩm (quantity = 0)
          cart.products = cart.products.filter((p) => p.id !== pId)
        } else {
          // 📝 Cập nhật số lượng
          const product = cart.products.find((p) => p.id === pId)
          if (product) {
            product.quantity = newQuantity
            product.total = product.price * newQuantity
          }
        }

        // ✏️ PATCH cập nhật cart
        await cartApi.patchCart(currentCartId, cart.products)

        // Cập nhật Context
        if (newQuantity > 0) {
          updateQuantity(String(productId), newQuantity)
        } else {
          // Nếu quantity = 0 → đã xóa, không cần cập nhật Context
          // (Context sẽ tự handle qua cart rendering)
        }

        toast.success("✅ Cập nhật giỏ hàng")
      } catch (error) {
        console.error("❌ Error updating quantity:", error)
        toast.error(
          `❌ ${error instanceof Error ? error.message : "Lỗi cập nhật"}`
        )
      } finally {
        setLoading(false)
      }
    },
    [cartId, getCurrentUserId, updateQuantity]
  )

  /**
   * 🗑️ XÓA HẾT GIỎ (empty all products)
   */
  const deleteCartAPI = useCallback(async () => {
    try {
      const confirmed = confirm("❌ Bạn chắc chắn muốn xóa hết giỏ hàng không?")
      if (!confirmed) return

      setLoading(true)

      if (!cartId) {
        toast.error("❌ Không có giỏ hàng")
        return
      }

      // ✏️ PATCH với products rỗng
      await cartApi.patchCart(cartId, [])

      clearCart()
      toast.success("✅ Giỏ hàng đã xóa")
    } catch (error) {
      console.error("❌ Error deleting cart:", error)
      toast.error(
        `❌ ${error instanceof Error ? error.message : "Lỗi xóa giỏ"}`
      )
    } finally {
      setLoading(false)
    }
  }, [cartId, clearCart])

  /**
   * 🚪 XÓA GIỎ KHI LOGOUT (chỉ clear Context, không gọi API)
   */
  const deleteCartOnLogout = useCallback(() => {
    try {
      setCartId(null)
      clearCart()
    } catch (error) {
      console.warn("⚠️ Error on logout:", error)
    }
  }, [clearCart])

  return {
    cartId,
    loading,
    initializeCart,
    addToCartAPI,
    updateQuantityAPI,
    deleteCartAPI,
    deleteCartOnLogout,
  }
}
