import React, { useState, useMemo, useEffect } from 'react';
import PROVINCES_DATA_RAW from '../../../data/provinces.json';
import UNIVERSITIES_DATA_RAW from '../../../data/universities.json';
import { Search, ChevronDown, Check } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

interface ProvinceData {
  id: number;
  name: string;
  wards: string[];
}

const PROVINCES_DATA = PROVINCES_DATA_RAW as ProvinceData[];
const UNIVERSITIES_DATA = UNIVERSITIES_DATA_RAW as Record<string, string[]>;

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

const normalizeStr = (str: string) => {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd');
};

interface SearchableSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function SearchableSelect({ label, value, options, onChange, placeholder, disabled }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const normalizedSearch = normalizeStr(search);
    return options.filter(opt => 
      normalizeStr(opt).includes(normalizedSearch)
    );
  }, [options, search]);

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  return (
    <div className="w-full">
      <label className="block text-sm font-normal text-[#191C1F] mb-2">{label}</label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            disabled={disabled}
            className={`w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed ${
              !value ? 'text-gray-400' : ''
            }`}
          >
            <span className="truncate">{value || placeholder}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
        </Popover.Trigger>
        
        <Popover.Portal>
          <Popover.Content
            className="z-[100] w-[var(--radix-popover-trigger-width)] bg-white border border-gray-200 shadow-xl"
            align="start"
            sideOffset={4}
          >
            <div className="p-2 border-b border-gray-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                autoFocus
                className="w-full bg-transparent outline-none text-sm py-1"
                placeholder="Tìm kiếm nhanh..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto py-1 no-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#191C1F] hover:bg-gray-50 transition-colors text-left"
                  >
                    <span>{opt}</span>
                    {value === opt && <Check className="w-4 h-4 text-[#1E40AF]" />}
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-gray-500 text-center">
                  Không tìm thấy kết quả
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

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

  const provinceOptions = useMemo(() => PROVINCES_DATA.map(p => p.name), []);
  
  const wardOptions = useMemo(() => {
    if (!formData.province) return [];
    const province = PROVINCES_DATA.find(p => p.name === formData.province);
    return province ? province.wards : [];
  }, [formData.province]);

  const campusOptions = useMemo(() => {
    if (!formData.province) return [];
    return UNIVERSITIES_DATA[formData.province] || [];
  }, [formData.province]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof BillingFormData) => {
    const newData = { ...formData, [field]: e.target.value };
    
    if (field === 'province') {
      newData.ward = '';
      newData.campus = '';
    }
    
    setFormData(newData);
    onFormChange(newData);
  };

  const handleSelectChange = (field: keyof BillingFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    if (field === 'province') {
      newData.ward = '';
      newData.campus = '';
    }
    setFormData(newData);
    onFormChange(newData);
  };

  return (
    <div className="space-y-8 font-roboto">
      <h2 className="text-2xl font-bold text-[#191C1F]">
        Thông tin thanh toán
      </h2>

      {/* Row 1: Full Name */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">Họ và tên</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange(e, 'fullName')}
            className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all"
            placeholder="Ví dụ: Nguyễn Văn A"
          />
        </div>
      </div>

      {/* Row 2: Phone & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">Số điện thoại</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')}
            className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all"
            placeholder="09xx xxx xxx"
          />
        </div>
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e, 'email')}
            className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all"
            placeholder="example@gmail.com"
          />
        </div>
      </div>

      {/* Row 3: Address */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">Địa chỉ</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange(e, 'address')}
            className="w-full px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all"
            placeholder="Số nhà, tên đường..."
          />
        </div>
      </div>

      {/* Row 4: Province & Ward */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SearchableSelect
          label="Tỉnh/Thành phố"
          value={formData.province}
          options={provinceOptions}
          onChange={(val) => handleSelectChange('province', val)}
          placeholder="Chọn tỉnh thành..."
        />
        <SearchableSelect
          label="Phường"
          value={formData.ward}
          options={wardOptions}
          onChange={(val) => handleSelectChange('ward', val)}
          placeholder={formData.province ? "Chọn phường..." : "Vui lòng chọn tỉnh thành trước"}
          disabled={!formData.province}
        />
      </div>

      {/* Row 5: Delivery Method & Campus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">Lựa chọn giao hàng</label>
          <div className="relative">
            <select
              value={formData.deliveryMethod}
              onChange={(e) => handleChange(e, 'deliveryMethod')}
              className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-none text-[#191C1F] focus:outline-none focus:border-[#1E40AF] transition-all bg-white cursor-pointer"
            >
              <option value="shipping">Vận chuyển</option>
              <option value="meetup">Meetup</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <SearchableSelect
          label="Trường Đại học/Campus"
          value={formData.campus}
          options={campusOptions}
          onChange={(val) => handleSelectChange('campus', val)}
          placeholder={formData.province ? "Chọn trường..." : "Vui lòng chọn tỉnh thành trước"}
          disabled={!formData.province}
        />
      </div>
    </div>
  );
}
