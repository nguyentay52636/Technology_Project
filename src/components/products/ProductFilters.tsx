"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-asc" | "rating-desc";

interface ProductFiltersProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (range: { min: number; max: number }) => void;
  maxPrice: number;
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  brands: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  categories: string[];
  onResetFilters: () => void;
}

export default function ProductFilters({
  sortBy,
  onSortChange,
  priceRange,
  onPriceChange,
  maxPrice,
  selectedBrands,
  onBrandToggle,
  brands,
  selectedCategories,
  onCategoryToggle,
  categories,
  onResetFilters,
}: ProductFiltersProps) {
  return (
    <div className="w-64 bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
      <div className="space-y-6">
        {/* Sort */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Sắp xếp</h3>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
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
                  onPriceChange({ ...priceRange, min: Math.min(Number(e.target.value), priceRange.max) });
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
                  onPriceChange({ ...priceRange, max: Math.max(Number(e.target.value), priceRange.min) });
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
                  onCheckedChange={() => onCategoryToggle(category)}
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
                  onCheckedChange={() => onBrandToggle(brand)}
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
          onClick={onResetFilters}
        >
          Đặt lại bộ lọc
        </Button>
      </div>
    </div>
  );
}
