import { type Order, type OrderStatus, type PaymentStatus } from "@/apis/orderApi"

const mockOrders: Order[] = [
  {
    id: 1001,
    userId: 1,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "cod",
    totalAmount: 49990000,
    discountAmount: 0,
    finalAmount: 49990000,
    shippingAddress: "123 Nguyen Hue, Q1, TP.HCM",
    customerName: "Nguyen Van A",
    customerEmail: "nguyenvana@email.com",
    customerPhone: "0901234567",
    createdAt: "2024-03-15T10:30:00",
    items: [
      {
        id: 1,
        productId: 101,
        productTitle: "MacBook Pro 14 M3 Pro",
        productPrice: 49990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
    ],
  },
  {
    id: 1002,
    userId: 2,
    status: "shipping",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    totalAmount: 45980000,
    discountAmount: 1000000,
    finalAmount: 44980000,
    shippingAddress: "456 Le Loi, Q3, TP.HCM",
    customerName: "Tran Thi B",
    customerEmail: "tranthib@email.com",
    customerPhone: "0912345678",
    createdAt: "2024-03-15T14:20:00",
    items: [
      {
        id: 2,
        productId: 102,
        productTitle: "iPhone 15 Pro Max 256GB",
        productPrice: 34990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      },
      {
        id: 3,
        productId: 103,
        productTitle: "Apple Watch Series 9",
        productPrice: 10990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      },
    ],
  },
  {
    id: 1003,
    userId: 3,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    totalAmount: 5380000,
    discountAmount: 0,
    finalAmount: 5380000,
    shippingAddress: "789 Tran Hung Dao, Q5, TP.HCM",
    customerName: "Le Van C",
    customerEmail: "levanc@email.com",
    customerPhone: "0923456789",
    createdAt: "2024-03-14T09:15:00",
    items: [
      {
        id: 4,
        productId: 104,
        productTitle: "Logitech MX Master 3S",
        productPrice: 2690000,
        quantity: 2,
        thumbnail: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      },
    ],
  },
  {
    id: 1004,
    userId: 4,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    totalAmount: 5570000,
    discountAmount: 500000,
    finalAmount: 5070000,
    shippingAddress: "321 Vo Van Tan, Q3, TP.HCM",
    customerName: "Pham Thi D",
    customerEmail: "phamthid@email.com",
    customerPhone: "0934567890",
    createdAt: "2024-03-14T16:45:00",
    items: [
      {
        id: 5,
        productId: 105,
        productTitle: "Ao Khoac Nam Premium Wool",
        productPrice: 2990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      },
      {
        id: 6,
        productId: 106,
        productTitle: "Quan Jeans Nam Slim Fit",
        productPrice: 1290000,
        quantity: 2,
        thumbnail: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      },
    ],
  },
  {
    id: 1005,
    userId: 5,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "credit_card",
    totalAmount: 35990000,
    discountAmount: 0,
    finalAmount: 35990000,
    shippingAddress: "654 Hai Ba Trung, Q1, TP.HCM",
    customerName: "Hoang Van E",
    customerEmail: "hoangvane@email.com",
    customerPhone: "0945678901",
    createdAt: "2024-03-13T11:00:00",
    items: [
      {
        id: 7,
        productId: 107,
        productTitle: "Dell XPS 15 i7-13700H",
        productPrice: 35990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
    ],
  },
  {
    id: 1006,
    userId: 6,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    totalAmount: 42990000,
    discountAmount: 2000000,
    finalAmount: 40990000,
    shippingAddress: "987 Nguyen Thi Minh Khai, Q3, TP.HCM",
    customerName: "Nguyen Thi F",
    customerEmail: "nguyenthif@email.com",
    customerPhone: "0956789012",
    createdAt: "2024-03-13T08:30:00",
    items: [
      {
        id: 8,
        productId: 108,
        productTitle: "ASUS ROG Zephyrus G14",
        productPrice: 42990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
    ],
  },
  {
    id: 1007,
    userId: 7,
    status: "shipping",
    paymentStatus: "paid",
    paymentMethod: "momo",
    totalAmount: 15980000,
    discountAmount: 0,
    finalAmount: 15980000,
    shippingAddress: "159 Pasteur, Q1, TP.HCM",
    customerName: "Vo Van G",
    customerEmail: "vovang@email.com",
    customerPhone: "0967890123",
    createdAt: "2024-03-12T15:20:00",
    items: [
      {
        id: 9,
        productId: 109,
        productTitle: "Samsung Galaxy S24 Ultra",
        productPrice: 15980000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      },
    ],
  },
  {
    id: 1008,
    userId: 8,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "vnpay",
    totalAmount: 8970000,
    discountAmount: 500000,
    finalAmount: 8470000,
    shippingAddress: "753 Cach Mang Thang 8, Q10, TP.HCM",
    customerName: "Dang Thi H",
    customerEmail: "dangthih@email.com",
    customerPhone: "0978901234",
    createdAt: "2024-03-12T10:45:00",
    items: [
      {
        id: 10,
        productId: 110,
        productTitle: "Sony WH-1000XM5",
        productPrice: 8970000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      },
    ],
  },
  {
    id: 1009,
    userId: 9,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    totalAmount: 3290000,
    discountAmount: 0,
    finalAmount: 3290000,
    shippingAddress: "246 Ly Thuong Kiet, Q10, TP.HCM",
    customerName: "Bui Van I",
    customerEmail: "buivani@email.com",
    customerPhone: "0989012345",
    createdAt: "2024-03-11T14:00:00",
    items: [
      {
        id: 11,
        productId: 111,
        productTitle: "Ao Polo Nam Cotton",
        productPrice: 590000,
        quantity: 3,
        thumbnail: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      },
      {
        id: 12,
        productId: 112,
        productTitle: "Giay Sneaker Classic",
        productPrice: 1520000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      },
    ],
  },
  {
    id: 1010,
    userId: 10,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    totalAmount: 25990000,
    discountAmount: 1500000,
    finalAmount: 24490000,
    shippingAddress: "135 Nam Ky Khoi Nghia, Q3, TP.HCM",
    customerName: "Ly Thi K",
    customerEmail: "lythik@email.com",
    customerPhone: "0990123456",
    createdAt: "2024-03-10T09:30:00",
    items: [
      {
        id: 13,
        productId: 113,
        productTitle: "iPad Pro 12.9 M2",
        productPrice: 25990000,
        quantity: 1,
        thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
    ],
  },
]

export async function fetchOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockOrders
}

export async function fetchOrderById(id: number): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockOrders.find((order) => order.id === id)
}

export async function updateOrderStatus(
  id: number,
  status: OrderStatus
): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const order = mockOrders.find((o) => o.id === id)
  if (order) {
    order.status = status
    order.updatedAt = new Date().toISOString()
  }
  return order
}

export async function updatePaymentStatus(
  id: number,
  paymentStatus: PaymentStatus
): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const order = mockOrders.find((o) => o.id === id)
  if (order) {
    order.paymentStatus = paymentStatus
    order.updatedAt = new Date().toISOString()
  }
  return order
}

export function getOrderStats(orders: Order[]) {
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipping: orders.filter((o) => o.status === "shipping").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    // Payment stats
    paymentPending: orders.filter((o) => o.paymentStatus === "pending").length,
    paymentPaid: orders.filter((o) => o.paymentStatus === "paid").length,
    paymentFailed: orders.filter((o) => o.paymentStatus === "failed").length,
    paymentRefunded: orders.filter((o) => o.paymentStatus === "refunded").length,
    totalRevenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.finalAmount, 0),
  }
}
