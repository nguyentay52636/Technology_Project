"use client"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import type { SVGProps } from "react"

// Custom Brand Icons (removed from lucide-react v1.0.0+)
const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
)
const Instagram = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)
const Twitter = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.17-2.41 3.06c1.19.06 2.37.41 3 1.03-.49 1.15-1.55 2.1-2.9 2.56-1.5 8.16-9.16 12.44-16.12 11.16C3.12 21.06 1.48 19.42 1 17.52c2.09.28 4.24-.13 5.86-1.42a4.49 4.49 0 0 1-4.08-3.13 4.41 4.41 0 0 0 2-.08 4.51 4.51 0 0 1-3.61-4.43 4.42 4.42 0 0 0 2.03.56 4.51 4.51 0 0 1-1.39-6C4.12 7.21 7.6 9.3 11.41 9.54a4.5 4.5 0 0 1 7.74-4.14 9 9 0 0 0 2.85-1.09z" /></svg>
)
const Youtube = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z" /><path d="m10 15 5-3-5-3z" /></svg>
)



const footerLinks = {
  sanPham: [
    { name: "Laptop", href: "#laptops" },
    { name: "Dien Tu", href: "#electronics" },
    { name: "Quan Ao", href: "#clothing" },
    { name: "Phu Kien", href: "#accessories" },
  ],
  hoTro: [
    { name: "Huong dan mua hang", href: "#" },
    { name: "Chinh sach doi tra", href: "#" },
    { name: "Chinh sach bao hanh", href: "#" },
    { name: "Phuong thuc thanh toan", href: "#" },
  ],
  veTechMart: [
    { name: "Gioi thieu", href: "#" },
    { name: "Tuyen dung", href: "#" },
    { name: "Lien he", href: "#" },
    { name: "Blog", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold">TechMart</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cung cap san pham cong nghe, thoi trang va phu kien chat luong cao
              voi gia ca tot nhat thi truong.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold">San Pham</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.sanPham.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Ho Tro</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.hoTro.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Ve TechMart</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.veTechMart.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-wrap gap-6 border-t border-border pt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>123 Nguyen Hue, Quan 1, TP.HCM</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>1900 1234</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>support@techmart.vn</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 TechMart. Tat ca quyen duoc bao luu.</p>
        </div>
      </div>
    </footer>
  )
}
