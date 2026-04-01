import React, { useState } from 'react';

export const BasicInfoForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    email: 'nguyenvana@student.edu.vn',
    address: 'Phường 1, Quận 1, TP.HCM',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
  };

  return (
    <div className="bg-white rounded-lg border border-[#C9CFD2] p-6 mb-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#191C1F] mb-6">Thông tin cơ bản</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Họ và tên */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Họ và tên
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#C9CFD2] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] transition-colors"
            placeholder="Nhập họ và tên"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#C9CFD2] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] transition-colors"
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Email sinh viên */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Email sinh viên
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 border border-[#C9CFD2] rounded-lg bg-[#F2F4F5] text-[#686868] cursor-not-allowed"
          />
          <p className="text-xs text-[#686868] mt-1">Email sinh viên không thể thay đổi</p>
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="block text-sm font-medium text-[#191C1F] mb-2">
            Địa chỉ
          </label>
          <select
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#C9CFD2] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] transition-colors bg-white"
          >
            <option value="Phường 1, Quận 1, TP.HCM">Phường 1, Quận 1, TP.HCM</option>
            <option value="Phường 2, Quận 2, TP.HCM">Phường 2, Quận 2, TP.HCM</option>
            <option value="Phường 3, Quận 3, TP.HCM">Phường 3, Quận 3, TP.HCM</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-2 bg-[#1E40AF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        Cập nhật thông tin
      </button>
    </div>
  );
};
