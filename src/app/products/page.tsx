import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* 4. ROUTING: Điều hướng về trang chủ */}
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block font-medium">
        &larr; Quay lại Trang chủ
      </Link>
      
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Danh sách Sản phẩm</h1>
      
      {/* Sử dụng Component và truyền Props */}
      <div className="flex flex-wrap gap-6">
        <ProductCard 
          title="Khóa học Next.js App Router" 
          price={1200000} 
          description="Học Next.js 14-15 từ cơ bản đến nâng cao, ứng dụng Clean Architecture." 
        />
        <ProductCard 
          title="React.js Mastery" 
          price={850000} 
          description="Trở thành chuyên gia React với Hooks, State Management và Patterns." 
        />
        <ProductCard 
          title="TypeScript cho Frontend" 
          price={600000} 
          description="Nắm vững TypeScript để viết code an toàn và chuyên nghiệp hơn." 
        />
      </div>
    </div>
  );
}