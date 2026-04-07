export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "shipping" 
  | "completed" 
  | "cancelled"

export type PaymentStatus = 
  | "pending" 
  | "paid" 
  | "failed" 
  | "refunded"

export type PaymentMethod = 
  | "cod" 
  | "bank_transfer" 
  | "credit_card" 
  | "momo" 
  | "vnpay"

export interface OrderItem {
  id?: number
  orderId?: number
  productId: number
  productTitle: string
  productPrice: number
  discountPercentage?: number
  quantity: number
  thumbnail?: string
}

export interface Order {
  id: number
  userId: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  totalAmount: number
  discountAmount?: number
  finalAmount: number
  shippingAddress: string
  customerName: string
  customerEmail: string
  customerPhone: string
  createdAt: string
  updatedAt?: string
  items: OrderItem[]
}

export interface OrderFilters {
  status?: OrderStatus | "all"
  paymentStatus?: PaymentStatus | "all"
  dateRange?: "today" | "week" | "month" | "all"
  search?: string
}
