import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Không cần 'use client' vì đây chỉ là UI tĩnh và thẻ Link điều hướng thông thường
export function Hero() {
    return (
        <section className="relative isolate overflow-hidden py-20 md:py-32">
            <video
                className="absolute inset-0 -z-20 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 -z-10 bg-black/55" />

            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex min-h-[56vh] flex-col items-center justify-center text-center">
                    <h1 className="font-sans text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                        <span className="text-balance">Siêu thị online</span>
                        <br />
                        <span className="text-balance">Đủ mọi ngành hàng</span>
                    </h1>
                    
                    <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-zinc-200 md:text-xl">
                        Rau củ, thực phẩm tươi sống, nội thất, mỹ phẩm. Mua nhanh, giá tốt.
                    </p>

                    {/* Đã bổ sung nút bấm sử dụng các thư viện bạn import */}
                    <div className="mt-8 flex gap-4">
                        <Button asChild size="lg">
                            <Link href="/products">
                                Mua sắm ngay <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}