import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import các component của bạn vào đây
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 2. Thêm flex-col để Footer luôn nằm dưới cùng */}
      <body className="min-h-full flex flex-col bg-white dark:bg-black">
        
        {/* Navbar sẽ luôn xuất hiện ở đầu trang */}
        <Navbar />

        {/* main với flex-1 để "đẩy" Footer xuống đáy nếu nội dung trang ít */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer sẽ luôn xuất hiện ở cuối trang */}
        <Footer />

      </body>
    </html>
  );
}