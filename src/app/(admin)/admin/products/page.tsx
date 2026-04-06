"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Pencil, Plus, Search, Trash2, Star } from "lucide-react"

import { productApi, type Product, type ProductCreateInput, type ProductUpdateInput } from "@/apis/productApi"
import ProductFilters, { type SortOption } from "@/components/Products/ProductFilters"
import ProductPagination from "@/components/Products/ProductPagination"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const emptyForm = {
    title: "",
    description: "",
    category: "",
    price: "0",
    discountPercentage: "0",
    stock: "0",
    tags: "",
    brand: "",
    sku: "",
    weight: "0",
    width: "0",
    height: "0",
    depth: "0",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    minimumOrderQuantity: "1",
    images: "",
    thumbnail: "",
}

const ITEMS_PER_PAGE = 8

type ProductFormState = typeof emptyForm

function toNumber(value: string) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

function getInitialForm(product?: Product): ProductFormState {
    if (!product) {
        return emptyForm
    }

    return {
        title: product.title ?? "",
        description: product.description ?? "",
        category: product.category ?? "",
        price: String(product.price ?? 0),
        discountPercentage: String(product.discountPercentage ?? 0),
        stock: String(product.stock ?? 0),
        tags: product.tags?.join(", ") ?? "",
        brand: product.brand ?? "",
        sku: product.sku ?? "",
        weight: String(product.weight ?? 0),
        width: String(product.dimensions?.width ?? 0),
        height: String(product.dimensions?.height ?? 0),
        depth: String(product.dimensions?.depth ?? 0),
        warrantyInformation: product.warrantyInformation ?? "",
        shippingInformation: product.shippingInformation ?? "",
        availabilityStatus: product.availabilityStatus ?? "",
        returnPolicy: product.returnPolicy ?? "",
        minimumOrderQuantity: String(product.minimumOrderQuantity ?? 1),
        images: product.images?.join(", ") ?? "",
        thumbnail: product.thumbnail ?? "",
    }
}

