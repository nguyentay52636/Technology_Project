"use client"

import { useState, useMemo } from "react";
import ProductList from "./ProductList";
import AppPagination from "@/components/shared/AppPagination";
import ProductFilters, { type SortOption } from "./ProductFilters";
import type { Product } from "@/apis/productApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertUsdToVnd } from "@/utils/format";

const ITEMS_PER_PAGE = 8;

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1_000_000_000 });
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showFilters, setShowFilters] = useState(true);

  // Extract unique brands and categories
  const brands = useMemo(() => [...new Set(products.map(p => p.brand).filter(Boolean))].sort(), [products]);
  const categories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))].sort(), [products]);
  const maxPrice = useMemo(() => Math.max(...products.map(p => convertUsdToVnd(p.price)), 10000), [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const title = product.title?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch = title.includes(searchLower) ||
        brand.includes(searchLower) ||
        category.includes(searchLower);

      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || (product.category && selectedCategories.includes(product.category));

      // Price filter
      const priceInVnd = convertUsdToVnd(product.price);
      const matchesPrice = priceInVnd >= priceRange.min && priceInVnd <= priceRange.max;



      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        case "relevance":
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: maxPrice });
    setSortBy("relevance");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1"
        />
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        {showFilters && (
          <ProductFilters
            sortBy={sortBy}
            onSortChange={(value) => {
              setSortBy(value);
              setCurrentPage(1);
            }}
            priceRange={priceRange}
            onPriceChange={(range) => {
              setPriceRange(range);
              setCurrentPage(1);
            }}
            maxPrice={maxPrice}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            brands={brands}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            categories={categories}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Products Section */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Tìm thấy {filteredAndSortedProducts.length} sản phẩm
          </div>

          <ProductList products={displayedProducts} />

          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
            onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>
    </div>
  );
}