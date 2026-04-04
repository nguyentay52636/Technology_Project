"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { usersApi } from "@/apis/usersApi"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const users = await usersApi.getUsers()
      const normalizedUsername = username.trim().toLowerCase()

      const matchedUser = users.find(
        (user) => user.username.toLowerCase() === normalizedUsername && user.password === password
      )

      if (!matchedUser) {
        setError("Sai username hoặc mật khẩu.")
        return
      }

      const role = matchedUser.role.toLowerCase()
      if (role === "admin" || role === "moderator") {
        router.push("/admin")
        return
      }

      router.push("/")
    } catch {
      setError("Không thể đăng nhập lúc này. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg border-2">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Đăng nhập tài khoản</CardTitle>
          <CardDescription>
            Nhập username và mật khẩu để truy cập vào hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập username"
                  className="h-11"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-11"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Field className="pt-2">
                <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
                  {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
                <Button variant="outline" type="button" className="w-full h-11 text-base mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.24 4.1.92.51 1.96.88 3.12.8M21.58 13.91c-.23 1.06-.63 2.05-1.18 3M3.26 14.17c-.11-.5-.17-1.02-.17-1.55s.06-1.05.17-1.55c.42-1.92 1.48-3.59 2.92-4.78l-2.5-2.12C1.53 5.4 0 8.35 0 11.62c0 3.27 1.53 6.22 3.68 8.45l2.5-2.12c-1.44-1.19-2.5-2.86-2.92-4.78M12.48 4.79v3.28h7.84c.32 2.66-.46 5.31-2.14 7.32l2.5 2.12C23.01 15.34 24 11.62 24 11.62s-1 1-1.52.71" />
                  </svg>
                  Đăng nhập với Google
                </Button>
                {error ? (
                  <FieldDescription className="pt-3 text-center text-destructive">
                    {error}
                  </FieldDescription>
                ) : null}
                <FieldDescription className="text-center pt-4">
                  Chưa có tài khoản? <Link href="/signup" className="underline font-medium hover:text-primary">Đăng ký ngay</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
