import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Folder, X, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { authService } from '../../services/auth.services';

interface Address {
  _id: string;
  campus: string;
}

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Đồ điện tử',
    condition: 'Mới 100%',
    campus: '',
    description: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [campuses, setCampuses] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const res = await authService.getAddresses();
        const addresses = res.data.result;
        const uniqueCampuses = Array.from(new Set(addresses.map((addr: Address) => addr.campus))) as string[];
        setCampuses(uniqueCampuses);
        if (uniqueCampuses.length > 0) {
          setFormData(prev => ({ ...prev, campus: uniqueCampuses[0] }));
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách campus:', error);
      }
    };
    fetchCampuses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (images.length + files.length > 5) {
      alert("Bạn chỉ được tải tối đa 5 ảnh");
      return;
    }

    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} quá lớn (tối đa 5MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFormData({
      title: '',
      price: '',
      category: 'Đồ điện tử',
      condition: 'Mới 100%',
      campus: campuses[0] || '',
      description: '',
    });
    setImages([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Đăng bán sản phẩm' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="sell" />

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            <h1 className="text-2xl font-bold text-[#191C1F] mb-10">Đăng bán sản phẩm</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Apple iPhone 17 Pro Max 2TB"
                  className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Giá bán</label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="60.000.000"
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] text-sm">VND</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Danh mục</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none"
                  >
                    <option value="Đồ điện tử">Đồ điện tử</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Học tập">Học tập</option>
                    <option value="Gia dụng">Gia dụng</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Tình trạng sản phẩm</label>
                <div className="relative">
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none"
                  >
                    <option value="Mới 100%">Mới 100%</option>
                    <option value="Mới 99%">Mới 99%</option>
                    <option value="Cũ (Vẫn dùng tốt)">Cũ (Vẫn dùng tốt)</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Trường đại học/Campus</label>
                <div className="relative">
                  <select
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none"
                  >
                    {campuses.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Trường Đại học Bách Khoa TPHCM">Trường Đại học Bách Khoa TPHCM</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#191C1F] mb-2">Mô tả chi tiết</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Sản phẩm mới 100%, còn hộp"
                rows={3}
                className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] resize-none"
              />
            </div>

            <div className="mb-10">
              <label className="block text-sm font-medium text-[#191C1F] mb-2">Hình ảnh sản phẩm</label>
              <div 
                className={`w-full border-2 border-dashed py-10 flex flex-col items-center justify-center bg-white transition-all cursor-pointer relative min-h-[220px] ${
                  dragActive ? 'border-[#1E40AF] bg-blue-50' : 'border-[#C9CFD2]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  accept="image/*"
                  multiple
                />
                
                {images.length > 0 ? (
                  <div className="flex flex-wrap gap-4 px-4 justify-center">
                    {images.map((img, index) => (
                      <div key={index} className="relative w-24 h-24 group">
                        <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover border border-gray-200" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                          className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <div className="w-24 h-24 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#1E40AF] hover:border-[#1E40AF]">
                        +
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Folder size={48} className="text-[#1E40AF] opacity-40 mb-3" />
                    <p className="text-[#191C1F] font-bold text-center">Tải ảnh sản phẩm</p>
                    <p className="text-sm text-[#686868] text-center mt-1">
                      Tối thiểu 1 ảnh. Tối đa 5 ảnh. Dung lượng tối đa 5MB. Định dạng: .jpg .jpeg .png
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={handleReset}
                className="px-8 py-3 border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-sm bg-white hover:bg-gray-50 transition-all rounded-none uppercase"
              >
                XÓA
              </button>
              <button className="px-6 py-3 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all rounded-none flex items-center gap-2 uppercase tracking-wide">
                ĐĂNG BÁN SẢN PHẨM <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProduct;
