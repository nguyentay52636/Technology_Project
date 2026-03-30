
"use client"
import { Truck, Shield, Clock, Headphones } from "lucide-react"

const features = [
    {
        icon: Truck,
        title: "Giao Hàng Miễn Phí",
        description: "Miễn phí vận chuyển cho đơn hàng từ 500.000đ",
    },
    {
        icon: Shield,
        title: "Bảo Hành Chính Hãng",
        description: "Sản phẩm chính hãng 100% với bảo hành toàn quốc",
    },
    {
        icon: Clock,
        title: "Giao Hàng Nhanh",
        description: "Giao hàng trong 24h tại nội thành",
    },
    {
        icon: Headphones,
        title: "Hỗ Trợ 24/7",
        description: "Đội ngũ tư vấn sẵn sàng hỗ trợ bạn bất cứ lúc nào",
    },
]

export function Features() {
    return (
        <section className="border-y border-border bg-card py-12">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                                <feature.icon className="h-6 w-6 text-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{feature.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
