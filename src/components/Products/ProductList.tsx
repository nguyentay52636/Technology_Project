import ProductCard from '../ProductCard';
import type { Product } from '@/apis/productApi';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Đang tải sản phẩm hoặc không tìm thấy dữ liệu...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((p) => (
        <div key={p.id} className="h-full">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}