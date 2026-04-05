import { ChevronRight, Loader2, Trash2, Copy, CheckCircle, Edit } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { productService } from '../../services/product.services';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  category: string;
  condition: string;
  campus: string;
  price: string;
  description: string;
  image: string;
  status: number;
  originalData: any; // Keep raw data for copying/editing
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductsBySeller();
      const data = response.data.result;
      
      const mappedProducts: Product[] = data.map((p: any) => ({
        id: p._id,
        title: p.name,
        category: p.category?.name || 'Chưa cập nhật',
        condition: `${p.condition}%`,
        campus: p.campus || 'Chưa cập nhật',
        price: `${p.price.toLocaleString()} VND`,
        description: p.description,
        image: p.images && p.images.length > 0 ? p.images[0] : 'https://placehold.co/200x200?text=No+Image',
        status: p.status,
        originalData: p
      }));
      
      setProducts(mappedProducts);
    } catch (err: any) {
      console.error("Lỗi khi tải danh sách sản phẩm:", err);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await productService.deleteProduct(id);
        alert("Xóa thành công!");
        fetchProducts();
      } catch (err) {
        alert("Lỗi khi xóa sản phẩm");
      }
    }
  };

  const handleCopy = async (product: Product) => {
    try {
      const data = product.originalData;
      const payload = {
        ...data,
        name: `(COPY) ${data.name}`,
        _id: undefined, // Let backend generate new ID
        created_at: undefined,
        updated_at: undefined
      };
      delete payload._id;
      await productService.createProduct(payload);
      alert("Sao chép thành công!");
      fetchProducts();
    } catch (err) {
      alert("Lỗi khi sao chép sản phẩm");
    }
  };

  const handleMarkAsSold = async (id: string) => {
    try {
      // 0 = SoldOut as per USER request
      await productService.updateProductStatus([id], 0);
      alert("Đã cập nhật trạng thái đã bán!");
      fetchProducts();
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái");
    }
  };

  const handleEdit = (product: Product) => {
    navigate('/sell', { state: { editProduct: product.originalData } });
  };

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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-[#191C1F]">Quản lý sản phẩm</h1>
              <button 
                onClick={() => navigate('/sell')}
                className="bg-[#1E40AF] text-white px-6 py-2.5 font-bold text-sm hover:bg-blue-800 transition-all flex items-center gap-2"
              >
                + ĐĂNG SẢN PHẨM MỚI
              </button>
            </div>

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
                  onClick={() => navigate('/sell')}
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
                  className={`w-full border border-[#E4E7E9] p-6 flex flex-col md:flex-row gap-6 relative group bg-white hover:border-[#1E40AF] transition-colors ${product.status === 0 ? 'opacity-75 grayscale-[0.5]' : ''}`}
                >
                  {/* Left: Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-50 flex items-center justify-center border border-[#E4E7E9] relative">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                    {product.status === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-xs uppercase tracking-widest">ĐÃ BÁN</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Info and Actions */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-[18px] font-bold text-[#191C1F]">
                         {product.title}
                         {product.status === 0 && <span className="ml-2 text-xs text-red-600 font-bold uppercase">(Hết hàng)</span>}
                       </h3>
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
                        <p className="text-[#475156] mt-1 line-clamp-2">{product.description}</p>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap justify-end gap-3 mt-6">
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="px-6 py-2 border-2 border-red-100 text-red-600 font-bold text-[11px] hover:bg-red-50 transition-all uppercase tracking-wide flex items-center gap-2"
                      >
                        <Trash2 size={14} /> XÓA
                      </button>
                      <button 
                        onClick={() => handleCopy(product)}
                        className="px-6 py-2 border-2 border-gray-100 text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-all uppercase tracking-wide text-nowrap flex items-center gap-2"
                      >
                        <Copy size={14} /> SAO CHÉP
                      </button>
                      {product.status === 1 && (
                        <button 
                          onClick={() => handleMarkAsSold(product.id)}
                          className="px-6 py-2 border-2 border-green-500 text-green-600 font-bold text-[11px] hover:bg-green-50 transition-all uppercase tracking-wide text-nowrap flex items-center gap-2"
                        >
                          <CheckCircle size={14} /> ĐÃ BÁN
                        </button>
                      )}
                      <button 
                        onClick={() => handleEdit(product)}
                        className="px-6 py-2 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-[11px] hover:bg-blue-800 transition-all flex items-center gap-2 uppercase tracking-wide text-nowrap"
                      >
                        <Edit size={14} /> CHỈNH SỬA <ChevronRight size={14} />
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
