"use client"
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHideNavbarFooter = pathname.startsWith("/admin");

  if (isHideNavbarFooter) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
