import React, { useState } from 'react';
import PROVINCES_DATA_RAW from '../../../data/provinces.json';

interface ProvinceData {
  id: number;
  name: string;
  wards: string[];
}

const PROVINCES_DATA = PROVINCES_DATA_RAW as ProvinceData[];

interface BillingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  ward: string;
  deliveryMethod: 'shipping' | 'meetup';
  campus: string;
}

interface BillingFormProps {
  onFormChange: (data: BillingFormData) => void;
}

const PROVINCES = PROVINCES_DATA.map((p: ProvinceData) => p.name);

const WARDS_BY_PROVINCE: Record<string, string[]> = PROVINCES_DATA.reduce((acc: Record<string, string[]>, curr: ProvinceData) => {
  acc[curr.name] = curr.wards;
  return acc;
}, {} as Record<string, string[]>);

const CAMPUSES = [
  'Trường ĐH Bách khoa TPHCM',
  'Trường ĐH Công nghệ thông tin',
  'Trường ĐH Khoa học Tự nhiên',
  'Trường ĐH Kinh tế - Luật',
  'Trường ĐH Quốc tế',
];

export function BillingForm({ onFormChange }: BillingFormProps) {
  const [formData, setFormData] = useState<BillingFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    ward: '',
    deliveryMethod: 'shipping',
    campus: '',
  });

  const [errors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof BillingFormData
  ) => {
    const value = e.target.value;
    const newFormData = { ...formData, [field]: value };

    // Clear ward if province changes
    if (field === 'province') {
      newFormData.ward = '';
    }

    setFormData(newFormData);
    onFormChange(newFormData);
  };

  const availableWards = formData.province ? WARDS_BY_PROVINCE[formData.province] || [] : [];

  return (
    <div className="bg-white font-roboto">
      <h2 className="text-2xl font-bold text-[#191C1F] mb-6">
        Thông tin thanh toán
      </h2>

      {/* Row 1: Full Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">
            Họ và tên
          </label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => handleChange(e, 'fullName')}
            className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] placeholder-[#C9CFD2] focus:outline-none focus:border-[#1E40AF] transition-all bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            placeholder="0123456789"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')}
            className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] placeholder-[#C9CFD2] focus:outline-none focus:border-[#1E40AF] transition-all bg-white"
          />
        </div>
      </div>

      {/* Row 2: Email */}
      <div className="mb-6">
        <label className="block text-sm font-normal text-[#191C1F] mb-2">
          Email sinh viên
        </label>
        <input
          type="email"
          placeholder="example@example.edu.vn"
          value={formData.email}
          onChange={(e) => handleChange(e, 'email')}
          className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] placeholder-[#C9CFD2] focus:outline-none focus:border-[#1E40AF] transition-all bg-white"
        />
      </div>

      {/* Row 3: Address */}
      <div className="mb-6">
        <label className="block text-sm font-normal text-[#191C1F] mb-2">
          Địa chỉ
        </label>
        <input
          type="text"
          placeholder="258 Lý Thường Kiệt"
          value={formData.address}
          onChange={(e) => handleChange(e, 'address')}
          className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] placeholder-[#C9CFD2] focus:outline-none focus:border-[#1E40AF] transition-all bg-white"
        />
      </div>

      {/* Row 4: Province & Ward */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">
            Tỉnh/Thành phố
          </label>
          <div className="relative">
            <select
              value={formData.province}
              onChange={(e) => handleChange(e, 'province')}
              className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-white cursor-pointer"
            >
              <option value="">Thành phố Hồ Chí Minh</option>
              {PROVINCES.map((prov: string) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">
            Phường
          </label>
          <div className="relative">
            <select
              value={formData.ward}
              onChange={(e) => handleChange(e, 'ward')}
              className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-white cursor-pointer"
            >
              <option value="">Phường Diên Hồng</option>
              {availableWards.map((ward: string) => (
                <option key={ward} value={ward}>
                  {ward}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Delivery Method & Campus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">
            Lựa chọn giao hàng
          </label>
          <div className="relative">
            <select
              value={formData.deliveryMethod}
              onChange={(e) => handleChange(e, 'deliveryMethod')}
              className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-white cursor-pointer"
            >
              <option value="shipping">Vận chuyển</option>
              <option value="meetup">Meetup</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">
            Trường Đại học/Campus
          </label>
          <div className="relative">
            <select
              value={formData.campus}
              onChange={(e) => handleChange(e, 'campus')}
              className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-white cursor-pointer"
            >
              <option value="">Trường Đại học Bách khoa TPHCM</option>
              {CAMPUSES.map((campus: string) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
