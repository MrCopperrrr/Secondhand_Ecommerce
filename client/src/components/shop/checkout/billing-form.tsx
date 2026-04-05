import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { commonServices } from '../../../services/common.services';

interface ProvinceData {
  _id: string;
  name: string;
  wards: string[];
  campus: string[];
}

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
  onFormChange: (data: BillingFormData, isValid: boolean) => void;
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
  error?: string;
}

function SearchableSelect({ label, value, options, onChange, placeholder, disabled, error }: SearchableSelectProps) {
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
            className={`w-full flex items-center justify-between px-4 py-3 border rounded-none text-[#191C1F] focus:outline-none transition-all bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed ${
              error ? 'border-red-500' : 'border-gray-200 focus:border-[#1E40AF]'
            } ${!value ? 'text-gray-400' : ''}`}
          >
            <span className="truncate">{value || placeholder}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
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
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function BillingForm({ onFormChange }: BillingFormProps) {
  const [provincesData, setProvincesData] = useState<ProvinceData[]>([]);
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

  const [errors, setErrors] = useState<Partial<Record<keyof BillingFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BillingFormData, boolean>>>({});

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
        try {
            const resp = await commonServices.getProvinces();
            setProvincesData(resp.data.result || []);
        } catch (e) {
            console.error("Lỗi khi tải tỉnh thành:", e);
        }
    };
    fetchProvinces();
  }, []);

  const provinceOptions = useMemo(() => provincesData.map(p => p.name), [provincesData]);
  
  const wardOptions = useMemo(() => {
    if (!formData.province) return [];
    const province = provincesData.find(p => p.name === formData.province);
    return province ? province.wards : [];
  }, [formData.province, provincesData]);

  const campusOptions = useMemo(() => {
    if (!formData.province) return [];
    const province = provincesData.find(p => p.name === formData.province);
    return province ? province.campus : [];
  }, [formData.province, provincesData]);

  const validate = (data: BillingFormData, field?: keyof BillingFormData) => {
    const newErrors: Partial<Record<keyof BillingFormData, string>> = { ...errors };
    
    const checkField = (f: keyof BillingFormData) => {
      if (f === 'campus') return; // campus is optional
      
      const val = data[f];
      if (!val || (typeof val === 'string' && val.trim() === '')) {
        newErrors[f] = 'Trường này không được để trống';
      } else if (f === 'email' && !/\S+@\S+\.\S+/.test(val)) {
        newErrors[f] = 'Email không hợp lệ';
      } else if (f === 'phone' && !/^[0-9]{10}$/.test(val.replace(/\s/g, ''))) {
        newErrors[f] = 'Số điện thoại không hợp lệ (10 số)';
      } else {
        delete newErrors[f];
      }
    };

    if (field) {
      checkField(field);
    } else {
      (Object.keys(data) as Array<keyof BillingFormData>).forEach(checkField);
    }

    setErrors(newErrors);
    return newErrors;
  };

  const checkOverallValidity = (data: BillingFormData, currentErrors: Partial<Record<keyof BillingFormData, string>>) => {
    const requiredFields: Array<keyof BillingFormData> = ['fullName', 'phone', 'email', 'address', 'province', 'ward', 'deliveryMethod'];
    const hasAllRequired = requiredFields.every(f => data[f] && data[f].trim() !== '');
    const hasNoErrors = requiredFields.every(f => !currentErrors[f]);
    return hasAllRequired && hasNoErrors;
  };

  // Run validation when data changes or touched
  useEffect(() => {
    const currentErrors = validate(formData);
    const isValid = checkOverallValidity(formData, currentErrors);
    onFormChange(formData, isValid);
  }, [formData, onFormChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof BillingFormData) => {
    const value = e.target.value;
    const newData = { ...formData, [field]: value };
    
    if (field === 'province') {
      newData.ward = '';
      newData.campus = '';
    }
    
    setFormData(newData);
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSelectChange = (field: keyof BillingFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    if (field === 'province') {
      newData.ward = '';
      newData.campus = '';
    }
    setFormData(newData);
    setTouched(prev => ({ ...prev, [field]: true }));
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
            onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
            className={`w-full px-4 py-3 border rounded-none text-[#191C1F] focus:outline-none transition-all ${
              touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-[#1E40AF]'
            }`}
            placeholder="Ví dụ: Nguyễn Văn A"
          />
          {touched.fullName && errors.fullName && <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>}
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
            onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
            className={`w-full px-4 py-3 border rounded-none text-[#191C1F] focus:outline-none transition-all ${
              touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-[#1E40AF]'
            }`}
            placeholder="09xx xxx xxx"
          />
          {touched.phone && errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-normal text-[#191C1F] mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e, 'email')}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            className={`w-full px-4 py-3 border rounded-none text-[#191C1F] focus:outline-none transition-all ${
              touched.email && errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#1E40AF]'
            }`}
            placeholder="example@gmail.com"
          />
          {touched.email && errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
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
            onBlur={() => setTouched(prev => ({ ...prev, address: true }))}
            className={`w-full px-4 py-3 border rounded-none text-[#191C1F] focus:outline-none transition-all ${
              touched.address && errors.address ? 'border-red-500' : 'border-gray-200 focus:border-[#1E40AF]'
            }`}
            placeholder="Số nhà, tên đường..."
          />
          {touched.address && errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
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
          error={touched.province ? errors.province : undefined}
        />
        <SearchableSelect
          label="Phường"
          value={formData.ward}
          options={wardOptions}
          onChange={(val) => handleSelectChange('ward', val)}
          placeholder={formData.province ? "Chọn phường..." : "Vui lòng chọn tỉnh thành trước"}
          disabled={!formData.province}
          error={touched.ward ? errors.ward : undefined}
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
              className={`w-full appearance-none px-4 py-3 border rounded-none text-[#191C1F] focus:outline-none transition-all bg-white cursor-pointer ${
                touched.deliveryMethod && errors.deliveryMethod ? 'border-red-500' : 'border-gray-200 focus:border-[#1E40AF]'
              }`}
            >
              <option value="shipping">Vận chuyển</option>
              <option value="meetup">Meetup</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          {touched.deliveryMethod && errors.deliveryMethod && <p className="mt-1.5 text-xs text-red-500">{errors.deliveryMethod}</p>}
        </div>

        <SearchableSelect
          label="Trường Đại học/Campus"
          value={formData.campus}
          options={campusOptions}
          onChange={(val) => handleSelectChange('campus', val)}
          placeholder={formData.province ? "Chọn trường..." : "Vui lòng chọn tỉnh thành trước"}
          disabled={!formData.province}
          // No error for campus as it's optional
        />
      </div>
    </div>
  );
}
