import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Folder, ChevronDown, X } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { authService } from '../../services/auth.services';

interface Address {
  _id: string;
  user_id: string;
  tittle: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  campus: string;
  phone_number: string;
  display?: string;
}

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: 'Chưa cập nhật',
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [studentCardFile, setStudentCardFile] = useState<File | null>(null);
  const [studentCardPreview, setStudentCardPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop');
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const studentCardInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileRes, addressesRes] = await Promise.allSettled([
          authService.getMe(),
          authService.getAddresses()
        ]);

        if (profileRes.status === 'fulfilled') {
          const user = profileRes.value.data.result;
          setFormData(prev => ({
            ...prev,
            fullName: user.username || 'Người dùng mới',
            phone: user.phone_number || '',
            email: user.email || '',
          }));
          setIsVerified(user.is_verified || false);
          if (user.avatar) {
            setAvatarUrl(user.avatar);
          }
          if (user.student_card_image) {
            setStudentCardPreview(user.student_card_image);
          }
        }

        if (addressesRes.status === 'fulfilled') {
          const userAddresses = addressesRes.value.data.result;
          console.log("Fetched addresses:", userAddresses);
          const formatted = userAddresses.map((addr: Address) => ({
            ...addr,
            display: `${addr.address_line_1}, ${addr.address_line_2}, ${addr.city} (${addr.campus})`
          }));
          console.log("Formatted addresses:", formatted);
          setAddresses(formatted);
          if (formatted.length > 0) {
            setFormData(prev => ({ ...prev, address: formatted[0].display }));
          }
        } else {
          console.error("Addresses fetch failed:", (addressesRes as any).reason);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu hồ sơ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear previous error
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Individual validations
    if (name === 'fullName' && value.length > 100) {
      setErrors(prev => ({ ...prev, fullName: 'Tên người dùng không quá 100 kí tự' }));
    }
    
    if (name === 'phone') {
      if (value.length > 10 && value.length > (formData.phone?.length || 0)) return; // Prevent typing more than 10
      if (value.length > 0 && value.length < 10) {
        setErrors(prev => ({ ...prev, phone: 'Số điện thoại phải có đúng 10 số' }));
      } else if (value.length === 10) {
         setErrors(prev => {
            const next = { ...prev };
            delete next.phone;
            return next;
          });
      }
    }

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
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStudentCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStudentCardFile(null);
    setStudentCardPreview(null);
    setIsVerified(false);
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = {
        username: formData.fullName,
        phone_number: formData.phone,
        email: formData.email,
        avatar: avatarUrl
      };
      
      await authService.updateMe(payload);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error('Lỗi khi lưu hồ sơ:', error);
      alert('Có lỗi xảy ra khi lưu hồ sơ: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerify = async () => {
    if (!studentCardPreview) {
      alert('Vui lòng tải ảnh thẻ sinh viên lên trước khi xác thực');
      return;
    }

    try {
      setIsVerifying(true);
      
      let imageToVerify = studentCardPreview;
      
      // If we have a local file, convert it to base64 because blob URLs won't work on the backend
      if (studentCardFile) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
        reader.readAsDataURL(studentCardFile);
        imageToVerify = await base64Promise;
      }

      const response = await authService.verifyStudentCard(imageToVerify);
      if (response.data.result) {
        setIsVerified(true);
        alert('Xác thực thẻ sinh viên thành công!');
      }
    } catch (error: any) {
      console.error('Lỗi khi xác thực:', error);
      alert('Xác thực thất bại: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsVerifying(false);
    }
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

                <div className="flex items-center gap-3 h-28">
                  <h3 className="text-3xl font-bold text-[#191C1F] whitespace-nowrap">{formData.fullName}</h3>
                  {isVerified && <CheckCircle size={32} className="text-[#2DB224] fill-white" />}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border text-[#191C1F] focus:outline-none ${
                        errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-[#C9CFD2] focus:border-[#1E40AF]'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C1F] mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border text-[#191C1F] focus:outline-none ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#C9CFD2] focus:border-[#1E40AF]'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
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
                    {addresses.length > 0 ? (
                      addresses.map((addr) => (
                        <option key={addr._id} value={addr.display}>
                          {addr.display}
                        </option>
                      ))
                    ) : (
                      <option value="Chưa cập nhật">Chưa cập nhật</option>
                    )}
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
            </section>

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
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <p className="text-white font-bold text-lg">Bấm để thay đổi</p>
                    </div>

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
                <button 
                  onClick={handleVerify}
                  disabled={isVerifying || isVerified}
                  className={`px-12 py-3 border-2 font-bold text-sm transition-all rounded-none ${
                    isVerified 
                      ? 'border-green-600 text-green-600 cursor-default bg-green-50' 
                      : 'border-[#1E40AF] text-[#1E40AF] bg-white hover:bg-gray-50'
                  }`}
                >
                  {isVerifying ? 'ĐANG XỬ LÝ...' : isVerified ? 'ĐÃ XÁC THỰC' : 'XÁC THỰC'}
                </button>
                <div className="relative">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-12 py-3 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all rounded-none disabled:bg-blue-300 disabled:border-blue-300 cursor-pointer min-w-[140px]"
                    >
                      {isSaving ? 'ĐANG LƯU...' : 'LƯU'}
                    </button>
                    {showSuccess && (
                        <div className="absolute top-full left-0 right-0 text-center mt-2 text-green-600 font-bold text-xs animate-in fade-in slide-in-from-top-1 duration-200">
                            Cập nhật thành công!
                        </div>
                    )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
