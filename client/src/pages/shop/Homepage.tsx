import React, { useState } from 'react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import FilterSidebar from '../../components/shop/FilterSidebar';
import ProductSection from '../../components/shop/ProductSection';

const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Apple Macbook Pro (chip M1, 8GB RAM, 256GB SSD...',
    price: 20000000,
    image: 'https://images.unsplash.com/photo-1517336714460-d13d87704a42?w=400&q=80',
    inStock: true,
    proximity: '<1km',
  },
  {
    id: '2',
    name: 'MacBook Air M1 - 8GB/256GB - Fullbox',
    price: 14200000,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?w=400&q=80',
    inStock: true,
    proximity: 'Tại Campus BK',
  },
  {
    id: '3',
    name: 'Giáo trình Giải tích 1 + 2 (Bách Khoa)',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
    inStock: true,
    proximity: 'Cách bạn 500m',
  },
  {
    id: '4',
    name: 'Bàn học sinh viên gỗ ép - 1m2',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?w=400&q=80',
    inStock: false,
    proximity: 'Tại Campus Kinh tế',
  },
  {
    id: '5',
    name: 'Máy tính Casio fx-580VN X',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1543286386-713bcd534bf5?w=400&q=80',
    inStock: true,
    proximity: 'Tại Campus Sư phạm',
  },
  {
    id: '6',
    name: 'Tai nghe Bluetooth Sony WH-1000XM4',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    inStock: true,
    proximity: 'Cách bạn 1.5km',
  },
];

const Homepage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Đồ điện tử' },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full bg-white">
        {/* Sidebar */}
        <FilterSidebar 
          onCategoryChange={(cat) => console.log('Category:', cat)}
          onLocationChange={(loc) => console.log('Location:', loc)}
          onPriceChange={(min, max) => console.log('Price range:', min, max)}
        />

        {/* Product List Section */}
        <ProductSection 
          products={DUMMY_PRODUCTS} 
          totalCount={DUMMY_PRODUCTS.length} 
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onSortChange={(sort) => console.log('Sort by:', sort)}
        />
      </div>
    </div>
  );
};

export default Homepage;
