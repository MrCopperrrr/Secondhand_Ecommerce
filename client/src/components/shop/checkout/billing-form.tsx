import React, { useState } from 'react';

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

    // Clear ward if province changes
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

  const availableWards = formData.province ? WARDS_BY_PROVINCE[formData.province] || [] : [];

  return (
    <div className="bg-white rounded-none border border-[#C9CFD2] p-8 font-roboto shadow-sm">
      <h2 className="text-xl font-bold text-[#191C1F] mb-8 pb-4 border-b-2 border-[#1E40AF] inline-block uppercase">
        Thông tin nhận hàng
      </h2>

      {/* Row 1: Full Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
            Họ và tên <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => handleChange(e, 'fullName')}
            className={`w-full px-4 py-3 border-2 rounded-none text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 ${
              errors.fullName ? 'border-red-600' : 'border-gray-200'
            }`}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
            Số điện thoại <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            placeholder="0123xxxxxx"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')}
            className={`w-full px-4 py-3 border-2 rounded-none text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 ${
              errors.phone ? 'border-red-600' : 'border-gray-200'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: Email */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
          Email sinh viên <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          placeholder="example@vnu.edu.vn"
          value={formData.email}
          onChange={(e) => handleChange(e, 'email')}
          className={`w-full px-4 py-3 border-2 rounded-none text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 ${
            errors.email ? 'border-red-600' : 'border-gray-200'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
      </div>

      {/* Row 3: Address */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
          Địa chỉ chi tiết <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Số nhà, tên đường, khu vực"
          value={formData.address}
          onChange={(e) => handleChange(e, 'address')}
          className={`w-full px-4 py-3 border-2 rounded-none text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 ${
            errors.address ? 'border-red-600' : 'border-gray-200'
          }`}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>}
      </div>

      {/* Row 4: Province & Ward */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
            Tỉnh/Thành phố <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.province}
            onChange={(e) => handleChange(e, 'province')}
            className={`w-full h-[52px] px-4 py-2 border-2 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 focus:bg-white cursor-pointer ${
              errors.province ? 'border-red-600' : 'border-gray-200'
            }`}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {PROVINCES.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          {errors.province && <p className="text-red-500 text-xs mt-1 font-medium">{errors.province}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
            Phường/Quận <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.ward}
            onChange={(e) => handleChange(e, 'ward')}
            disabled={!formData.province}
            className={`w-full h-[52px] px-4 py-2 border-2 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
              errors.ward ? 'border-red-600' : 'border-gray-200'
            }`}
          >
            <option value="">Chọn phường/quận</option>
            {availableWards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
          {errors.ward && <p className="text-red-500 text-xs mt-1 font-medium">{errors.ward}</p>}
        </div>
      </div>

      {/* Row 5: Delivery Method & Campus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
            Lựa chọn giao hàng
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onFormChange({ ...formData, deliveryMethod: 'shipping' })}
              className={`flex-1 py-3 px-4 border-2 font-bold transition-all ${
                formData.deliveryMethod === 'shipping'
                  ? 'bg-blue-50 border-[#1E40AF] text-[#1E40AF]'
                  : 'bg-white border-gray-100 text-[#686868] hover:border-[#1E40AF]'
              }`}
            >
              VẬN CHUYỂN
            </button>
            <button
              onClick={() => onFormChange({ ...formData, deliveryMethod: 'meetup' })}
              className={`flex-1 py-3 px-4 border-2 font-bold transition-all ${
                formData.deliveryMethod === 'meetup'
                  ? 'bg-blue-50 border-[#1E40AF] text-[#1E40AF]'
                  : 'bg-white border-gray-100 text-[#686868] hover:border-[#1E40AF]'
              }`}
            >
              MEETUP
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#191C1F] mb-3 uppercase tracking-wider">
            Trường Đại học/Campus <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.campus}
            onChange={(e) => handleChange(e, 'campus')}
            className={`w-full h-[52px] px-4 py-2 border-2 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-gray-50 focus:bg-white cursor-pointer ${
              errors.campus ? 'border-red-600' : 'border-gray-200'
            }`}
          >
            <option value="">Chọn trường</option>
            {CAMPUSES.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
          {errors.campus && <p className="text-red-500 text-xs mt-1 font-medium">{errors.campus}</p>}
        </div>
      </div>
    </div>
  );
}
