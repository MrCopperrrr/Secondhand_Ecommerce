import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

// Mock data for provinces, districts, and universities
const PROVINCES = [
  'TPHCM',
  'Hà Nội',
  'Đà Nẵng',
  'Cần Thơ',
  'Hải Phòng',
];

const DISTRICTS_MAP: Record<string, string[]> = {
  'TPHCM': [
    'Phường Diên Hồng',
    'Phường Bến Nghé',
    'Phường Đa Kao',
    'Phường Tân Định',
  ],
  'Hà Nội': [
    'Phường Hoàn Kiếm',
    'Phường Bát Tràng',
    'Phường Láng Hạ',
    'Phường Đống Đa',
  ],
  'Đà Nẵng': [
    'Phường Hòa Cường',
    'Phường Tây Thạnh',
    'Phường Mỹ Khê',
    'Phường Hải Châu',
  ],
  'Cần Thơ': [
    'Phường Cái Khế',
    'Phường Tân An',
    'Phường Xuân Khánh',
    'Phường Hưng Lợi',
  ],
  'Hải Phòng': [
    'Phường Minh Khai',
    'Phường Quán Toan',
    'Phường Hòn Gai',
    'Phường Đông Hải',
  ],
};

const UNIVERSITIES = [
  'Trường Đại học Bách khoa TPHCM',
  'Trường Đại học Kinh tế TPHCM',
  'Trường Đại học Ngoại ngữ TPHCM',
  'Trường Đại học Sư phạm TPHCM',
  'Trường Đại học Quốc gia Hà Nội',
  'Trường Đại học Xây dựng Hà Nội',
];

export const AddressManagement: React.FC = () => {
  const [defaultAddress, setDefaultAddress] = useState('258 Lý Thường Kiệt');
  const [province, setProvince] = useState('TPHCM');
  const [district, setDistrict] = useState('Phường Diên Hồng');
  const [university, setUniversity] = useState('Trường Đại học Bách khoa TPHCM');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const availableDistricts = DISTRICTS_MAP[province] || [];

  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    // Reset district when province changes
    setDistrict(DISTRICTS_MAP[newProvince]?.[0] || '');
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
              {PROVINCES.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
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
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onFocus={() => setFocusedField('district')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border rounded-lg appearance-none transition-colors ${
                focusedField === 'district'
                  ? 'border-[#1E40AF] bg-white ring-1 ring-[#1E40AF]'
                  : 'border-[#C9CFD2] bg-white'
              } text-[#191C1F] focus:outline-none pr-10`}
            >
              {availableDistricts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#686868] pointer-events-none"
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
              {UNIVERSITIES.map((uni) => (
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
      <button className="w-full py-3 border-2 border-[#1E40AF] rounded-lg text-[#1E40AF] font-bold tracking-wide hover:bg-blue-50 transition-colors shadow-sm text-sm">
        <Plus size={20} className="inline mr-2" />
        Thêm địa chỉ
      </button>
    </section>
  );
};
