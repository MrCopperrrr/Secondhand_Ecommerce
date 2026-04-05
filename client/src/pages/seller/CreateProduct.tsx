import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Folder, X, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { productService } from '../../services/product.services';
import { categoryServices } from '../../services/category.services';
import PROVINCES_DATA from '../../data/provinces.json';

interface SearchableDropdownProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ 
  label, name, value, options, onChange, placeholder, disabled 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#191C1F] mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder || "Tìm kiếm..."}
          value={isOpen ? searchTerm : value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm('');
          }}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] bg-white pr-10 cursor-pointer ${disabled ? 'bg-gray-50 opacity-60' : ''}`}
        />
        <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#C9CFD2] shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <div
                key={i}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#191C1F]"
                onClick={() => {
                  onChange(name, opt);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">Không tìm thấy kết quả</div>
          )}
        </div>
      )}
    </div>
  );
};

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    sub_category: '',
    condition: '100',
    province: '',
    campus: '',
    description: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [provinces] = useState<any[]>(PROVINCES_DATA);
  const [filteredCampuses, setFilteredCampuses] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]); 
  const [subCategories, setSubCategories] = useState<any[]>([]); 
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initForm = async () => {
      try {
        if (PROVINCES_DATA.length > 0) {
          const firstProvince = PROVINCES_DATA[0];
          setFormData(prev => ({ 
            ...prev, 
            province: firstProvince.name,
            campus: firstProvince.campus && firstProvince.campus.length > 0 ? firstProvince.campus[0] : ''
          }));
        }

        const cats = await categoryServices.getCategories();
        const subs = await categoryServices.getSubCategories();
        setCategories(cats || []);
        setSubCategories(subs || []);
        if (cats && cats.length > 0) {
          setFormData(prev => ({ ...prev, category: cats[0]._id }));
        }
      } catch (e) {
        console.error('Lỗi khi khởi tạo form:', e);
      }
    };
    initForm();
  }, []);

  useEffect(() => {
    if (formData.province) {
      const provinceData = provinces.find(p => p.name === formData.province);
      const campuses = provinceData?.campus || [];
      setFilteredCampuses(campuses);
      if (campuses.length > 0) {
        if (!campuses.includes(formData.campus)) {
          setFormData(prev => ({ ...prev, campus: campuses[0] }));
        }
      } else {
        setFormData(prev => ({ ...prev, campus: '' }));
      }
    }
  }, [formData.province, provinces]);

  useEffect(() => {
    if (formData.category) {
      const filtered = subCategories.filter(s => s.parent_id === formData.category);
      setFilteredSubCategories(filtered);
      if (filtered.length > 0) {
        setFormData(prev => ({ ...prev, sub_category: filtered[0]._id }));
      } else {
        setFormData(prev => ({ ...prev, sub_category: '' }));
      }
    }
  }, [formData.category, subCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (images.length === 0) {
      alert("Phải có hình ảnh sản phẩm");
      return;
    }
  
    const payload = {
      name: formData.title,
      description: formData.description,
      price: Number(formData.price.replace(/\./g, '')), 
      category_id: formData.category,
      sub_category_id: formData.sub_category,
      condition: Number(formData.condition),
      images: images, 
      province: formData.province,
      campus: formData.campus
    };
  
    try {
      await productService.createProduct(payload);
      alert("Đăng bán thành công!");
      handleReset();
    } catch (error: any) {
      console.error("Lỗi rồi ", error);
      const msg = error.response?.data?.message || "Có lỗi";
      
      if (error.response?.data?.error === "jwt expired") {
        alert("Phiên đăng nhập hết hạn");
      } else {
        alert(msg);
      }
    }
  };

  const formatPrice = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (number === '') return '';
    const num = parseInt(number);
    // Limit to Int32 Max: 2147483647
    if (num > 2147483647) return '2.147.483.647';
    if (num <= 0) return '';
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      const formatted = formatPrice(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    if (name === 'condition') {
      const val = parseInt(value);
      if (value === '') {
        setFormData(prev => ({ ...prev, [name]: '' }));
        return;
      }
      if (val < 1) {
        setFormData(prev => ({ ...prev, [name]: '1' }));
        return;
      }
      if (val > 100) {
        setFormData(prev => ({ ...prev, [name]: '100' }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
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
      category: categories[0]?._id || '',
      sub_category: '', 
      condition: '100',
      province: provinces[0]?.name || '',
      campus: provinces[0]?.campus?.[0] || '',
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

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-[#191C1F]">Tên sản phẩm</label>
                <span className="text-xs text-[#686868] opacity-60">{formData.title.length}/100</span>
              </div>
              <input
                type="text"
                name="title"
                maxLength={100}
                value={formData.title}
                onChange={handleChange}
                placeholder="Apple iPhone 17 Pro Max 2TB"
                className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              <div>
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Độ mới sản phẩm (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    placeholder="100"
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] bg-white pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191C1F] text-sm">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Danh mục</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white"
                  >
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191C1F] mb-2">Danh mục con</label>
                <div className="relative">
                  <select
                    name="sub_category"
                    value={formData.sub_category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#C9CFD2] text-[#191C1F] focus:outline-none focus:border-[#1E40AF] appearance-none bg-white"
                    disabled={filteredSubCategories.length === 0}
                  >
                    {filteredSubCategories.map(s => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                    {filteredSubCategories.length === 0 && (
                      <option value="">Không có danh mục con</option>
                    )}
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SearchableDropdown
                label="Tỉnh/Thành phố"
                name="province"
                value={formData.province}
                options={provinces.map(p => p.name)}
                onChange={handleDropdownChange}
              />
              <SearchableDropdown
                label="Trường đại học/Campus"
                name="campus"
                value={formData.campus}
                options={filteredCampuses}
                onChange={handleDropdownChange}
                disabled={filteredCampuses.length === 0}
                placeholder={filteredCampuses.length === 0 ? "Không có trường đại học nào" : "Tìm kiếm trường..."}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-[#191C1F]">Mô tả chi tiết</label>
                <span className="text-xs text-[#686868] opacity-60">{formData.description.length}/3000</span>
              </div>
              <textarea
                name="description"
                maxLength={3000}
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
              <button onClick={handleSubmit} className="px-6 py-3 bg-[#1E40AF] border-2 border-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all rounded-none flex items-center gap-2 uppercase tracking-wide">
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
