import React, { useState, useMemo } from 'react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import FilterSidebar from '../../components/shop/FilterSidebar';
import ProductSection from '../../components/shop/ProductSection';
import DUMMY_PRODUCTS_RAW from '../../data/products.json';

// Define product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  proximity: string;
  proximityLabel?: string;
  category: string;
  createdAt: string;
}

const Homepage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 }); // In VND
  const [sortBy, setSortBy] = useState('newest');

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

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...DUMMY_PRODUCTS_RAW] as Product[];

    // 1. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by Location
    if (selectedLocation !== 'all' && selectedLocation !== '') {
      result = result.filter(p => p.proximity === selectedLocation);
    }

    // 3. Filter by Price (Raw VND values)
    result = result.filter(p => {
      const isOverLimit = priceRange.max >= 50000000;
      return p.price >= priceRange.min && (isOverLimit ? true : p.price <= priceRange.max);
    });

    // 4. Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: Newest (using createdAt string)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [selectedCategory, selectedLocation, priceRange, sortBy]);

  // Derived data for display
  const displayProducts = filteredProducts.map(p => ({
    ...p,
    proximity: p.proximityLabel || p.proximity
  }));

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
          onCategoryChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
          onLocationChange={(loc) => { setSelectedLocation(loc); setCurrentPage(1); }}
          onPriceChange={(min, max) => { setPriceRange({ min, max }); setCurrentPage(1); }}
        />

        {/* Product List Section */}
        <ProductSection 
          products={displayProducts} 
          totalCount={displayProducts.length} 
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onSortChange={(sort) => setSortBy(sort)}
        />
      </div>
    </div>
  );
};

export default Homepage;
