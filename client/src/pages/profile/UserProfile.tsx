import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Eye, EyeOff, Folder, ChevronDown, X } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { authService } from '../../services/auth.services';

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: 'Chưa cập nhật',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.getMe();
        const user = res.data.result;
        setFormData(prev => ({
          ...prev,
          fullName: user.username || 'Người dùng mới',
          phone: user.phone_number || '',
          email: user.email || '',
          // Sẽ cập nhật address sau nếu có trong DB schema
        }));
        if (user.avatar) {
          setAvatarUrl(user.avatar);
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin cá nhân:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [studentCardFile, setStudentCardFile] = useState<File | null>(null);
  const [studentCardPreview, setStudentCardPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop');
  const [dragActive, setDragActive] = useState(false);

  const studentCardInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentCardChange = (file: File) => {
    setStudentCardFile(file);
    const url = URL.createObjectURL(file);
    setStudentCardPreview(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleStudentCardChange(e.dataTransfer.files[0]);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(url);
    }
  };

  const removeStudentCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStudentCardFile(null);
    setStudentCardPreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-[#191C1F] font-medium italic">Đang tải hồ sơ...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Hồ sơ cá nhân' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="profile" />

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* THÔNG TIN CHUNG */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#191C1F] mb-10">Thông tin chung</h2>
              
              <div className="flex items-start gap-8 mb-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center shadow-sm">
                    <img 
                      src={avatarUrl} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      ref={avatarInputRef}
                    />
                    <div className="px-4 py-1.5 border border-[#C9CFD2] text-[#686868] text-xs bg-white hover:bg-gray-50 transition-colors">
                      Thay đổi
                    </div>
                  </label>
                </div>

                {/* Name and tick container aligned to avatar center (28/2 = 14) -> h-28 flex items-center */}
                <div className="flex items-center gap-3 h-28">
                  <h3 className="text-3xl font-bold text-[#191C1F] whitespace-nowrap">{formData.fullName}</h3>
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
              
              <div 
                className={`w-full border-2 border-dashed py-8 flex flex-col items-center justify-center bg-white mb-6 transition-all cursor-pointer relative min-h-[300px] overflow-hidden ${
                  dragActive ? 'border-[#1E40AF] bg-blue-50' : 'border-[#C9CFD2] bg-white'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => studentCardInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={studentCardInputRef}
                  onChange={(e) => e.target.files && e.target.files[0] && handleStudentCardChange(e.target.files[0])}
                  accept="image/*"
                />
                
                {studentCardPreview ? (
                  <div className="relative w-full h-full max-w-md max-h-[400px] group flex items-center justify-center">
                    <img 
                      src={studentCardPreview} 
                      alt="Student Card Preview" 
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Overlay for change hint */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <p className="text-white font-bold text-lg">Bấm để thay đổi</p>
                    </div>

                    {/* Delete button - must be after overlay or have higher z-index */}
                    <button 
                      type="button"
                      onClick={removeStudentCard}
                      className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 hover:bg-red-700 active:scale-95"
                      title="Xóa ảnh"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Folder size={48} className={`mb-4 transition-all ${dragActive ? 'text-[#1E40AF]' : 'text-[#1E40AF] opacity-40'}`} />
                    <p className="text-[#191C1F] font-medium mb-1 text-center px-4">
                      Tải ảnh lên để xác thực sinh viên
                    </p>
                    <p className="text-sm text-[#686868]">Dung lượng tối đa 5MB. Định dạng: .jpg .jpeg .png</p>
                  </>
                )}
                
                {dragActive && !studentCardPreview && (
                  <div className="absolute inset-0 bg-[#1E40AF] opacity-10 pointer-events-none" />
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button className="px-12 py-3 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-sm bg-white hover:bg-gray-50 transition-all rounded-none">
                  XÁC THỰC
                </button>
                <button className="px-12 py-3 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all rounded-none">
                  LƯU
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
