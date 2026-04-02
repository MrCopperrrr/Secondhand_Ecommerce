import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';

const AddressPayment: React.FC = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      street: '258 Lý Thường Kiệt',
      province: 'TPHCM',
      ward: 'Phường Diên Hồng',
      campus: 'Trường Đại học Bách Khoa TPHCM',
      isDefault: true
    }
  ]);

  const addAddress = () => {
    if (addresses.length < 2) {
      setAddresses([...addresses, {
        id: Date.now(),
        street: '',
        province: 'TPHCM',
        ward: 'Phường Diên Hồng',
        campus: 'Trường Đại học Bách Khoa TPHCM',
        isDefault: false
      }]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Địa chỉ & Thanh toán' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="address" />

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* ĐỊA CHỈ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-8">Địa chỉ</h2>
              
              <div className="space-y-10">
                {addresses.map((addr, index) => (
                  <div key={addr.id} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#191C1F] mb-2">
                        {index === 0 ? 'Địa chỉ (mặc định)' : 'Địa chỉ 2'}
                      </label>
                      <input
                        type="text"
                        defaultValue={addr.street}
                        className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#191C1F] mb-2">Tỉnh/ Thành phố</label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                            <option>{addr.province}</option>
                          </select>
                          <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#191C1F] mb-2">Phường</label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                            <option>{addr.ward}</option>
                          </select>
                          <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#191C1F] mb-2">Trường đại học/Campus</label>
                        <div className="relative">
                          <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                            <option>{addr.campus}</option>
                          </select>
                          <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {addresses.length < 2 && (
                <button 
                  onClick={addAddress}
                  className="w-full mt-10 py-3.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-sm bg-white hover:bg-gray-50 transition-all uppercase tracking-widest"
                >
                  THÊM ĐỊA CHỈ
                </button>
              )}
            </section>

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-8">Phương thức thanh toán</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Thẻ ghi nợ/ Thẻ tín dụng</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                        <option>Vietcombank Visa Platinum **** **** **** 1234 (5/2030)</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                    </div>
                  </div>
                  <button className="px-8 py-3.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[13px] bg-white hover:bg-gray-50 transition-all uppercase whitespace-nowrap min-w-[180px]">
                    THÊM THẺ
                  </button>
                </div>

                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Ngân hàng liên kết</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                        <option>Vietcombank *******234</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                    </div>
                  </div>
                  <button className="px-8 py-3.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[13px] bg-white hover:bg-gray-50 transition-all uppercase whitespace-nowrap min-w-[180px]">
                    THÊM TÀI KHOẢN
                  </button>
                </div>

                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Ví điện tử</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                        <option>Ví MoMo 0******123</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                    </div>
                  </div>
                  <button className="px-8 py-3.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[13px] bg-white hover:bg-gray-50 transition-all uppercase whitespace-nowrap min-w-[180px]">
                    THÊM VÍ
                  </button>
                </div>
              </div>
            </section>

            {/* PHƯƠNG THỨC NHẬN TIỀN */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-8">Phương thức nhận tiền</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Ngân hàng liên kết</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                        <option>Vietcombank 1******234</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                    </div>
                  </div>
                  <button className="px-8 py-3.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[13px] bg-white hover:bg-gray-50 transition-all uppercase whitespace-nowrap min-w-[180px]">
                    THÊM TÀI KHOẢN
                  </button>
                </div>

                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Ví điện tử</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none">
                        <option>Ví MoMo 0******123</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] pointer-events-none" />
                    </div>
                  </div>
                  <button className="px-8 py-3.5 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-[13px] bg-white hover:bg-gray-50 transition-all uppercase whitespace-nowrap min-w-[180px]">
                    THÊM VÍ
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddressPayment;
