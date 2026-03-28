
"use client"
import { Truck, Shield, Clock, Headphones } from "lucide-react"

const features = [
    {
        icon: Truck,
        title: "Giao Hang Mien Phi",
        description: "Mien phi van chuyen cho don hang tu 500.000d",
    },
    {
        icon: Shield,
        title: "Bao Hanh Chinh Hang",
        description: "San pham chinh hang 100% voi bao hanh toan quoc",
    },
    {
        icon: Clock,
        title: "Giao Hang Nhanh",
        description: "Giao hang trong 24h tai noi thanh",
    },
    {
        icon: Headphones,
        title: "Ho Tro 24/7",
        description: "Doi ngu tu van san sang ho tro ban bat cu luc nao",
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
