"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background py-20 md:py-32">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="font-sans text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        <span className="text-balance">Mua sắm thông minh</span>
                        <br />
                        <span className="text-balance">thiết kế tinh tế</span>
                    </h1>
                    <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
                        Khám phá bộ sưu tập laptop, điện tử, thời trang và phụ kiện chất lượng cao.
                        Giá tốt nhất, giao hàng nhanh chóng.
                    </p>
                    {/* <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                        <Link href="#products" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                            Khám Phá Sản Phẩm
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                        <Link href="#categories" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                            Xem Danh Mục
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
