'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Breadcrumbs } from '@/components/home/breadcrumbs';
import { FilterSidebar } from '@/components/home/filter-sidebar';
import { ProductSection } from '@/components/home/product-section';

// Mock products data with deterministic values
const PRICES = [
  1500000, 2200000, 3500000, 4800000, 5200000, 6100000, 7300000, 8500000,
  1800000, 2900000, 3800000, 4500000, 5900000, 6500000, 7800000, 8900000,
  2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000,
  1600000, 2500000, 3600000, 4700000, 5500000, 6800000, 7500000, 8800000,
  1700000, 2800000, 3700000, 4600000, 5800000, 6700000, 7900000, 9100000,
  1900000, 3100000, 3900000, 4900000, 6100000, 7100000, 8100000, 9200000,
];

const PROXIMITIES = ['<1km', '<2km', '<3km', '<4km', '<5km'];

const MOCK_PRODUCTS = Array.from({ length: 48 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Sản phẩm ${i + 1}`,
  price: PRICES[i % PRICES.length],
  image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=400&fit=crop`,
  inStock: i % 3 !== 0,
  proximity: PROXIMITIES[i % PROXIMITIES.length],
}));

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState('newest');
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = MOCK_PRODUCTS.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
      <Navbar />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tất cả sản phẩm' },
        ]}
      />

      {/* Main Layout - Sidebar + Content */}
      <div className="flex flex-1 max-w-full">
        <FilterSidebar
          onCategoryChange={(category) => {
            setCurrentPage(1);
            console.log('Category changed:', category);
          }}
          onLocationChange={(location) => {
            setCurrentPage(1);
            console.log('Location changed:', location);
          }}
          onPriceChange={(min, max) => {
            setCurrentPage(1);
            console.log('Price range changed:', min, max);
          }}
        />

        <ProductSection
          products={paginatedProducts}
          totalCount={MOCK_PRODUCTS.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSortChange={setSortValue}
        />
      </div>

      <Footer />
    </div>
  );
}
