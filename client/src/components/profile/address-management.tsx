import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

interface AddressItem {
  _id: string;
  city: string;
  address_line_2: string; // ward
  campus: string;
  address_line_1: string; // street
}

interface AddressManagementProps {
  provinces?: any[]; // Full province master list with campus_data
  initialAddresses?: AddressItem[];
  onAddAddress?: (newAddress: any) => void;
  onDeleteAddress?: (id: string) => void;
}

export const AddressManagement: React.FC<AddressManagementProps> = ({ 
  provinces = [], 
  initialAddresses = [],
  onAddAddress,
  onDeleteAddress
}) => {
  const [defaultAddress, setDefaultAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [university, setUniversity] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Derive available campuses for selected province
  const selectedProvData = provinces.find(p => p.name === province);
  const availableCampuses = selectedProvData?.campus || [];
  
  // Wards are still a bit tricky without a full mapping, 
  // so we'll allow free input or use currently known wards for this province from initialAddresses
  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    setUniversity('');
    setDistrict('');
  };

  return (
    <section className="bg-white rounded-lg border border-[#C9CFD2] p-8 mb-6 shadow-sm">
      {/* Section Heading */}
      <h2 className="text-xl font-bold text-[#191C1F] mb-8">Địa chỉ</h2>

      {/* Default Address Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-[#191C1F] mb-2">
          Địa chỉ (mặc định)
        </label>
        <input
          type="text"
          value={defaultAddress}
          onChange={(e) => setDefaultAddress(e.target.value)}
          onFocus={() => setFocusedField('address')}
          onBlur={() => setFocusedField(null)}
          placeholder="Vui lòng nhập địa chỉ mặc định"
          className={`w-full px-4 py-3 border rounded-lg transition-colors ${
            focusedField === 'address'
              ? 'border-[#1E40AF] bg-white ring-1 ring-[#1E40AF]'
              : 'border-[#C9CFD2] bg-white'
          } text-[#191C1F] placeholder-[#77878F] focus:outline-none`}
        />
      </div>

      {/* Hierarchical Select Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Province/City */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Tỉnh/Thành phố
          </label>
          <div className="relative">
            <select
              value={province}
              onChange={(e) => handleProvinceChange(e.target.value)}
              onFocus={() => setFocusedField('province')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border rounded-lg appearance-none transition-colors ${
                focusedField === 'province'
                  ? 'border-[#1E40AF] bg-white ring-1 ring-[#1E40AF]'
                  : 'border-[#C9CFD2] bg-white'
              } text-[#191C1F] focus:outline-none pr-10`}
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map((prov) => (
                <option key={prov._id} value={prov.name}>
                  {prov.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#686868] pointer-events-none"
            />
          </div>
        </div>

        {/* District/Ward */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Phường/Xã
          </label>
          <div className="relative">
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onFocus={() => setFocusedField('district')}
              onBlur={() => setFocusedField(null)}
              placeholder="Nhập phường/xã"
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                focusedField === 'district'
                  ? 'border-[#1E40AF] bg-white ring-1 ring-[#1E40AF]'
                  : 'border-[#C9CFD2] bg-white'
              } text-[#191C1F] focus:outline-none`}
            />
          </div>
        </div>

        {/* University/Campus */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Trường đại học/Campus
          </label>
          <div className="relative">
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              onFocus={() => setFocusedField('university')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border rounded-lg appearance-none transition-colors ${
                focusedField === 'university'
                  ? 'border-[#1E40AF] bg-white ring-1 ring-[#1E40AF]'
                  : 'border-[#C9CFD2] bg-white'
              } text-[#191C1F] focus:outline-none pr-10`}
            >
              <option value="">Chọn Campus</option>
              {availableCampuses.map((uni: string) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#686868] pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Add Address Button */}
      <button 
        onClick={() => onAddAddress?.({ province, district, university, defaultAddress })}
        className="w-full py-3 border-2 border-[#1E40AF] rounded-lg text-[#1E40AF] font-bold tracking-wide hover:bg-blue-50 transition-colors shadow-sm text-sm mb-8"
      >
        <Plus size={20} className="inline mr-2" />
        Thêm địa chỉ mới
      </button>

      {/* List Existing Addresses */}
      {initialAddresses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#191C1F] uppercase tracking-wider">Địa chỉ đã lưu</h3>
          {initialAddresses.map((addr) => (
            <div key={addr._id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex justify-between items-center group">
              <div>
                <p className="font-semibold text-[#191C1F]">{addr.address_line_1}</p>
                <p className="text-xs text-[#686868]">{addr.address_line_2}, {addr.city}</p>
                <p className="text-xs text-[#1E40AF] font-medium mt-1">{addr.campus}</p>
              </div>
              <button 
                onClick={() => onDeleteAddress?.(addr._id)}
                className="text-red-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
