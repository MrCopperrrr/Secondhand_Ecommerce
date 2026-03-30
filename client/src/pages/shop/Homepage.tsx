import React, { useState } from 'react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import FilterSidebar from '../../components/shop/FilterSidebar';
import ProductSection from '../../components/shop/ProductSection';

import DUMMY_PRODUCTS from '../../data/products.json';

const Homepage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoriesMap: Record<string, string> = {
    'all': 'Tất cả',
    'electronics': 'Đồ điện tử',
    'books': 'Sách giáo trình',
    'home': 'Đồ gia dụng',
    'school': 'Dụng cụ học tập',
    'clothing': 'Quần áo',
    'furniture': 'Đồ nội thất',
    'transport': 'Phương tiện di chuyển',
    'sports': 'Dụng cụ thể thao'
  };

  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' }
  ];

  if (selectedCategory !== 'all') {
    breadcrumbItems.push({ label: categoriesMap[selectedCategory] || selectedCategory });
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full bg-white">
        {/* Sidebar */}
        <FilterSidebar 
          onCategoryChange={(cat) => setSelectedCategory(cat)}
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
