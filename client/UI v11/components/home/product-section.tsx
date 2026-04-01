'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from './product-card';
import { PaginationControls } from './pagination';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  proximity: string;
}

interface ProductSectionProps {
  products: Product[];
  totalCount: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sort: string) => void;
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-low', label: 'Giá thấp đến cao' },
  { value: 'price-high', label: 'Giá cao đến thấp' },
  { value: 'popular', label: 'Phổ biến nhất' },
];

const PRODUCTS_PER_PAGE = 12;

export function ProductSection({
  products,
  totalCount,
  currentPage,
  onPageChange,
  onSortChange,
}: ProductSectionProps) {
  const [sortValue, setSortValue] = useState('newest');
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const handleSortChange = (value: string) => {
    setSortValue(value);
    onSortChange?.(value);
  };

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

  return (
    <main className="flex-1 bg-[#F2F4F5] p-6">
      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-[#C9CFD2] p-4 mb-6 flex items-center justify-between">
        <div className="text-sm text-[#686868]">
          Hiển thị <span className="font-semibold text-[#191C1F]">{totalCount}</span> kết quả
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-[#686868] font-medium">Sắp xếp:</label>
          <Select value={sortValue} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48 border-[#C9CFD2] bg-white text-[#686868]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
