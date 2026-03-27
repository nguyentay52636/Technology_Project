// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (

    <section className="flex flex-col items-center justify-center px-6 text-center py-32 min-h-[70vh]">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
          Chào mừng bạn! 👋
        </h1>
        
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Đây là trang chủ của bạn. Bạn có thể bắt đầu xây dựng nội dung tại đây 
          hoặc điều hướng đến các trang khác thông qua menu phía trên.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-500/25"
          >
            Khám phá Sản Phẩm 🚀
          </Link>
        </div>
      </div>
    </section>
  );
}