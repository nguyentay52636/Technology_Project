
import { useState, useEffect } from "react"
import Image from "next/image"
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ApiProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

const categoryMap: Record<string, string> = {
    "electronics": "Dien Tu",
    "jewelery": "Trang Suc",
    "men's clothing": "Quan Ao Nam",
    "women's clothing": "Quan Ao Nu",
}

const ITEMS_PER_PAGE = 10

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price)
}

function getCategoryBadge(category: string) {
    const displayName = categoryMap[category] || category
    return <Badge variant="outline">{displayName}</Badge>
}

export default function ManagerProduct() {
    const [products, setProducts] = useState<ApiProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [selectedProducts, setSelectedProducts] = useState<number[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products")
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const filteredProducts = products.filter((p) => {
        const matchesCategory = activeTab === "all" || categoryMap[p.category] === activeTab
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const toggleProduct = (id: number) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        if (selectedProducts.length === displayedProducts.length) {
            setSelectedProducts([])
        } else {
            setSelectedProducts(displayedProducts.map((p) => p.id))
        }
    }

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    const getCategoryCounts = () => {
        return {
            all: products.length,
            "Dien Tu": products.filter((p) => categoryMap[p.category] === "Dien Tu").length,
            "Trang Suc": products.filter((p) => categoryMap[p.category] === "Trang Suc").length,
            "Quan Ao Nam": products.filter((p) => categoryMap[p.category] === "Quan Ao Nam").length,
            "Quan Ao Nu": products.filter((p) => categoryMap[p.category] === "Quan Ao Nu").length,
        }
    }

    const counts = getCategoryCounts()

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold">San pham</h1>
                    <p className="text-muted-foreground">Quan ly tat ca san pham cua cua hang</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Them san pham
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Them san pham moi</DialogTitle>
                            <DialogDescription>
                                Dien day du thong tin de them san pham moi vao cua hang
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="gap-4">
                            <Field>
                                <FieldLabel>Ten san pham</FieldLabel>
                                <Input placeholder="Nhap ten san pham" />
                            </Field>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel>Gia ban (USD)</FieldLabel>
                                    <Input type="number" placeholder="0" />
                                </Field>
                                <Field>
                                    <FieldLabel>So luong</FieldLabel>
                                    <Input type="number" placeholder="0" />
                                </Field>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel>Danh muc</FieldLabel>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chon danh muc" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="electronics">Dien Tu</SelectItem>
                                            <SelectItem value="jewelery">Trang Suc</SelectItem>
                                            <SelectItem value="men's clothing">Quan Ao Nam</SelectItem>
                                            <SelectItem value="women's clothing">Quan Ao Nu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field>
                                    <FieldLabel>Trang thai</FieldLabel>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chon trang thai" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Dang ban</SelectItem>
                                            <SelectItem value="draft">Nhap</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel>Mo ta</FieldLabel>
                                <Input placeholder="Nhap mo ta san pham" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <Button variant="outline">Huy</Button>
                            <Button>Luu san pham</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <Tabs value={activeTab} onValueChange={handleTabChange}>
                            <TabsList className="h-auto flex-wrap">
                                <TabsTrigger value="all">Tat ca ({counts.all})</TabsTrigger>
                                <TabsTrigger value="Dien Tu">Dien Tu ({counts["Dien Tu"]})</TabsTrigger>
                                <TabsTrigger value="Trang Suc">Trang Suc ({counts["Trang Suc"]})</TabsTrigger>
                                <TabsTrigger value="Quan Ao Nam">Nam ({counts["Quan Ao Nam"]})</TabsTrigger>
                                <TabsTrigger value="Quan Ao Nu">Nu ({counts["Quan Ao Nu"]})</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Tim kiem..."
                                    className="w-[200px] pl-8"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Spinner className="h-8 w-8" />
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedProducts.length === displayedProducts.length && displayedProducts.length > 0}
                                                onCheckedChange={toggleAll}
                                            />
                                        </TableHead>
                                        <TableHead>San pham</TableHead>
                                        <TableHead>Danh muc</TableHead>
                                        <TableHead>Gia</TableHead>
                                        <TableHead className="hidden md:table-cell">Danh gia</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayedProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedProducts.includes(product.id)}
                                                    onCheckedChange={() => toggleProduct(product.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-secondary">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.title}
                                                            fill
                                                            className="object-contain p-1"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate font-medium">{product.title}</p>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            ID: {product.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getCategoryBadge(product.category)}
                                            </TableCell>
                                            <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">&#9733;</span>
                                                    <span>{product.rating.rate}</span>
                                                    <span className="text-muted-foreground">({product.rating.count})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Xem
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Sua
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Xoa
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Hien thi {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} trong {filteredProducts.length} san pham
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="mr-1 h-4 w-4" />
                                            Truoc
                                        </Button>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <Button
                                                    key={page}
                                                    variant={currentPage === page ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Sau
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {filteredProducts.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-muted-foreground">Khong tim thay san pham</p>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
