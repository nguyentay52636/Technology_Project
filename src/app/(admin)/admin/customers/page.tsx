"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { usersApi, type User } from "@/apis/usersApi"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import ProductPagination from "@/components/Products/ProductPagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const ITEMS_PER_PAGE = 10

export default function CustomersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await usersApi.getUsers()
                // Filter users with role "user"
                const userRoleUsers = result.filter(user => user.role === "user")
                setUsers(userRoleUsers)
            } catch (error) {
                console.error("Failed to fetch users:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase()
        return (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query)
        )
    })

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE))
    const safeCurrentPage = Math.min(currentPage, totalPages)
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    const displayedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Reset to page 1 when search query changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Quản lý Khách hàng</h1>
                    <p className="text-sm text-muted-foreground">
                        Danh sách tất cả khách hàng có vai trò User.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Khách hàng</CardTitle>
                    <CardDescription>Tìm kiếm và quản lý khách hàng.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Tìm kiếm theo tên, email, hoặc số điện thoại..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Số điện thoại</TableHead>
                                <TableHead>Tên đăng nhập</TableHead>
                                <TableHead>Vai trò</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <>
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Skeleton className="h-4 w-24" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-32" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-24" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-20" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-16" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : displayedUsers.length > 0 ? (
                                displayedUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="cursor-pointer hover:bg-muted/50 transition"
                                        onClick={() => {
                                            setSelectedUser(user)
                                            setDetailsOpen(true)
                                        }}
                                    >
                                        <TableCell className="font-medium">
                                            {user.firstName} {user.lastName}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{user.role}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                                        Không có khách hàng
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Count and Pagination */}
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            Tìm thấy {filteredUsers.length} khách hàng
                        </div>

                        {filteredUsers.length > 0 && (
                            <ProductPagination
                                currentPage={safeCurrentPage}
                                totalPages={totalPages}
                                onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* User Details Dialog */}
            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-10xl">
                    <DialogHeader>
                        <DialogTitle>Chi tiết khách hàng</DialogTitle>
                    </DialogHeader>

                    {selectedUser && (
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Họ</p>
                                    <p className="text-sm font-semibold">{selectedUser.firstName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Tên</p>
                                    <p className="text-sm font-semibold">{selectedUser.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Tên đăng nhập</p>
                                    <p className="text-sm font-semibold">{selectedUser.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Vai trò</p>
                                    <Badge variant="outline">{selectedUser.role}</Badge>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 gap-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm font-semibold break-all">{selectedUser.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
                                    <p className="text-sm font-semibold">{selectedUser.phone}</p>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Giới tính</p>
                                    <p className="text-sm font-semibold">{selectedUser.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Ngày sinh</p>
                                    <p className="text-sm font-semibold">
                                        {new Date(selectedUser.birthDate).toLocaleDateString("vi-VN")}
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-3 pb-4 border-b">
                                <h3 className="font-semibold text-sm">Địa chỉ</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Địa chỉ</p>
                                        <p className="font-medium">{selectedUser.address.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Thành phố</p>
                                        <p className="font-medium">{selectedUser.address.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Bang/Tỉnh</p>
                                        <p className="font-medium">{selectedUser.address.state}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Mã bưu chính</p>
                                        <p className="font-medium">{selectedUser.address.postalCode}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-muted-foreground">Quốc gia</p>
                                        <p className="font-medium">{selectedUser.address.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
