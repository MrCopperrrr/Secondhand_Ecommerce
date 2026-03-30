import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

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

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  totalCount,
  currentPage,
  onPageChange,
  onSortChange,
}) => {
  const [sortValue, setSortValue] = useState('newest');
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortValue(value);
    onSortChange?.(value);
  };

  return (
    <main className="flex-1 bg-white p-6 min-h-screen rounded-none">
      {/* Toolbar */}
      <div className="bg-white rounded-none border border-white p-4 mb-6 flex items-center justify-between">
        <div className="text-sm text-[#686868]">
          Hiển thị <span className="font-semibold text-[#191C1F]">{totalCount}</span> kết quả
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-[#686868] font-medium hidden sm:block">Sắp xếp:</label>
          <select 
            value={sortValue} 
            onChange={handleSortChange}
            className="border border-gray-200 bg-white text-[#686868] p-2 rounded-none text-sm outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
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
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => onPageChange?.(page)}
          />
        </div>
      )}
    </main>
  );
};

export default ProductSection;
