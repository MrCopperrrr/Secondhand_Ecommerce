import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import FilterSidebar from '../../components/shop/FilterSidebar';
import ProductSection from '../../components/shop/ProductSection';
import { productService } from '../../services/product.services';
import { Loader2 } from 'lucide-react';

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
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const searchCategory = searchParams.get('category') || 'all';
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(searchCategory);
  const [selectedStatus, setSelectedStatus] = useState('all'); 
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts();
        const data = response.data.result;
        
        // Map backend schema to frontend Product interface
        const mappedProducts: Product[] = data.map((p: any) => ({
          product_id: p._id,
          seller_id: p.seller_id,
          name: p.name,
          category: p.category,
          condition: p.condition === 1 ? 'Mới 100%' : 'Đã qua sử dụng',
          price: p.price,
          description: p.description,
          campus: p.campus || 'Chưa cập nhật',
          images: p.images || [],
          status: p.status === 1 ? 'Active' : 'SoldOut',
          is_featured: p.is_featured || false,
          views: p.views || 0,
          created_at: p.created_at
        }));
        
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cập nhật selectedCategory khi URL param thay đổi
  useEffect(() => {
    if (searchCategory) {
      setSelectedCategory(searchCategory);
    }
  }, [searchCategory]);

  // Scroll lên đầu khi đổi page hoặc tìm kiếm
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchQuery, searchCategory]);

  // Reset page về 1 khi từ khóa tìm kiếm hoặc danh mục thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchCategory]);

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
    let result = [...products];

    // 1. Search Query Filter (Nên để đầu tiên cho hiệu năng)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // 2. Category
    if (selectedCategory !== 'all' && selectedCategory !== 'Tất cả') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Status
    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status === selectedStatus);
    }

    // 4. Location
    if (selectedLocation !== 'all' && selectedLocation !== '') {
      result = result.filter(p => p.campus === selectedLocation);
    }

    // 5. Price
    result = result.filter(p =>
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // 6. Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.views - a.views;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedLocation,
    priceRange,
    sortBy,
    products
  ]);

  // Unique campuses
  const uniqueCampuses = useMemo(() => {
    const locations = new Set<string>();
    products.forEach(p => {
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

  if (searchQuery) {
    breadcrumbItems.push({ label: `Kết quả tìm kiếm cho "${searchQuery}"` });
  } else if (selectedCategory !== 'all') {
    breadcrumbItems.push({
      label: categoriesMap[selectedCategory] || selectedCategory
    });
  }

  return (
    <div className="flex flex-col bg-white font-roboto">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full bg-white">
        
        {loading ? (
           <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-[#1E40AF] animate-spin" />
              <p className="text-[#686868] italic font-medium">Đang tải danh sách sản phẩm...</p>
           </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;