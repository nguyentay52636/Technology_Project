"use client"

import { useEffect } from "react"

import ErrorFallback from "@/components/shared/ErrorFallback"

interface AdminErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error("Admin error:", error)
  }, [error])

  return (
    <ErrorFallback
      title="Đã xảy ra lỗi"
      message="Không thể tải nội dung quản trị. Vui lòng thử lại."
      onRetry={reset}
    />
  )
}