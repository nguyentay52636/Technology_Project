"use client"

import { useState } from "react";
import ProductList from "./ProductList";
import ProductPagination from "./ProductPagination";
import type { Product } from "@/apis/productApi";

const ITEMS_PER_PAGE = 8;

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <ProductList products={displayedProducts} />

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
      />
    </div>
  );
}