"use client"

import { useEffect } from "react"

import ErrorFallback from "@/components/shared/ErrorFallback"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App error:", error)
  }, [error])

  return (
    <ErrorFallback
      title="Đã xảy ra lỗi hệ thống"
      message="Trang hiện tại không thể tải. Vui lòng thử lại hoặc quay lại sau."
      onRetry={reset}
    />
  )
}