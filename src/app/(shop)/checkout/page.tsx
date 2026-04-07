"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

type PaymentMethod = "cash" | "card"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const shippingFee = 0
  const grandTotal = total + shippingFee

  const isCardValid =
    cardNumber.trim().length >= 12 &&
    cardName.trim().length > 1 &&
    cardExpiry.trim().length >= 4 &&
    cardCvv.trim().length >= 3

  const canSubmit = useMemo(() => {
    const baseValid = items.length > 0 && phone.trim().length >= 8 && address.trim().length >= 8
    if (!baseValid) {
      return false
    }

    return paymentMethod === "cash" ? true : isCardValid
  }, [address, isCardValid, items.length, paymentMethod, phone])

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }

    clearCart()
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <Card className="border-emerald-200 bg-emerald-50/60">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-700">Thanh toán thành công</CardTitle>
            <CardDescription>
              Đơn hàng mô phỏng đã được ghi nhận. Cảm ơn bạn đã mua sắm.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Về trang chủ</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">Thanh toán</h1>
        <p className="text-sm text-muted-foreground">
          Đây là giao diện mô phỏng thanh toán, không gọi cổng thanh toán thật.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin nhận hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                placeholder="Ví dụ: 0901234567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ nhận hàng</Label>
              <Textarea
                id="address"
                rows={4}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Phương thức thanh toán</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-3 text-left transition",
                    paymentMethod === "cash"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  )}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <Wallet className="h-4 w-4" />
                  <span>Tiền mặt khi nhận hàng</span>
                </button>

                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-3 text-left transition",
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  )}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Thẻ ngân hàng</span>
                </button>
              </div>
            </div>

            {paymentMethod === "card" ? (
              <div className="space-y-4 rounded-xl border p-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Số thẻ (mô phỏng)</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Tên chủ thẻ</Label>
                  <Input
                    id="cardName"
                    placeholder="NGUYEN VAN A"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Ngày hết hạn</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(event) => setCardExpiry(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(event) => setCardCvv(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt đơn hàng</CardTitle>
            <CardDescription>{items.length} sản phẩm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-60 space-y-2 overflow-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="line-clamp-1">{item.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
              ) : null}
            </div>

            <div className="space-y-1 border-t pt-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Tổng cộng</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit} disabled={!canSubmit}>
              Xác nhận thanh toán
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/products">Quay lại mua sắm</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
