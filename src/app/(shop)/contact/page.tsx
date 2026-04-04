import Link from "next/link";
import { Button } from "@/components/ui/button";

const contactItems = [
  {
    title: "Văn phòng",
    detail: "Số 123, Đường Công Nghệ, Cầu Giấy, Hà Nội",
  },
  {
    title: "Hotline",
    detail: "0123 456 789 (08:00 - 21:00)",
  },
  {
    title: "Email",
    detail: "contact@nextapp.com",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background pb-20">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-cyan-100 dark:from-slate-900 dark:via-zinc-950 dark:to-slate-900" />
        <div className="relative mx-auto max-w-7xl px-6 py-18 md:px-10 md:py-24">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Liên hệ
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Chúng tôi luôn sẵn sàng hỗ trợ
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Nếu bạn cần tư vấn sản phẩm, báo giá hoặc hỗ trợ kỹ thuật, hãy gửi thông tin qua form bên dưới.
              Đội ngũ sẽ phản hồi sớm nhất có thể.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 md:grid-cols-5 md:px-10">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:col-span-3 md:p-8">
          <h2 className="text-2xl font-bold">Gửi tin nhắn</h2>
          <form className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Họ và tên
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Nội dung
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tôi cần tư vấn thêm về sản phẩm..."
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
            <Button type="button" size="lg" className="w-full sm:w-auto">
              Gửi thông tin
            </Button>
          </form>
        </div>

        <aside className="space-y-6 md:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h3 className="text-xl font-semibold">Thông tin kết nối</h3>
            <div className="mt-5 space-y-4">
              {contactItems.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/80 bg-muted/30 p-4">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-sm md:p-8">
            <h3 className="text-xl font-semibold">Cần xem nhanh sản phẩm?</h3>
            <p className="mt-2 text-sm leading-7 text-slate-100">
              Trước khi liên hệ, bạn có thể tham khảo danh sách sản phẩm mới để tiết kiệm thời gian.
            </p>
            <Button asChild variant="secondary" className="mt-5">
              <Link href="/products">Đến trang sản phẩm</Link>
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
}