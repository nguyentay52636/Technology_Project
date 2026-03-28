"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background py-20 md:py-32">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        <span className="text-balance">Mua sam thong minh</span>
                        <br />
                        <span className="text-balance">thiet ke tinh te</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        Kham pha bo suu tap laptop, dien tu, thoi trang va phu kien chat luong cao.
                        Gia tot nhat, giao hang nhanh chong.
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                        <Link href="#products" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                            Kham Pha San Pham
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                        <Link href="#categories" className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                            Xem Danh Muc
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
