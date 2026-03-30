"use client"
import { useState, useEffect } from 'react';
import { productApi, type Product } from '@/apis/productApi';
import { Spinner } from '@/components/ui/spinner';
import ProductList from '@/components/Products/components/ProductList';
import ProductPagination from '@/components/Products/components/ProductPagination';

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const data = await productApi.getProducts();
        
        setProducts(data);
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Lỗi tải sản phẩm";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Danh sách Sản phẩm</h1>
      
      {loading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded">
          Lỗi: {error}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500">Không có sản phẩm nào</div>
      )}

      {!loading && displayedProducts.length > 0 && (
        <>
          <ProductList products={displayedProducts} />
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
          />
        </>
      )}
    </div>
  );
}