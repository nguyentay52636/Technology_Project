import { cn } from "@/lib/utils"
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

export function SignupForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("shadow-lg border-2", className)} {...props}>
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">Tạo tài khoản</CardTitle>
        <CardDescription>
          Nhập thông tin bên dưới để đăng ký tài khoản mới của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                className="h-11"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-11"
                required
              />
              <FieldDescription>
                Chúng tôi sẽ dùng email này để liên hệ với bạn. Chúng tôi cam kết bảo mật thông tin.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input id="password" type="password" className="h-11" required />
              <FieldDescription>
                Mật khẩu phải dài ít nhất 8 ký tự.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Xác nhận mật khẩu
              </FieldLabel>
              <Input id="confirm-password" type="password" className="h-11" required />
              <FieldDescription>Vui lòng nhập lại mật khẩu một lần nữa.</FieldDescription>
            </Field>
            <FieldGroup className="pt-2">
              <Field>
                <Button type="submit" className="w-full h-11 text-base">Tạo tài khoản</Button>
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
                  Đăng ký với Google
                </Button>
                <FieldDescription className="text-center pt-4">
                  Đã có tài khoản? <a href="#" className="underline font-medium hover:text-primary">Đăng nhập ngay</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
