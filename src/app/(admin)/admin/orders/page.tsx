"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { type Order, type OrderFilters, type OrderStatus } from "@/apis/orderApi"
import { fetchOrders, getOrderStats, updateOrderStatus } from "../../../../../mock/order"
import { OrderTable } from "@/components/order/OrderTable"
import { OrderFiltersComponent } from "@/components/order/OrderFillters"
import { OrderPagination } from "@/components/order/OrderPagination"
import { OrderStatsCards } from "@/components/order/OrderStatsCards"
import { OrderDetailDialog } from "@/components/order/Dialog/DialogViewDetails"
import { toast } from "sonner"

const ITEMS_PER_PAGE = 5

export default function Order() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [detailOpen, setDetailOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState<OrderFilters>({
        status: "all",
        dateRange: "all",
        search: "",
    })
    // Fetch orders on mount
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders()
                setOrders(data)
            } catch (error) {
                toast.error("Khong the tai danh sach don hang")
            } finally {
                setLoading(false)
            }
        }
        loadOrders()
    }, [])

    // Calculate stats
    const stats = useMemo(() => getOrderStats(orders), [orders])

    // Filter orders
    const filteredOrders = useMemo(() => {
        let result = [...orders]

        // Filter by status
        if (filters.status && filters.status !== "all") {
            result = result.filter((o) => o.status === filters.status)
        }

        // Filter by search
        if (filters.search) {
            const search = filters.search.toLowerCase()
            result = result.filter(
                (o) =>
                    o.id.toString().includes(search) ||
                    o.customerName.toLowerCase().includes(search) ||
                    o.customerPhone.includes(search) ||
                    o.customerEmail.toLowerCase().includes(search)
            )
        }

        // Filter by date range
        if (filters.dateRange && filters.dateRange !== "all") {
            const now = new Date()
            const startDate = new Date()

            switch (filters.dateRange) {
                case "today":
                    startDate.setHours(0, 0, 0, 0)
                    break
                case "week":
                    startDate.setDate(now.getDate() - 7)
                    break
                case "month":
                    startDate.setDate(now.getDate() - 30)
                    break
            }

            result = result.filter((o) => new Date(o.createdAt) >= startDate)
        }

        return result
    }, [orders, filters])

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredOrders.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredOrders, currentPage])

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [filters])

    // Handle view detail
    const handleViewDetail = (order: Order) => {
        setSelectedOrder(order)
        setDetailOpen(true)
    }

    // Handle status update
    const handleUpdateStatus = async (orderId: number, status: OrderStatus) => {
        try {
            await updateOrderStatus(orderId, status)
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId
                        ? { ...o, status, updatedAt: new Date().toISOString() }
                        : o
                )
            )

            const statusLabels: Record<OrderStatus, string> = {
                pending: "Cho xu ly",
                processing: "Dang xu ly",
                shipping: "Dang giao",
                completed: "Hoan thanh",
                cancelled: "Da huy",
            }

            toast.success(`Don hang #${orderId} da chuyen sang "${statusLabels[status]}"`)
        } catch (error) {
            toast.error("Khong the cap nhat trang thai don hang")
        }
    }

    if (loading) {
        return (
            <div className="p-6 lg:p-8 space-y-6">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
                <Skeleton className="h-96" />
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="font-serif text-3xl font-bold">Quan ly don hang</h1>
                <p className="text-muted-foreground">
                    Theo doi va xu ly tat ca don hang cua khach hang
                </p>
            </div>

            {/* Stats Cards */}
            <OrderStatsCards stats={stats} />

            {/* Orders Table Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Don hang</CardTitle>
                    <CardDescription>
                        Danh sach don hang va trang thai xu ly
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters */}
                    <OrderFiltersComponent
                        filters={filters}
                        stats={stats}
                        onFiltersChange={setFilters}
                    />

                    {/* Table */}
                    <OrderTable
                        orders={paginatedOrders}
                        onViewDetail={handleViewDetail}
                        onUpdateStatus={handleUpdateStatus}
                    />

                    {/* Pagination */}
                    {filteredOrders.length > 0 && (
                        <OrderPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={filteredOrders.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </CardContent>
            </Card>

            <OrderDetailDialog
                order={selectedOrder}
                open={detailOpen}
                onOpenChange={setDetailOpen}
                onUpdateStatus={handleUpdateStatus}
            />

        </div>
    )
}
