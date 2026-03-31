"use client"
import { usePathname } from "next/navigation";
import { Header } from "./feature/Header";
import { Footer } from "./feature/Footer";
import { CartSheet } from "./Home/components/CartSheet/CartSheet";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHideNavbarFooter = pathname.startsWith("/admin");

  if (isHideNavbarFooter) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <CartSheet />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
