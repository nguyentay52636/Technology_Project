"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { OrderFilters, OrderStatus } from "@/apis/orderApi"

interface OrderStats {
    total: number
    pending: number
    processing: number
    shipping: number
    completed: number
    cancelled: number
}

interface OrderFiltersProps {
    filters: OrderFilters
    stats: OrderStats
    onFiltersChange: (filters: OrderFilters) => void
}

export function OrderFiltersComponent({
    filters,
    stats,
    onFiltersChange,
}: OrderFiltersProps) {
    const handleStatusChange = (status: string) => {
        onFiltersChange({
            ...filters,
            status: status as OrderStatus | "all",
        })
    }

    const handleSearchChange = (search: string) => {
        onFiltersChange({
            ...filters,
            search,
        })
    }

    const handleDateRangeChange = (dateRange: string) => {
        onFiltersChange({
            ...filters,
            dateRange: dateRange as "today" | "week" | "month" | "all",
        })
    }

    const clearSearch = () => {
        onFiltersChange({
            ...filters,
            search: "",
        })
    }

    return (
        <div className="space-y-4">
            {/* Status Tabs */}
            <Tabs
                value={filters.status || "all"}
                onValueChange={handleStatusChange}
                className="w-full"
            >
                <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                        Tat ca ({stats.total})
                    </TabsTrigger>
                    <TabsTrigger
                        value="pending"
                        className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                    >
                        Cho xu ly ({stats.pending})
                    </TabsTrigger>
                    <TabsTrigger
                        value="processing"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Dang xu ly ({stats.processing})
                    </TabsTrigger>
                    <TabsTrigger
                        value="shipping"
                        className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                        Dang giao ({stats.shipping})
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                        Hoan thanh ({stats.completed})
                    </TabsTrigger>
                    <TabsTrigger
                        value="cancelled"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                        Da huy ({stats.cancelled})
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Search and Date Filter */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Tim theo ma don, ten, SDT..."
                        value={filters.search || ""}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-8 pr-8"
                    />
                    {filters.search && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
                            onClick={clearSearch}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Select
                        value={filters.dateRange || "all"}
                        onValueChange={handleDateRangeChange}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Thoi gian" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Hom nay</SelectItem>
                            <SelectItem value="week">7 ngay qua</SelectItem>
                            <SelectItem value="month">30 ngay qua</SelectItem>
                            <SelectItem value="all">Tat ca</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
