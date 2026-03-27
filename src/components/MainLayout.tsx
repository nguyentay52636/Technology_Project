"use client"
import { usePathname } from "next/navigation";
import Footer from "./feature/Footer";
import Header from "./feature/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHideNavbarFooter = pathname.startsWith("/admin");

  if (isHideNavbarFooter) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
