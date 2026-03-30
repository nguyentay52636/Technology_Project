import Link from "next/link"
import { Laptop, Shirt, Mouse, Smartphone } from "lucide-react"

const categories = [
    {
        id: "laptops",
        name: "Laptop",
        description: "MacBook, Dell, HP, Asus...",
        icon: Laptop,
        productCount: 45,
        href: "#laptops",
    },
    {
        id: "electronics",
        name: "Điện Tử",
        description: "Điện thoại, máy tính bảng...",
        icon: Smartphone,
        productCount: 120,
        href: "#electronics",
    },
    {
        id: "clothing",
        name: "Quần Áo",
        description: "Áo, quần, váy, đầm...",
        icon: Shirt,
        productCount: 230,
        href: "#clothing",
    },
    {
        id: "accessories",
        name: "Phụ Kiện",
        description: "Chuột, bàn phím, USB...",
        icon: Mouse,
        productCount: 180,
        href: "#accessories",
    },
]

export function Category() {
    return (
        <section id="categories" className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="mb-12 text-center">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Danh mục
                    </p>
                    <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                        Khám phá theo danh mục
                    </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-accent hover:shadow-lg"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                                <category.icon className="h-6 w-6 text-foreground" />
                            </div>
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                {category.productCount} sản phẩm
                            </p>
                            <h3 className="mt-1 text-xl font-semibold">{category.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                            <div className="mt-4 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                                Xem tất cả &rarr;
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
