"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { CardProduct } from "./components/CardProduct"
import { useProduct } from "@/hooks/useProduct"

const categories = ["Tất cả", "Điện Tử", "Trang Sức", "Quần Áo Nam", "Quần Áo Nữ"]

const ITEMS_PER_PAGE = 8

export function GridProduct() {
    const [activeCategory, setActiveCategory] = useState("Tất cả")
    const { products, loading } = useProduct()
    const [currentPage, setCurrentPage] = useState(1)

    const categoryMap: Record<string, string> = {
        "electronics": "Điện Tử",
        "jewelery": "Trang Sức",
        "men's clothing": "Quần Áo Nam",
        "women's clothing": "Quần Áo Nữ",
    }

    const filteredProducts =
        activeCategory === "Tất cả"
            ? products
            : products.filter((p) => categoryMap[p.category] === activeCategory)

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
    }

    const renderPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        if (startPage > 1) {
            pages.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "default" : "outline"}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </Button>
            )
            if (startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="px-2 text-muted-foreground">
                        ...
                    </span>
                )
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Button>
            )
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="end-ellipsis" className="px-2 text-muted-foreground">
                        ...
                    </span>
                )
            }
            pages.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Button>
            )
        }

        return pages
    }

    return (
        <section id="products" className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="mb-12 flex flex-col items-center text-center">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Bộ sưu tập
                    </p>
                    <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                        Sản phẩm nổi bật
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground">
                        Khám phá những sản phẩm được yêu thích nhất với giá tốt nhất
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex justify-center">
                    <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
                        <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spinner className="h-8 w-8" />
                    </div>
                ) : (
                    <>
                        {/* Products Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {displayedProducts.map((product) => (
                                <CardProduct
                                    key={product.id}
                                    product={{
                                        id: product.id.toString(),
                                        name: product.title,
                                        price: product.price,
                                        description: product.description,
                                        image: product.image,
                                        rating: product.rating.rate,
                                        reviews: product.rating.count,
                                        category: categoryMap[product.category] || product.category,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {renderPageNumbers()}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Trang {currentPage} / {totalPages} ({filteredProducts.length} sản phẩm)
                                </p>
                            </div>
                        )}

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-muted-foreground">Không có sản phẩm trong danh mục này</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
