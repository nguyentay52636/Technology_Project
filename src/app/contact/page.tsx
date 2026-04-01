// src/app/contact/page.tsx
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 font-sans">
      
      {/* Tiêu đề trang */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          Liên hệ với <span className="text-blue-600">chúng tôi</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Đội ngũ NextApp luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn 24/7. 
          Đừng ngần ngại gửi tin nhắn cho chúng tôi!
        </p>
      </section>

      <main className="grid md:grid-cols-2 gap-16 items-start">
        
        {/* CỘT 1: FORM LIÊN HỆ */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Gửi tin nhắn</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-300">Tên của bạn</label>
              <input 
                type="text" 
                placeholder="Nguyễn Văn A" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-300">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-300">Nội dung</label>
              <textarea 
                rows={4} 
                placeholder="Tôi muốn hỏi về..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-[0.98]">
              Gửi ngay 🚀
            </button>
          </form>
        </div>

        {/* CỘT 2: THÔNG TIN TRỰC TIẾP */}
        <div className="space-y-12 py-4">
          <div>
            <h2 className="text-2xl font-bold mb-8 dark:text-white">Thông tin kết nối</h2>
            <div className="space-y-8">
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-bold dark:text-white">Văn phòng chính</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Số 123, Đường Công Nghệ, Quận Cầu Giấy, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-bold dark:text-white">Hotline hỗ trợ</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">0123 456 789 (8:00 - 21:00)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-bold dark:text-white">Email</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">contact@nextapp.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Bản đồ giả lập hoặc Box trang trí */}
          <div className="h-48 bg-blue-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center border-2 border-dashed border-blue-200 dark:border-zinc-700">
             <p className="text-blue-400 font-medium">Google Map Placeholder</p>
          </div>
        </div>

      </main>
    </div>
  );
}