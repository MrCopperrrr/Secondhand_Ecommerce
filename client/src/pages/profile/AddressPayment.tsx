import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { authService } from '../../services/auth.services';
import { commonServices } from '../../services/common.services';

interface SearchableDropdownProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ 
  label, name, value, options, onChange, placeholder, disabled 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#191C1F] mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder || "Tìm kiếm..."}
          value={isOpen ? searchTerm : value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm('');
          }}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] bg-white pr-10 cursor-pointer ${disabled ? 'bg-gray-50 opacity-60' : ''}`}
        />
        <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#C9CFD2] shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <div
                key={i}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#191C1F]"
                onClick={() => {
                  onChange(name, opt);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">Không tìm thấy kết quả</div>
          )}
        </div>
      )}
    </div>
  );
};

const AddressPayment: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [address, setAddress] = useState({
    tittle: 'Nhà riêng',
    address_line_1: '',
    address_line_2: '',
    city: '',
    campus: ''
  });

  const [filteredWards, setFilteredWards] = useState<string[]>([]);
  const [filteredCampuses, setFilteredCampuses] = useState<string[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        // Fetch provinces first
        const pResp = await commonServices.getProvinces();
        const pList = pResp.data.result || [];
        setProvinces(pList);

        // Fetch address
        const response = await authService.getAddresses();
        const data = response.data.result;
        if (data && data.length > 0) {
          const addr = data[0];
          setAddress({
            tittle: addr.tittle || 'Nhà riêng',
            address_line_1: addr.address_line_1 || '',
            address_line_2: addr.address_line_2 || '',
            city: addr.city || (pList.length > 0 ? pList[0].name : ''),
            campus: addr.campus || ''
          });
        } else if (pList.length > 0) {
            setAddress(prev => ({ ...prev, city: pList[0].name }));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // Update lists when city (Province) changes
  useEffect(() => {
    if (address.city && provinces.length > 0) {
      const provinceData = provinces.find(p => p.name === address.city);
      setFilteredWards(provinceData?.wards || []);
      setFilteredCampuses(provinceData?.campus || []);
    }
  }, [address.city, provinces]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await authService.saveAddress(address);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ:", error);
      alert("Không thể lưu địa chỉ. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setAddress(prev => {
        const next = { ...prev, [name]: value };
        // Reset ward and campus if province changes
        if (name === 'city') {
            const provinceData = provinces.find(p => p.name === value);
            next.address_line_2 = provinceData?.wards?.[0] || '';
            next.campus = provinceData?.campus?.[0] || '';
        }
        return next;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1E40AF] animate-spin" />
        <p className="mt-4 text-[#686868] italic">Đang tải thông tin địa chỉ...</p>
      </div>
    );
  }

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
              
              <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Tên gợi nhớ (Ví dụ: Ký túc xá, Nhà riêng)</label>
                    <input
                        type="text"
                        name="tittle"
                        value={address.tittle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Địa chỉ cụ thể (Số nhà, tên đường)</label>
                  <input
                    type="text"
                    name="address_line_1"
                    value={address.address_line_1}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SearchableDropdown
                    label="Tỉnh/Thành phố"
                    name="city"
                    value={address.city}
                    options={provinces.map(p => p.name)}
                    onChange={handleDropdownChange}
                  />
                  <SearchableDropdown
                    label="Phường/Xã"
                    name="address_line_2"
                    value={address.address_line_2}
                    options={filteredWards}
                    onChange={handleDropdownChange}
                    disabled={filteredWards.length === 0}
                    placeholder="Tìm phường/xã..."
                  />
                  <SearchableDropdown
                    label="Trường đại học/Campus"
                    name="campus"
                    value={address.campus}
                    options={filteredCampuses}
                    onChange={handleDropdownChange}
                    disabled={filteredCampuses.length === 0}
                    placeholder="Tìm trường..."
                  />
                </div>

                <div className="relative">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full mt-4 py-3.5 bg-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : null}
                    LƯU ĐỊA CHỈ
                  </button>
                  {showSuccess && (
                      <div className="absolute top-full left-0 right-0 text-center mt-2 text-green-600 font-bold text-xs animate-in fade-in slide-in-from-top-1 duration-200">
                          Lưu thành công!
                      </div>
                  )}
                </div>
              </div>
            </section>

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-8">Phương thức thanh toán</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#191C1F] mb-2">Thẻ ghi nợ/ Thẻ tín dụng</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white">
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
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white">
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
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white">
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
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white">
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
                      <select className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white">
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
