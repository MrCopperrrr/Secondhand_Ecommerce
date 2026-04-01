import React, { useState } from 'react';
import { CheckCircle, Eye, EyeOff, Folder, ChevronDown } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0123456789',
    email: 'example@example.edu.vn',
    address: '258 Lý Thường Kiệt, Phường Diên Hồng, Thành phố Hồ Chí Minh (Trường Đại học Bách khoa TPHCM)',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'hồ sơ cá nhân' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="profile" />

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* THÔNG TIN CHUNG */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-6">Thông tin chung</h2>
              
              <div className="flex items-center gap-8 mb-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-28 h-28 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop" 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="px-4 py-1.5 border border-[#C9CFD2] text-[#686868] text-xs bg-white hover:bg-gray-50 transition-colors rounded-sm">
                    Thay đổi
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold text-[#191C1F]">{formData.fullName}</h3>
                  <CheckCircle size={32} className="text-[#2DB224] fill-white" />
                </div>
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Email sinh viên</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border text-[#191C1F] focus:outline-none ${
                      formData.email && !formData.email.endsWith('.edu.vn') 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[#C9CFD2] focus:border-[#1E40AF]'
                    }`}
                    placeholder="example@example.edu.vn"
                  />
                  {formData.email && !formData.email.endsWith('.edu.vn') && (
                    <p className="text-xs text-red-500 mt-1">Email phải kết thúc bằng .edu.vn</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Địa chỉ</label>
                <div className="relative">
                  <select
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none"
                  >
                    <option value={formData.address}>{formData.address}</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
            </section>

            {/* ĐỔI MẬT KHẨU */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-6">Đổi mật khẩu</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Mật khẩu hiện tại</label>
                  <div className="relative">
                    <input
                      type={visibility.currentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      className="w-full px-4 py-3 border border-[#C9CFD2] focus:outline-none focus:border-[#1E40AF]"
                    />
                    <button onClick={() => toggleVisibility('currentPassword')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9CFD2]">
                      {visibility.currentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={visibility.newPassword ? 'text' : 'password'}
                      name="newPassword"
                      className="w-full px-4 py-3 border border-[#C9CFD2] focus:outline-none focus:border-[#1E40AF]"
                    />
                    <button onClick={() => toggleVisibility('newPassword')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9CFD2]">
                      {visibility.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={visibility.confirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className="w-full px-4 py-3 border border-[#C9CFD2] focus:outline-none focus:border-[#1E40AF]"
                    />
                    <button onClick={() => toggleVisibility('confirmPassword')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9CFD2]">
                      {visibility.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* XÁC THỰC SINH VIÊN */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-6">Xác thực sinh viên</h2>
              <div className="w-full border-2 border-dashed border-[#C9CFD2] py-24 flex flex-col items-center justify-center bg-white mb-6">
                <Folder size={48} className="text-[#1E40AF] opacity-40 mb-4" />
                <p className="text-[#191C1F] font-medium mb-1">
                  {selectedFile ? selectedFile.name : 'Tải ảnh lên để xác thực sinh viên'}
                </p>
                <p className="text-sm text-[#686868]">Dung lượng tối đa 5MB. Định dạng: .jpg .jpeg .png</p>
              </div>

              <div className="flex justify-end gap-4">
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} 
                  />
                  <div className="px-12 py-3 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-sm bg-white hover:bg-gray-50 transition-all rounded-none">
                    Tải ảnh
                  </div>
                </label>
                <button className="px-12 py-3 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-sm bg-white hover:bg-gray-50 transition-all rounded-none">
                  Xác thực
                </button>
                <button className="px-12 py-3 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all rounded-none">
                  Lưu
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
