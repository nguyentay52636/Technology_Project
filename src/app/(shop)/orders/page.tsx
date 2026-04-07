"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Order } from "@/apis/orderApi"
import { fetchOrders } from "../../../../mock/order"
import ListOrder from "@/components/Home/Orders/ListOrder"

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        async function loadOrders() {
            try {
                const data = await fetchOrders()
                setOrders(data)
            } catch (error) {
                console.error("Failed to fetch orders:", error)
            } finally {
                setLoading(false)
            }
        }
        loadOrders()
    }, [])

    const filteredOrders = orders.filter((order) => {
        if (activeTab === "all") return true
        return order.status === activeTab
    })

    const orderCounts = {
        all: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        processing: orders.filter((o) => o.status === "processing").length,
        shipping: orders.filter((o) => o.status === "shipping").length,
        completed: orders.filter((o) => o.status === "completed").length,
        cancelled: orders.filter((o) => o.status === "cancelled").length,
    }

    return (
        <div className=" bg-background">

            <main className="mx-auto max-w-5xl! px-4 py-8 md:px-6">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lai trang chu
                    </Link>
                    <h1 className="font-serif text-3xl font-bold">Don hang cua toi</h1>
                    <p className="mt-2 text-muted-foreground">Theo doi va quan ly cac don hang cua ban</p>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                        <TabsTrigger value="all" className="text-xs sm:text-sm">
                            Tat ca ({orderCounts.all})
                        </TabsTrigger>
                        <TabsTrigger value="pending" className="text-xs sm:text-sm">
                            Cho duyet ({orderCounts.pending})
                        </TabsTrigger>
                        <TabsTrigger value="processing" className="text-xs sm:text-sm">
                            Dang xu ly ({orderCounts.processing})
                        </TabsTrigger>
                        <TabsTrigger value="shipping" className="text-xs sm:text-sm">
                            Dang giao ({orderCounts.shipping})
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="text-xs sm:text-sm">
                            Hoan thanh ({orderCounts.completed})
                        </TabsTrigger>
                        <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
                            Da huy ({orderCounts.cancelled})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4">
                        <ListOrder loading={loading} orders={filteredOrders} activeTab={activeTab} />
                    </TabsContent>
                </Tabs>
            </main>

        </div>
    )
}
