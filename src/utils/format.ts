export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

const USD_TO_VND_RATE = 25000

export function formatUsdToVnd(priceInUsd: number, rate: number = USD_TO_VND_RATE): string {
  return formatPrice(priceInUsd * rate)
}

export function convertUsdToVnd(valueInUsd: number, rate: number = USD_TO_VND_RATE): number {
  return valueInUsd * rate
}

export function convertVndToUsd(valueInVnd: number, rate: number = USD_TO_VND_RATE): number {
  return valueInVnd / rate
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
    cod: "Thanh toán khi nhan hang (COD)",
    card: "The ngan hang",
    credit_card: "The tín dụng / Ghi nợ",
  }

  if (!method) {
    return "Chưa chọn"
  }

  const normalized = method.trim().toLowerCase().replace(/[\s-]+/g, "_")
  return methods[normalized] || method
}
