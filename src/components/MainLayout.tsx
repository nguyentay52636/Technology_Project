"use client"
import { usePathname } from "next/navigation";
import { Header } from "./feature/Header";
import { Footer } from "./feature/Footer";

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
