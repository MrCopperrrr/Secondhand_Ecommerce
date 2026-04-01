import React, { useState, useMemo } from 'react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import FilterSidebar from '../../components/shop/FilterSidebar';
import ProductSection from '../../components/shop/ProductSection';
import DUMMY_PRODUCTS_RAW from '../../data/products.json';

// Define product type matching new schema
interface Product {
  product_id: string;
  seller_id: string;
  name: string;
  category: string;
  condition: string;
  price: number;
  description: string;
  campus: string;
  images: string[];
  status: string;
  is_featured: boolean;
  views: number;
  created_at: string;
}

const Homepage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); 
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 });
  const [sortBy, setSortBy] = useState('newest');

  // Scroll lên đầu khi đổi page
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const categoriesMap: Record<string, string> = {
    'all': 'Tất cả',
    'Đồ điện tử': 'Đồ điện tử',
    'Sách giáo trình': 'Sách giáo trình',
    'Đồ gia dụng': 'Đồ gia dụng',
    'Dụng cụ học tập': 'Dụng cụ học tập',
    'Quần áo': 'Quần áo',
    'Đồ nội thất': 'Đồ nội thất',
    'Phương tiện di chuyển': 'Phương tiện di chuyển',
    'Dụng cụ thể thao': 'Dụng cụ thể thao'
  };

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    let result = [...DUMMY_PRODUCTS_RAW] as Product[];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Status
    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status === selectedStatus);
    }

    // Location
    if (selectedLocation !== 'all' && selectedLocation !== '') {
      result = result.filter(p => p.campus === selectedLocation);
    }

    // Price (clean, không hack)
    result = result.filter(p =>
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.views - a.views;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return result;
  }, [
    selectedCategory,
    selectedStatus,
    selectedLocation,
    priceRange,
    sortBy
  ]);

  // Unique campuses
  const uniqueCampuses = useMemo(() => {
    const locations = new Set<string>();
    DUMMY_PRODUCTS_RAW.forEach(p => {
      if (p.campus) locations.add(p.campus);
    });
    return Array.from(locations).map(label => ({ id: label, label }));
  }, []);

  const displayProducts = filteredProducts;

  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' }
  ];

  if (selectedCategory !== 'all') {
    breadcrumbItems.push({
      label: categoriesMap[selectedCategory] || selectedCategory
    });
  }

  return (
    <div className="flex flex-col bg-white">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full bg-white">
        
        {/* SIDEBAR */}
        <FilterSidebar 
          locations={uniqueCampuses}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          onStatusChange={(status) => {   
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          onLocationChange={(loc) => {
            setSelectedLocation(loc);
            setCurrentPage(1);
          }}
          onPriceChange={(min, max) => {
            setPriceRange({ min, max });
            setCurrentPage(1);
          }}
        />

        {/* PRODUCT LIST */}
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