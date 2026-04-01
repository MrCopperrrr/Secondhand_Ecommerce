'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function PasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field: string) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Mật khẩu mới không khớp');
      return;
    }
    console.log('Changing password');
  };

  const passwordFields = [
    {
      name: 'currentPassword',
      label: 'Mật khẩu hiện tại',
      placeholder: 'Nhập mật khẩu hiện tại',
    },
    {
      name: 'newPassword',
      label: 'Mật khẩu mới',
      placeholder: 'Nhập mật khẩu mới',
    },
    {
      name: 'confirmPassword',
      label: 'Xác nhận mật khẩu mới',
      placeholder: 'Xác nhận mật khẩu mới',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#C9CFD2] p-6 mb-6">
      <h2 className="text-xl font-bold text-[#191C1F] mb-6">Đổi mật khẩu</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {passwordFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-[#191C1F] mb-2">
              {field.label}
            </label>
            <div className="relative">
              <input
                type={visibility[field.name as keyof typeof visibility] ? 'text' : 'password'}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 pr-10 border border-[#C9CFD2] rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] transition-colors"
              />
              <button
                type="button"
                onClick={() => toggleVisibility(field.name)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#686868] hover:text-[#191C1F]"
              >
                {visibility[field.name as keyof typeof visibility] ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full px-6 py-2 bg-[#1E40AF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}