function buildPayload(form: ProductFormState): ProductCreateInput {
    const images = form.images
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)

    return {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        price: toNumber(form.price),
        discountPercentage: toNumber(form.discountPercentage),
        stock: toNumber(form.stock),
        tags: form.tags
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
        brand: form.brand.trim(),
        sku: form.sku.trim(),
        weight: toNumber(form.weight),
        dimensions: {
            width: toNumber(form.width),
            height: toNumber(form.height),
            depth: toNumber(form.depth),
        },
        warrantyInformation: form.warrantyInformation.trim(),
        shippingInformation: form.shippingInformation.trim(),
        availabilityStatus: form.availabilityStatus.trim(),
        reviews: [],
        returnPolicy: form.returnPolicy.trim(),
        minimumOrderQuantity: toNumber(form.minimumOrderQuantity),
        images,
        thumbnail: form.thumbnail.trim() || images[0] || "",
        rating: 0,
    }
}
export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [form, setForm] = useState<ProductFormState>(emptyForm)
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
    const [sortBy, setSortBy] = useState<SortOption>("relevance")
    const [showFilters, setShowFilters] = useState(true)

    useEffect(() => {
        let active = true

        const loadProducts = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await productApi.getProducts()
                if (active) {
                    setProducts(data)
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : "Không thể tải danh sách sản phẩm"
                if (active) {
                    setError(message)
                }
                toast.error(message)
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        loadProducts()

        return () => {
            active = false
        }
    }, [])

    const brands = useMemo(() => [...new Set(products.map(p => p.brand).filter(Boolean))].sort(), [products])
    const categories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))].sort(), [products])
    const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 10000), [products])

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const title = product.title?.toLowerCase() || ""
            const brand = product.brand?.toLowerCase() || ""
            const category = product.category?.toLowerCase() || ""
            const sku = product.sku?.toLowerCase() || ""
            const description = product.description?.toLowerCase() || ""
            const searchLower = searchQuery.toLowerCase()

            const matchesSearch = title.includes(searchLower) || brand.includes(searchLower) || category.includes(searchLower) || sku.includes(searchLower) || description.includes(searchLower)
            const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand))
            const matchesCategory = selectedCategories.length === 0 || (product.category && selectedCategories.includes(product.category))
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

            return matchesSearch && matchesBrand && matchesCategory && matchesPrice
        })

        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price
                case "price-desc":
                    return b.price - a.price
                case "rating-asc":
                    return a.rating - b.rating
                case "rating-desc":
                    return b.rating - a.rating
                case "relevance":
                default:
                    return 0
            }
        })

        return sorted
    }, [products, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy])

    const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE))
    const safeCurrentPage = Math.min(currentPage, totalPages)
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    const displayedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedBrands, selectedCategories, priceRange, sortBy])

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    const totalProducts = products.length
    const totalInventory = products.reduce((sum, product) => sum + product.stock, 0)
    const averagePrice = totalProducts > 0
        ? products.reduce((sum, product) => sum + product.price, 0) / totalProducts
        : 0

    if (error) {
        throw new Error(error)
    }

    const openCreateDialog = () => {
        setEditingProduct(null)
        setForm(emptyForm)
        setDialogOpen(true)
    }

    const openEditDialog = (product: Product) => {
        setEditingProduct(product)
        setForm(getInitialForm(product))
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
        setEditingProduct(null)
        setForm(emptyForm)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSaving(true)

        const payload = buildPayload(form)

        try {
            if (editingProduct) {
                const updated = await productApi.updateProduct(editingProduct.id, payload as ProductUpdateInput)
                setProducts((current) => current.map((item) => (item.id === updated.id ? updated : item)))
                toast.success("Đã cập nhật sản phẩm")
            } else {
                const created = await productApi.addProduct(payload)
                setProducts((current) => [created, ...current])
                toast.success("Đã thêm sản phẩm")
            }
            closeDialog()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Không thể lưu sản phẩm"
            toast.error(message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (product: Product) => {
        const confirmed = window.confirm(`Bạn có chắc muốn xóa sản phẩm \"${product.title}\" không?`)
        if (!confirmed) {
            return
        }

        try {
            await productApi.deleteProduct(product.id)
            setProducts((current) => current.filter((item) => item.id !== product.id))
            toast.success("Đã xóa sản phẩm")
        } catch (err) {
            const message = err instanceof Error ? err.message : "Không thể xóa sản phẩm"
            toast.error(message)
        }
    }
    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        )
    }

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleResetFilters = () => {
        setSearchQuery("")
        setSelectedBrands([])
        setSelectedCategories([])
        setPriceRange({ min: 0, max: maxPrice })
        setSortBy("relevance")
        setCurrentPage(1)
    }
    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Quản trị / Sản phẩm
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">Quản lý sản phẩm</h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Thêm, sửa và xóa sản phẩm trực tiếp từ trang này.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border bg-background p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Tổng sản phẩm</p>
                            <p className="mt-2 text-2xl font-semibold">{totalProducts}</p>
                        </div>
                        <div className="rounded-xl border bg-background p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Tồn kho</p>
                            <p className="mt-2 text-2xl font-semibold">{totalInventory}</p>
                        </div>
                        <div className="rounded-xl border bg-background p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Giá trung bình</p>
                            <p className="mt-2 text-2xl font-semibold">{averagePrice.toLocaleString("vi-VN")}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Tìm kiếm sản phẩm..."
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                    </Button>
                    <Button onClick={openCreateDialog}>
                        <Plus className="h-4 w-4" />
                        Thêm sản phẩm
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="space-y-6">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <Skeleton className="h-24 rounded-xl" />
                        <Skeleton className="h-24 rounded-xl" />
                        <Skeleton className="h-24 rounded-xl" />
                    </div>

                    <div className="rounded-xl border bg-background p-4">
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Skeleton className="h-11 w-72 rounded-2xl" />
                    </div>
                </div>
            ) : (
                <div className="flex gap-6">
                    {/* Filter Sidebar */}
                    {showFilters && (
                        <ProductFilters
                            sortBy={sortBy}
                            onSortChange={(value) => setSortBy(value)}
                            priceRange={priceRange}
                            onPriceChange={(range) => setPriceRange(range)}
                            maxPrice={maxPrice}
                            selectedBrands={selectedBrands}
                            onBrandToggle={handleBrandToggle}
                            brands={brands}
                            selectedCategories={selectedCategories}
                            onCategoryToggle={handleCategoryToggle}
                            categories={categories}
                            onResetFilters={handleResetFilters}
                        />
                    )}

                    {/* Products Table Section */}
                    <div className="flex-1 space-y-4">
                        <div className="mb-4 text-sm text-gray-600">
                            Tìm thấy {filteredAndSortedProducts.length} sản phẩm
                        </div>

                        <div className="rounded-xl border bg-background">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hình ảnh</TableHead>
                                <TableHead>Tiêu đề</TableHead>
                                <TableHead>Danh mục</TableHead>
                                <TableHead>Thương hiệu</TableHead>
                                <TableHead>Giá</TableHead>
                                <TableHead>Tồn kho</TableHead>
                                <TableHead>Đánh giá</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                                        Không tìm thấy sản phẩm phù hợp.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayedProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            {product.thumbnail ? (
                                                <Image
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    width={48}
                                                    height={48}
                                                    className="h-12 w-12 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                                                    <span className="text-xs text-muted-foreground">Không</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-[280px]">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-tight">{product.title}</p>
                                                <p className="line-clamp-1 text-xs text-muted-foreground">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>{product.brand || "-"}</TableCell>
                                        <TableCell>{product.price.toLocaleString("vi-VN")}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <span>{product.rating}</span>
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                                                    <Pencil className="h-4 w-4" />
                                                    Sửa
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(product)}>
                                                    <Trash2 className="h-4 w-4" />
                                                    Xóa
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                        </div>

                        {filteredAndSortedProducts.length > 0 ? (
                            <ProductPagination
                                currentPage={safeCurrentPage}
                                totalPages={totalPages}
                                onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            />
                        ) : null}
                    </div>
                </div>
            )}

            <Dialog open={dialogOpen} onOpenChange={(open) => (open ? setDialogOpen(true) : closeDialog())}>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</DialogTitle>
                    </DialogHeader>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Tiêu đề" required>
                                <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
                            </Field>
                            <Field label="Danh mục" required>
                                <Input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
                            </Field>
                            <Field label="Thương hiệu">
                                <Input value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} />
                            </Field>
                            <Field label="SKU">
                                <Input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} />
                            </Field>
                            <Field label="Giá" required>
                                <Input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
                            </Field>
                            <Field label="Giảm giá (%)">
                                <Input type="number" min="0" step="0.01" value={form.discountPercentage} onChange={(event) => setForm({ ...form, discountPercentage: event.target.value })} />
                            </Field>
                            <Field label="Tồn kho">
                                <Input type="number" min="0" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} />
                            </Field>
                            <Field label="Trọng lượng">
                                <Input type="number" min="0" step="0.01" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} />
                            </Field>
                            <Field label="Số lượng tối thiểu">
                                <Input type="number" min="1" value={form.minimumOrderQuantity} onChange={(event) => setForm({ ...form, minimumOrderQuantity: event.target.value })} />
                            </Field>
                        </div>

                        <Field label="Mô tả" required>
                            <textarea
                                value={form.description}
                                onChange={(event) => setForm({ ...form, description: event.target.value })}
                                className="min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                            />
                        </Field>

                        <div className="grid gap-4 md:grid-cols-3">
                            <Field label="Rộng">
                                <Input type="number" min="0" step="0.01" value={form.width} onChange={(event) => setForm({ ...form, width: event.target.value })} />
                            </Field>
                            <Field label="Cao">
                                <Input type="number" min="0" step="0.01" value={form.height} onChange={(event) => setForm({ ...form, height: event.target.value })} />
                            </Field>
                            <Field label="Sâu">
                                <Input type="number" min="0" step="0.01" value={form.depth} onChange={(event) => setForm({ ...form, depth: event.target.value })} />
                            </Field>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Tags, cách nhau bằng dấu phẩy">
                                <Input value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} />
                            </Field>
                            <Field label="Ảnh, cách nhau bằng dấu phẩy">
                                <Input value={form.images} onChange={(event) => setForm({ ...form, images: event.target.value })} />
                            </Field>
                            <Field label="Thumbnail">
                                <Input value={form.thumbnail} onChange={(event) => setForm({ ...form, thumbnail: event.target.value })} />
                            </Field>
                            <Field label="Tình trạng sản phẩm">
                                <Input value={form.availabilityStatus} onChange={(event) => setForm({ ...form, availabilityStatus: event.target.value })} />
                            </Field>
                            <Field label="Bảo hành">
                                <Input value={form.warrantyInformation} onChange={(event) => setForm({ ...form, warrantyInformation: event.target.value })} />
                            </Field>
                            <Field label="Vận chuyển">
                                <Input value={form.shippingInformation} onChange={(event) => setForm({ ...form, shippingInformation: event.target.value })} />
                            </Field>
                            <Field label="Chính sách trả hàng">
                                <Input value={form.returnPolicy} onChange={(event) => setForm({ ...form, returnPolicy: event.target.value })} />
                            </Field>
                        </div>

                        <div className="flex items-center justify-end gap-2 border-t pt-4">
                            <Button type="button" variant="outline" onClick={closeDialog} disabled={saving}>
                                Hủy
                            </Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? "Đang lưu..." : editingProduct ? "Cập nhật" : "Thêm mới"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function Field({
    label,
    required,
    children,
}: {
    label: string
    required?: boolean
    children: React.ReactNode
}) {
    return (
        <label className="space-y-2 text-sm">
            <span className="font-medium text-foreground">
                {label}
                {required ? <span className="ml-1 text-destructive">*</span> : null}
            </span>
            {children}
        </label>
    )
}
