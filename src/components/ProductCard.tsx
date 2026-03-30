'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/apis/productApi';

// Định nghĩa kiểu dữ liệu cho Props
interface ProductCardProps {
  product: Product;
}

// 1. COMPONENT & PROPS: Nhận dữ liệu thông qua tham số (Props)
export default function ProductCard({ product }: ProductCardProps) {


  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition bg-white h-full flex flex-col">
      <div className="relative h-52 w-full mb-4 rounded-lg bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-contain p-4"
        />
      </div>

      <h2 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-14">{product.title}</h2>
      <p className="text-gray-500 mt-2 text-sm line-clamp-4 flex-1">{product.description}</p>
      <p className="text-blue-600 font-bold mt-3">{product.price.toLocaleString('vi-VN')} VNĐ</p>
      
      {/* Nút bấm tương tác cập nhật State */}
      <button 
        onClick={() => alert(`Đã thêm "${product.title}" vào giỏ hàng!`)}
        className="mt-4 bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2"
      >
        <span>🛒</span> Thêm vào giỏ hàng
      </button>
    </div>
  );
}