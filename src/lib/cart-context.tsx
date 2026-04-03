"use client"

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react"

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

type CartState = {
    items: CartItem[]
    isCartOpen: boolean
}

type CartAction =
    | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> }
    | { type: "REMOVE_ITEM"; id: string }
    | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
    | { type: "CLEAR_CART" }
    | { type: "SET_IS_CART_OPEN"; open: boolean }

const initialState: CartState = {
    items: [],
    isCartOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find((item) => item.id === action.item.id)

            const items = existingItem
                ? state.items.map((item) =>
                      item.id === action.item.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                  )
                : [...state.items, { ...action.item, quantity: 1 }]

            return {
                ...state,
                items,
            }
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.id),
            }
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items:
                    action.quantity <= 0
                        ? state.items.filter((item) => item.id !== action.id)
                        : state.items.map((item) =>
                              item.id === action.id ? { ...item, quantity: action.quantity } : item
                          ),
            }
        case "CLEAR_CART":
            return {
                ...state,
                items: [],
            }
        case "SET_IS_CART_OPEN":
            return {
                ...state,
                isCartOpen: action.open,
            }
        default:
            return state
    }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        dispatch({ type: "ADD_ITEM", item })
    }, [])

    const removeItem = useCallback((id: string) => {
        dispatch({ type: "REMOVE_ITEM", id })
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", id, quantity })
    }, [])

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR_CART" })
    }, [])

    const setIsCartOpen = useCallback((open: boolean) => {
        dispatch({ type: "SET_IS_CART_OPEN", open })
    }, [])

    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
                itemCount,
                isCartOpen: state.isCartOpen,
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
