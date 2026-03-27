'use client';
import { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho Props
interface ProductCardProps {
  title: string;
  price: number;
  description: string;
}

// 1. COMPONENT & PROPS: Nhận dữ liệu thông qua tham số (Props)
export default function ProductCard({ title, price, description }: ProductCardProps) {
  // 2. STATE: Quản lý số lượt thích của mỗi sản phẩm
  const [likes, setLikes] = useState(0);

  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition max-w-sm bg-white">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-2 text-sm">{description}</p>
      <p className="text-blue-600 font-bold mt-3">{price.toLocaleString('vi-VN')} VNĐ</p>
      
      {/* Nút bấm tương tác cập nhật State */}
      <button 
        onClick={() => setLikes(likes + 1)}
        className="mt-4 bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2"
      >
        <span>❤️</span> Yêu thích ({likes})
      </button>
    </div>
  );
}