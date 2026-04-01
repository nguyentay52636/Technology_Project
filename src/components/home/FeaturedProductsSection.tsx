"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Product } from "@/apis/productApi";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const featuredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return b.discountPercentage - a.discountPercentage;
      })
      .slice(0, 4);
  }, [products]);

  if (!products.length) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Sản phẩm nổi bật</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Chọn lọc theo đánh giá và mức giảm giá tốt nhất.
          </p>
        </div>

        {products.length > featuredProducts.length && (
          <Button asChild>
            <Link href="/products">Xem thêm</Link>
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/40 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}