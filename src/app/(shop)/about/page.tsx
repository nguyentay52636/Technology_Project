import Link from "next/link";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Tốc độ và độ ổn định",
    description:
      "Tối ưu trải nghiệm mua sắm với giao diện nhanh, dữ liệu rõ ràng và thao tác đơn giản.",
  },
  {
    title: "Sản phẩm đa dạng",
    description:
      "Liên tục cập nhật danh mục, thương hiệu và giá cả để người dùng dễ dàng lựa chọn.",
  },
  {
    title: "Hỗ trợ tận tâm",
    description:
      "Đội ngũ luôn sẵn sàng tiếp nhận góp ý, nâng cấp tính năng và xử lý vấn đề nhanh chóng.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background pb-20">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-sky-100 dark:from-slate-900 dark:via-zinc-950 dark:to-slate-900" />
        <div className="relative mx-auto max-w-7xl px-6 py-18 md:px-10 md:py-24">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Về chúng tôi
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Công nghệ giúp mua sắm thông minh hơn
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Technology Project được xây dựng để kết nối người dùng với những sản phẩm phù hợp nhất.
              Chúng tôi tập trung vào sự minh bạch, tốc độ và trải nghiệm sử dụng hiện đại trên mọi thiết bị.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 md:grid-cols-3 md:px-10">
        {values.map((value) => (
          <article
            key={value.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="mb-3 text-xl font-semibold">{value.title}</h2>
            <p className="text-sm leading-7 text-muted-foreground">{value.description}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-6 md:px-10">
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-10">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">Hành trình của chúng tôi</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Từ một nhóm nhỏ yêu công nghệ, chúng tôi phát triển thành nền tảng thương mại điện tử
              hướng đến trải nghiệm dễ dùng và hiệu quả. Mọi tính năng được xây dựng dựa trên dữ liệu
              thực tế và phản hồi của người dùng.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Tầm nhìn</p>
            <p className="mt-4 text-lg font-semibold leading-8">
              Trở thành điểm đến mua sắm công nghệ đáng tin cậy, nơi mọi người có thể tìm thấy sản phẩm
              phù hợp với nhu cầu và ngân sách của mình.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-6 md:px-10">
        <div className="rounded-3xl border border-border bg-muted/30 p-8 text-center md:p-10">
          <h3 className="text-2xl font-bold md:text-3xl">Sẵn sàng khám phá thêm?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Xem danh sách sản phẩm mới nhất hoặc liên hệ trực tiếp để nhận tư vấn nhanh.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/products">Xem sản phẩm</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Liên hệ ngay</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}