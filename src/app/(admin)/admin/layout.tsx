"use client"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    BarChart3,
    LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/ui/ModeTogger"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { name: "Tong quan", href: "/admin", icon: LayoutDashboard },
    { name: "San pham", href: "/admin/products", icon: Package },
    { name: "Don hang", href: "", icon: ShoppingCart },
    { name: "Khach hang", href: "", icon: Users },
    { name: "Thong ke", href: "", icon: BarChart3 },
    { name: "Cai dat", href: "", icon: Settings },
]

function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname()

    return (
        <div className={cn("flex h-full flex-col border-r border-border bg-card", className)}>
            <div className="flex h-16 items-center border-b border-border px-6">
                <Link href="/admin" className="font-serif text-xl font-bold">
                    TechMart Admin
                </Link>
            </div>
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="flex flex-col gap-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </ScrollArea>
            <div className="border-t border-border p-4">
                <Link href="/">
                    <Button variant="outline" className="w-full gap-2">
                        <LogOut className="h-4 w-4" />
                        Tro ve cua hang
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <Sidebar className="hidden md:flex md:w-64" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="md:hidden" />
                    <Separator
                        orientation="vertical"
                        className="hidden h-4 md:block"
                    />
                    <p className="text-sm font-medium text-muted-foreground">Admin Dashboard</p>
                    <div className="ml-auto">
                        <ModeToggle />
                    </div>
                </header>
                <main className="flex-1 overflow-auto">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
