"use client"

import { Button } from "@/components/ui/button"

interface ErrorFallbackProps {
  title?: string
  message?: string
  actionLabel?: string
  onRetry: () => void
}

export default function ErrorFallback({
  title = "Đã xảy ra lỗi",
  message = "Không thể tải nội dung. Bạn có thể thử lại.",
  actionLabel = "Thử lại",
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="m-6 rounded-xl border border-destructive/20 bg-destructive/5 p-6">
      <h2 className="text-lg font-semibold text-destructive">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>

      <div className="mt-4 flex gap-2">
        <Button type="button" variant="destructive" onClick={onRetry}>
          {actionLabel}
        </Button>
      </div>
    </div>
  )
}