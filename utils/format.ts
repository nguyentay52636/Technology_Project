export function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }
  
  export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }
  
  export function formatDateTime(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }
  
  export function formatPaymentMethod(method?: string): string {
    const methods: Record<string, string> = {
      cod: "Thanh toan khi nhan hang (COD)",
      bank_transfer: "Chuyen khoan ngan hang",
      credit_card: "The tin dung / Ghi no",
      momo: "Vi MoMo",
      vnpay: "VNPay",
    }
    return method ? methods[method] || method : "Chua chon"
  }
  