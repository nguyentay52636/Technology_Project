// src/app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 font-sans">
      
      {/* Phần tiêu đề */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          Câu chuyện của <span className="text-blue-600">NextApp</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Chúng tôi xây dựng những nền tảng công nghệ hiện đại nhằm giúp các lập trình viên tiếp cận kiến thức một cách dễ dàng và hiệu quả nhất.
        </p>
      </section>

      {/* Phần nội dung chi tiết (Layout 2 cột) */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sứ mệnh của chúng tôi</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Tại NextApp, chúng tôi tin rằng việc học lập trình không nên là một trở ngại. 
            Mục tiêu của chúng tôi là cung cấp các công cụ và hướng dẫn tốt nhất về Next.js, 
            giúp bạn biến ý tưởng thành sản phẩm thực tế chỉ trong thời gian ngắn.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">✓</span>
              Tối ưu hóa hiệu suất ứng dụng
            </li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">✓</span>
              Cập nhật công nghệ mới nhất
            </li>
          </ul>
        </div>
        
        {/* Hình ảnh minh họa hoặc Box trang trí */}
        <div className="h-64 bg-gray-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-zinc-800">
           <span className="text-gray-400 font-medium italic">[Hình ảnh minh họa]</span>
        </div>
      </div>

      {/* Phần kêu gọi hành động (CTA) */}
      <section className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Bạn đã sẵn sàng bắt đầu chưa?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Hãy cùng chúng tôi khám phá kho tàng kiến thức và danh sách các sản phẩm tuyệt vời nhất.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Xem Sản Phẩm
          </button>
          <button className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
            Liên hệ ngay
          </button>
        </div>
      </section>
    </div>
  );    
}