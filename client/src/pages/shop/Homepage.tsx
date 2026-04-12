import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import FilterSidebar from '../../components/shop/FilterSidebar';
import ProductSection from '../../components/shop/ProductSection';
import { productService } from '../../services/product.services';
import { categoryServices } from '../../services/category.services';
import { commonServices } from '../../services/common.services';
import { Loader2 } from 'lucide-react';

// Define product type matching new schema
interface Product {
  product_id: string;
  seller_id: string;
  name: string;
  category_id: string;
  sub_category_id?: string;
  condition: string;
  price: number;
  description: string;
  campus: string;
  province: string;
  ward: string;
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
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [namesMap, setNamesMap] = useState<Record<string, string>>({});
  const [locationOptions, setLocationOptions] = useState<{
    provinces: any[];
    wards: any[];
    campuses: any[];
    masterData: any[];
  }>({ provinces: [], wards: [], campuses: [], masterData: [] });

  // Fetch Category Names & Filter Options
  useEffect(() => {
    const loadCommonData = async () => {
      try {
        const [cats, subs, locations] = await Promise.all([
          categoryServices.getCategories(),
          categoryServices.getSubCategories(),
          commonServices.getFilterOptions()
        ]);
        
        const map: Record<string, string> = { 'all': 'Tất cả' };
        cats.forEach((c: any) => map[c._id] = c.name);
        subs.forEach((s: any) => map[s._id] = s.name);
        setNamesMap(map);
        
        if (locations.data.result) {
          setLocationOptions(locations.data.result);
        }
      } catch (e) {
        console.error("Error loading common data:", e);
      }
    };
    loadCommonData();
  }, []);

  // Compute filtered location options
  const displayLocationOptions = useMemo(() => {
    if (selectedProvince === 'all') {
      return locationOptions;
    }

    const provinceData = locationOptions.masterData.find(p => p.id === selectedProvince);
    if (!provinceData) return locationOptions;

    return {
      ...locationOptions,
      // Filtering campuses by province
      campuses: locationOptions.campuses.filter(c => 
        provinceData.campuses.includes(c.id)
      ),
      // Filtering wards by province
      wards: locationOptions.wards.filter(w => 
        provinceData.wards.includes(w.id)
      ),
    };
  }, [selectedProvince, locationOptions]);

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
          category_id: p.category_id,
          sub_category_id: p.sub_category_id,
          condition: p.condition < 100 ? 'Đã qua sử dụng' : 'Mới 100%',
          price: p.price,
          description: p.description,
          campus: p.address?.campus || p.campus || 'Chưa cập nhật',
          province: p.address?.city || p.province || 'Chưa cập nhật',
          ward: p.address?.address_line_2 || 'Chưa cập nhật',
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

  const searchSubCategory = searchParams.get('subcategory') || '';

  // 1. Search Query Filter (Nên để đầu tiên cho hiệu năng)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // 2. Category & Subcategory Logic
    if (searchSubCategory) {
      result = result.filter(p => p.sub_category_id === searchSubCategory);
    } else if (selectedCategory !== 'all' && selectedCategory !== 'Tất cả') {
      result = result.filter(p => p.category_id === selectedCategory);
    }

    // 3. Status
    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status === selectedStatus);
    }

    // 4. Location (Province, Ward, Campus)
    if (selectedProvince !== 'all') {
      result = result.filter(p => p.province === selectedProvince);
    }
    if (selectedWard !== 'all') {
      result = result.filter(p => p.ward === selectedWard);
    }
    if (selectedCampus !== 'all') {
      result = result.filter(p => p.campus === selectedCampus);
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
    searchSubCategory,
    selectedStatus,
    selectedProvince,
    selectedWard,
    selectedCampus,
    priceRange,
    sortBy,
    products
  ]);

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
    // If it's a subcategory from URL
    const subCatId = searchParams.get('subcategory');
    if (subCatId && namesMap[subCatId]) {
      // Find parent category name
      // This is a bit complex since we don't have sub-cat structure here, 
      // but we can just show: Home > Parent Name > Sub Name
      // Since selectedCategory is usually the parent ID in our URL structure
      if (selectedCategory && namesMap[selectedCategory]) {
         breadcrumbItems.push({ 
           label: namesMap[selectedCategory],
           href: `/?category=${selectedCategory}` 
         });
      }
      breadcrumbItems.push({ label: namesMap[subCatId] });
    } else {
      breadcrumbItems.push({
        label: namesMap[selectedCategory] || selectedCategory
      });
    }
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
          locationData={displayLocationOptions}
          selectedLocation={{
            province: selectedProvince,
            ward: selectedWard,
            campus: selectedCampus
          }}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          onStatusChange={(status) => {   
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          onProvinceChange={(prov) => {
            setSelectedProvince(prov);
            setSelectedWard('all');
            setSelectedCampus('all');
            setCurrentPage(1);
          }}
          onWardChange={(ward) => {
            setSelectedWard(ward);
            setCurrentPage(1);
          }}
          onCampusChange={(camp) => {
            setSelectedCampus(camp);
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