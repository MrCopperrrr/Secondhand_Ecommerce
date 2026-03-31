'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AuthTabs } from './auth-tabs';
import { AuthInput } from './auth-input';
import { Link } from 'react-router-dom';

export function AuthCard({ initialTab = 'login' }: { initialTab?: 'login' | 'register' }) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { activeTab, formData });
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center mb-8">
        <Link to="/" className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#191C1F] flex items-center justify-center mb-2">
            <div className="w-8 h-8 rounded-full border border-[#191C1F]" />
            </div>
            <h1 className="text-2xl font-bold text-[#191C1F]">Uni2hand</h1>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-8">
        {/* Tabs */}
        <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === 'login' ? (
            // Login Form
            <>
              <AuthInput
                label="Email hoặc Tên người dùng"
                type="text"
                placeholder="Nhập email hoặc tên người dùng"
                value={formData.username}
                onChange={(value) => handleInputChange('username', value)}
              />
              <AuthInput
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                showPasswordToggle
              />
              <div className="flex justify-end mb-6">
                <Link to="/forgot-password" title="Quên mật khẩu" className="text-sm font-medium text-[#1E40AF] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            </>
          ) : (
            // Register Form
            <>
              <AuthInput
                label="Tên người dùng"
                type="text"
                placeholder="Nhập tên người dùng"
                value={formData.username}
                onChange={(value) => handleInputChange('username', value)}
              />
              <AuthInput
                label="Email sinh viên"
                type="email"
                placeholder="Nhập email sinh viên"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
              />
              <AuthInput
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                showPasswordToggle
              />
              <AuthInput
                label="Xác nhận mật khẩu"
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
                showPasswordToggle
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1E40AF] text-[#FFFFFF] font-bold py-3 px-4 rounded-lg hover:bg-[#1530a0] transition flex items-center justify-center gap-2 mt-6"
          >
            {activeTab === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
            <ArrowRight size={20} />
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-[#C9CFD2]">
        <a
          href="#"
          className="text-[#191C1F] hover:text-[#686868] transition text-sm font-medium"
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-[#191C1F] hover:text-[#686868] transition text-sm font-medium"
        >
          Term
        </a>
        <a
          href="#"
          className="text-[#191C1F] hover:text-[#686868] transition text-sm font-medium"
        >
          Contact
        </a>
      </div>
    </div>
  );
}
