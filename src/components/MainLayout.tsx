"use client"
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { Header } from "./feature/Header";
import { Footer } from "./feature/Footer";
import { CartSheet } from "./home/CartSheet";
import { Button } from "./ui/button";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHideNavbarFooter = pathname.startsWith("/admin");
  const topRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isHideNavbarFooter) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <div ref={topRef} />
      <Header />
      <CartSheet />
      <main className="flex-1">{children}</main>
      <Footer />
      <Button
        type="button"
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </>
  );
}
