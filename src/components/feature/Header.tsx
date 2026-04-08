"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { useCartAPI } from "@/hooks/useCartAPI"
import { Badge } from "../ui/badge"
import { NavUser } from "../user/nav-user"

type StoredUser = {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  image?: string
  role?: string
}

const getStoredUser = (): StoredUser | null => {
  if (typeof window === "undefined") {
    return null
  }

  const storedUser = localStorage.getItem("currentUser")
  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as StoredUser
  } catch (error) {
    console.error("Failed to parse user data:", error)
    return null
  }
}

const categories = [
  { name: "Trang Chủ", href: "/" },
  { name: "Sản Phẩm", href: "/products" },
  { name: "Giới Thiệu", href: "/about" },
  { name: "Liên Hệ", href: "/contact" },
]

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null)
  const { itemCount, setIsCartOpen } = useCart()
  const { deleteCartOnLogout } = useCartAPI()

  const userRole = currentUser?.role?.toLowerCase() ?? null
  const isAdminOrModerator = userRole === "admin" || userRole === "moderator"
  const isLoggedIn = Boolean(currentUser)
  const displayName = currentUser?.lastName || currentUser?.username || "Tài khoản"

  useEffect(() => {
    const syncAuthUser = () => {
      setCurrentUser(getStoredUser())
    }

    syncAuthUser()
    window.addEventListener("storage", syncAuthUser)
    window.addEventListener("auth-changed", syncAuthUser)

    return () => {
      window.removeEventListener("storage", syncAuthUser)
      window.removeEventListener("auth-changed", syncAuthUser)
    }
  }, [])

  const handleLogout = () => {
    // 🚪 Clear cart from Context
    deleteCartOnLogout()
    
    localStorage.removeItem("currentUser")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.dispatchEvent(new Event("auth-changed"))
    setDropdownOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="font-serif text-xl">Danh Mục</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-lg font-medium transition-colors hover:text-accent"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight">TechMart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          
          {/* User */}
          {isLoggedIn ? (
            <NavUser
              variant="header"
              user={{
                name: displayName,
                email: currentUser?.email,
                avatar: currentUser?.image || "",
              }}
              isAdminOrModerator={isAdminOrModerator}
              onLogout={handleLogout}
            />
          ) : (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Tài khoản</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild onClick={() => setDropdownOpen(false)}>
                  <Link href="/login">Đăng nhập</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => setDropdownOpen(false)}>
                  <Link href="/signup">Đăng ký</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {itemCount}
              </Badge>
            )}
            <span className="sr-only">Giỏ hàng</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
