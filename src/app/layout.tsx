import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

// 1. Import các component của bạn vào đây
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextApp - Học Next.js",
  description: "Trang web thực hành Next.js chuyên nghiệp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <Toaster position="top-right" richColors />
          <CartProvider>
            <TooltipProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </TooltipProvider>
          </CartProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}