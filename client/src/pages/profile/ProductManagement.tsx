import React from 'react';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';

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
  // Mock data based on the screenshot
  const products: Product[] = [
    {
      id: '1',
      title: 'Apple iPhone 17 Pro Max 2TB',
      category: 'Đồ điện tử',
      condition: 'Mới 100%',
      campus: 'Trường Đại học Bách khoa TPHCM',
      price: '60.000.000 VND',
      description: 'Sản phẩm mới 100%, còn hộp',
      image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=200&h=200&fit=crop',
    },
    {
        id: '2',
        title: 'Apple iPhone 17 Pro Max 2TB',
        category: 'Đồ điện tử',
        condition: 'Mới 100%',
        campus: 'Trường Đại học Bách khoa TPHCM',
        price: '60.000.000 VND',
        description: 'Sản phẩm mới 100%, còn hộp',
        image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=200&h=200&fit=crop',
      }
  ];

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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;
