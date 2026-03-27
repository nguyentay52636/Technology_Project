import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">NextApp</span>
        </div>

        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
            <Link href="/products" className="hover:text-blue-600 transition">Sản phẩm</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
          </nav>

          <div className="flex items-center">
             <Link href="/login" className="text-sm font-bold px-5 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 transition">
                Sign In
              </Link>
          </div>
        </div>
      </div>
    </header>
  );
}