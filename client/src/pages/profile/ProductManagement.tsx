import { ChevronRight, Loader2 } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { productService } from '../../services/product.services';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  category: string;
  condition: string;
  campus: string;
  price: string;
  description: string;
  image: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapCondition = (condition: number) => {
    switch (condition) {
      case 1: return "Mới 100%";
      case 2: return "Như mới (99%)";
      case 3: return "Đã qua sử dụng";
      default: return `Cấp độ ${condition}`;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductsBySeller();
        const data = response.data.result;
        
        const mappedProducts: Product[] = data.map((p: any) => ({
          id: p._id,
          title: p.name,
          category: p.category,
          condition: mapCondition(p.condition),
          campus: p.campus || 'Chưa cập nhật',
          price: `${p.price.toLocaleString()} VND`,
          description: p.description,
          image: p.images && p.images.length > 0 ? p.images[0] : 'https://placehold.co/200x200?text=No+Image',
        }));
        
        setProducts(mappedProducts);
      } catch (err: any) {
        console.error("Lỗi khi tải danh sách sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Quản lý sản phẩm' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="products" />

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            <h1 className="text-2xl font-bold text-[#191C1F] mb-8">Quản lý sản phẩm</h1>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-[#1E40AF] animate-spin" />
                <p className="text-[#686868] italic font-medium">Đang tải danh sách sản phẩm...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-none text-center">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-[#E4E7E9] bg-gray-50">
                <p className="text-[#686868] mb-4">Bạn chưa đăng sản phẩm nào.</p>
                <button 
                  onClick={() => window.location.href = '/sell'}
                  className="px-8 py-3 bg-[#1E40AF] text-white font-bold hover:bg-blue-800 transition-all"
                >
                  ĐĂNG SẢN PHẨM NGAY
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {products.map((product) => (
                <div 
                  key={product.id}
                  className="w-full border border-[#E4E7E9] p-6 flex flex-col md:flex-row gap-6 relative group bg-white hover:border-[#1E40AF] transition-colors"
                >
                  {/* Left: Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-50 flex items-center justify-center border border-[#E4E7E9]">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: Info and Actions */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-[18px] font-bold text-[#191C1F]">{product.title}</h3>
                       <div className="flex items-center">
                          <span className="text-[#1E40AF] font-bold text-[16px]">{product.price}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-3 text-[14px]">
                      <div className="flex flex-wrap gap-x-8">
                        <div>
                          <span className="text-[#686868] font-bold">Danh mục:</span>
                          <span className="text-[#191C1F] ml-1">{product.category}</span>
                        </div>
                        <div>
                          <span className="text-[#686868] font-bold">Tình trạng:</span>
                          <span className="text-[#191C1F] ml-1">{product.condition}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[#686868] font-bold">Trường/Campus:</span>
                          <span className="text-[#191C1F] ml-1">{product.campus}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[#686868] font-bold">Mô tả:</span>
                        <span className="text-[#475156] ml-1">{product.description}</span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap justify-end gap-3 mt-6">
                      <button className="px-8 py-2.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[12px] hover:bg-gray-50 transition-all uppercase tracking-wide">
                        XÓA
                      </button>
                      <button className="px-8 py-2.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[12px] hover:bg-gray-50 transition-all uppercase tracking-wide text-nowrap">
                        SAO CHÉP
                      </button>
                      <button className="px-8 py-2.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[12px] hover:bg-gray-50 transition-all uppercase tracking-wide text-nowrap">
                        ĐÃ BÁN
                      </button>
                      <button className="px-8 py-2.5 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-[12px] hover:bg-blue-800 transition-all flex items-center gap-2 uppercase tracking-wide text-nowrap">
                        CHỈNH SỬA <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;
