'use client';

import { useState } from 'react';

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

// Mock data for dropdowns
const PROVINCES = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
];

const WARDS_BY_PROVINCE: Record<string, string[]> = {
  'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Cầu Giấy', 'Đống Đa'],
  'TP. Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5'],
  'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn'],
  'Hải Phòng': ['Hồng Bàng', 'Ngô Quyền', 'Lê Chân', 'Kiến An'],
  'Cần Thơ': ['Ninh Kiều', 'Bình Thủy', 'Cờ Đỏ', 'Phong Điền'],
};

const CAMPUSES = [
  'ĐH Công Nghệ',
  'ĐH Kinh Tế',
  'ĐH Ngoại Ngữ',
  'ĐH Khoa Học Tự Nhiên',
  'ĐH Sư Phạm',
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    return email.endsWith('.edu.vn');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof BillingFormData
  ) => {
    const value = e.target.value;
    const newFormData = { ...formData, [field]: value };

    // Clear province/ward if province changes
    if (field === 'province') {
      newFormData.ward = '';
    }

    setFormData(newFormData);
    onFormChange(newFormData);

    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email sinh viên';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email phải có đuôi .edu.vn';
    }
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.province) newErrors.province = 'Vui lòng chọn tỉnh/thành phố';
    if (!formData.ward) newErrors.ward = 'Vui lòng chọn phường';
    if (!formData.campus) newErrors.campus = 'Vui lòng chọn trường đại học';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const availableWards = formData.province ? WARDS_BY_PROVINCE[formData.province] || [] : [];

  return (
    <div className="bg-white rounded-lg border border-[#C9CFD2] p-6">
      <h2 className="text-lg font-bold text-[#191C1F] mb-6">Thông tin thanh toán</h2>

      {/* Row 1: Full Name & Phone */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            value={formData.fullName}
            onChange={(e) => handleChange(e, 'fullName')}
            className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] ${
              errors.fullName ? 'border-red-500' : 'border-[#C9CFD2]'
            }`}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')}
            className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] ${
              errors.phone ? 'border-red-500' : 'border-[#C9CFD2]'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#191C1F] mb-2">
          Email sinh viên <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="example@school.edu.vn"
          value={formData.email}
          onChange={(e) => handleChange(e, 'email')}
          className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] ${
            errors.email ? 'border-red-500' : 'border-[#C9CFD2]'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Row 3: Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#191C1F] mb-2">
          Địa chỉ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Số nhà, tên đường"
          value={formData.address}
          onChange={(e) => handleChange(e, 'address')}
          className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] ${
            errors.address ? 'border-red-500' : 'border-[#C9CFD2]'
          }`}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      {/* Row 4: Province & Ward */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Tỉnh/Thành phố <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.province}
            onChange={(e) => handleChange(e, 'province')}
            className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] focus:outline-none focus:border-[#1E40AF] ${
              errors.province ? 'border-red-500' : 'border-[#C9CFD2]'
            }`}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {PROVINCES.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Phường <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.ward}
            onChange={(e) => handleChange(e, 'ward')}
            disabled={!formData.province}
            className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] focus:outline-none focus:border-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.ward ? 'border-red-500' : 'border-[#C9CFD2]'
            }`}
          >
            <option value="">Chọn phường</option>
            {availableWards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
          {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward}</p>}
        </div>
      </div>

      {/* Row 5: Delivery Method & Campus */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Lựa chọn giao hàng
          </label>
          <select
            value={formData.deliveryMethod}
            onChange={(e) => handleChange(e, 'deliveryMethod' as keyof BillingFormData)}
            className="w-full px-4 py-2 border border-[#C9CFD2] rounded-lg text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
          >
            <option value="shipping">Vận chuyển</option>
            <option value="meetup">Meetup</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Trường Đại học/Campus <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.campus}
            onChange={(e) => handleChange(e, 'campus')}
            className={`w-full px-4 py-2 border rounded-lg text-[#191C1F] focus:outline-none focus:border-[#1E40AF] ${
              errors.campus ? 'border-red-500' : 'border-[#C9CFD2]'
            }`}
          >
            <option value="">Chọn trường</option>
            {CAMPUSES.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
          {errors.campus && <p className="text-red-500 text-xs mt-1">{errors.campus}</p>}
        </div>
      </div>
    </div>
  );
}
