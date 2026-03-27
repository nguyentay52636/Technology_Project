// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Cột 1: Giới thiệu ngắn */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <span className="text-xl font-bold dark:text-white">NextApp</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Nền tảng học tập và trải nghiệm Next.js hiện đại, giúp bạn xây dựng ứng dụng nhanh hơn bao giờ hết.
            </p>
          </div>

          {/* Cột 2: Điều hướng nhanh */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Khám phá</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 transition">Sản phẩm</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-blue-600 transition">Tài liệu</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Điều khoản sử dụng</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Kết nối</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Email: support@nextapp.com <br/>
              Hà Nội, Việt Nam
            </p>
            <div className="flex gap-4">
              {/* Các icon mạng xã hội giả lập */}
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer">f</div>
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer">t</div>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền dưới cùng */}
        <div className="pt-8 border-t border-gray-100 dark:border-zinc-800 text-center">
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            © 2026 NextApp. Tất cả các quyền được bảo lưu. Thiết kế bởi Gemini.
          </p>
        </div>
      </div>
    </footer>
  );
}