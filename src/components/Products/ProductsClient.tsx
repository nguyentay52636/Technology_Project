"use client"

import { useState, useMemo } from "react";
import ProductList from "./ProductList";
import ProductPagination from "./ProductPagination";
import type { Product } from "@/apis/productApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ITEMS_PER_PAGE = 8;

interface ProductsClientProps {
  products: Product[];
}

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-asc" | "rating-desc";

export default function ProductsClient({ products }: ProductsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showFilters, setShowFilters] = useState(true);

  // Extract unique brands and categories
  const brands = useMemo(() => [...new Set(products.map(p => p.brand).filter(Boolean))].sort(), [products]);
  const categories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))].sort(), [products]);
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 10000), [products]);

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
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;



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
          <div className="w-64 bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
            <div className="space-y-6">
              {/* Sort */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Sắp xếp</h3>
                <Select value={sortBy} onValueChange={(value) => {
                  setSortBy(value as SortOption);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn cách sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "relevance", label: "Liên quan" },
                      { value: "price-asc", label: "Giá: Thấp → Cao" },
                      { value: "price-desc", label: "Giá: Cao → Thấp" },
                      { value: "rating-asc", label: "Đánh giá: Thấp → Cao" },
                      { value: "rating-desc", label: "Đánh giá: Cao → Thấp" }
                    ].map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Mức giá</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Từ:</label>
                    <Input
                      type="number"
                      min="0"
                      max={maxPrice}
                      value={priceRange.min}
                      onChange={(e) => {
                        setPriceRange({ ...priceRange, min: Math.min(Number(e.target.value), priceRange.max) });
                        setCurrentPage(1);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Đến:</label>
                    <Input
                      type="number"
                      min="0"
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={(e) => {
                        setPriceRange({ ...priceRange, max: Math.max(Number(e.target.value), priceRange.min) });
                        setCurrentPage(1);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Tối đa: ${maxPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Danh mục</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map(category => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="cursor-pointer text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Thương hiệu</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center gap-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="cursor-pointer text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResetFilters}
              >
                Đặt lại bộ lọc
              </Button>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Tìm thấy {filteredAndSortedProducts.length} sản phẩm
          </div>

          <ProductList products={displayedProducts} />

          <ProductPagination
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