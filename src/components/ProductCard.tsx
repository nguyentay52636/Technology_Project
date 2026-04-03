'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/apis/productApi';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

// Định nghĩa kiểu dữ liệu cho Props
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { items, addItem } = useCart();

  const handleGoToDetail = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleGoToDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleGoToDetail();
        }
      }}
      className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition bg-white h-full flex flex-col cursor-pointer"
    >
      <div className="relative h-52 w-full mb-4 rounded-lg bg-gray-100 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-contain p-4 transition-transform hover:scale-110"
        />
        
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-14">
        {product.title}
      </h2>

      <div className="flex items-center gap-1 mb-1">
        <span className="text-yellow-500 text-sm">⭐</span>
        <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
        <span className="text-xs text-gray-400">({product.stock} còn lại)</span>
      </div>

      <p className="text-gray-500 mt-1 text-sm line-clamp-3 flex-1">
        {product.description}
      </p>

      <div className="mt-3">
        <p className="text-blue-600 font-bold text-lg">
          {product.price.toLocaleString('vi-VN')} $
        </p>
        {product.brand?.trim() && (
          <span className="text-xs text-gray-400 italic">Thương hiệu: {product.brand}</span>
        )}
      </div>
      
      <button
        onClick={(event) => {
          event.stopPropagation();
          const existingItem = items.find((item) => item.id === String(product.id));
          const nextQuantity = (existingItem?.quantity ?? 0) + 1;
          

          addItem({
            id: String(product.id),
            name: product.title,
            price: product.price,
            image: product.thumbnail,
            category: product.category,
            originalPrice:
              product.discountPercentage > 0
                ? product.price / (1 - product.discountPercentage / 100)
                : undefined,
          });
          toast.success(
            `Đã thêm "${product.title}" vào giỏ hàng (x${nextQuantity})`
          );
        }}
        className="mt-4 bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition font-medium flex items-center justify-center gap-2"
      >
        <span>🛒</span> Thêm vào giỏ hàng
      </button>
    </div>
  );
}