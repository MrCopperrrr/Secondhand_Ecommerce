import React, { useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

interface LocationOption {
  id: string;
  label: string;
}

interface FilterSidebarProps {
  locationData?: {
    provinces: LocationOption[];
    wards: LocationOption[];
    campuses: LocationOption[];
  };
  selectedLocation?: {
    province: string;
    ward: string;
    campus: string;
  };
  onCategoryChange?: (category: string) => void;
  onProvinceChange?: (province: string) => void;
  onWardChange?: (ward: string) => void;
  onCampusChange?: (campus: string) => void;
  onPriceChange?: (min: number, max: number) => void;
  onStatusChange?: (status: string) => void;
}

const SearchableSelect: React.FC<{
  label: string;
  options: LocationOption[];
  value: string;
  onSelect: (id: string) => void;
  placeholder: string;
  isOpen: boolean;
  onToggle: () => void;
  listFontSize?: string;
}> = ({ label, options, value, onSelect, /* placeholder unused */ isOpen, onToggle, listFontSize = 'text-sm' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const selectedOption = options.find(opt => opt.id === value);
  const selectedLabel = selectedOption ? selectedOption.label : 'Tất cả';

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4">
      <label className="text-[11px] font-bold text-[#686868] uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
        <div 
          onClick={onToggle}
          className="w-full border border-gray-200 p-3 text-sm text-[#191C1F] cursor-pointer bg-white flex justify-between items-center group hover:border-[#1E40AF] transition-all"
        >
          <span className={selectedLabel === 'Tất cả' ? 'text-gray-400' : 'text-[#191C1F] font-medium'}>
            {selectedLabel}
          </span>
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-gray-100 flex items-center gap-2">
              <Search size={14} className="text-gray-400" />
              <input 
                autoFocus
                type="text"
                className="w-full text-sm outline-none placeholder:text-gray-300"
                placeholder="Tìm nhanh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-56 overflow-y-auto custom-scrollbar">
              <div 
                className="p-3 text-sm hover:bg-[#F3F4F6] cursor-pointer flex justify-between items-center"
                onClick={() => {
                  onSelect('all');
                  onToggle();
                  setSearchTerm('');
                }}
              >
                <span>Tất cả</span>
                {selectedLabel === 'Tất cả' && <Check size={14} className="text-[#1E40AF]" />}
              </div>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div 
                    key={opt.id}
                    className={`p-3 ${listFontSize} hover:bg-[#F3F4F6] cursor-pointer flex justify-between items-center transition-colors`}
                    onClick={() => {
                      onSelect(opt.id);
                      onToggle();
                      setSearchTerm('');
                    }}
                  >
                    <span className="truncate pr-4">{opt.label}</span>
                    {selectedLabel === opt.label && <Check size={14} className="text-[#1E40AF]" />}
                  </div>
                ))
              ) : (
                <div className="p-4 text-xs text-gray-400 text-center italic">Không tìm thấy kết quả</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const STATUS_OPTIONS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'Active', label: 'Còn hàng' },
  { id: 'SoldOut', label: 'Hết hàng' },
];

const PRICE_PRESETS = [
  { id: 'all', label: 'Tất cả giá', min: 0, max: 1000000000 },
  { id: 'over50m', label: 'Trên 50 triệu', min: 50000000, max: 1000000000 },
  { id: '20m-50m', label: 'Từ 20 đến 50 triệu', min: 20000000, max: 50000000 },
  { id: '5m-20m', label: 'Từ 5 đến 20 triệu', min: 5000000, max: 20000000 },
  { id: '1m-5m', label: 'Từ 1 đến 5 triệu', min: 1000000, max: 5000000 },
  { id: '1m-500k', label: 'Từ 500 nghìn đến 1 triệu', min: 500000, max: 1000000 },
  { id: '500k-100k', label: 'Từ 100 nghìn đến 500 nghìn', min: 100000, max: 500000 },
  { id: '100k', label: 'Dưới 100 nghìn', min: 0, max: 100000 },
];

const MAX_LIMIT = 1000000000; // 1 tỷ VND
const FIXED_STEP = 1000000;  // 1 triệu VND step cho tầm cao

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  locationData = { provinces: [], wards: [], campuses: [] },
  selectedLocation = { province: 'all', ward: 'all', campus: 'all' },
  onProvinceChange,
  onWardChange,
  onCampusChange,
  onPriceChange,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPricePreset, setSelectedPricePreset] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_LIMIT); 
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  // Format VND helpers
  const formatVND = (value: number) => value.toLocaleString('vi-VN');
  const parseVND = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseVND(e.target.value);
    if (val > MAX_LIMIT) val = MAX_LIMIT;
    if (val > maxPrice) val = maxPrice;
    setMinPrice(val);
    onPriceChange?.(val, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseVND(e.target.value);
    if (val > MAX_LIMIT) val = MAX_LIMIT;
    setMaxPrice(val);
    onPriceChange?.(minPrice, val);
  };

  const handleMinSlider = (value: number) => {
    if (value <= maxPrice) {
      setMinPrice(value);
      onPriceChange?.(value, maxPrice);
    }
  };

  const handleMaxSlider = (value: number) => {
    if (value >= minPrice) {
      setMaxPrice(value);
      onPriceChange?.(minPrice, value);
    }
  };

  return (
    <aside className="w-full md:w-72 bg-white p-6 border-r border-gray-100 hidden md:block rounded-none select-none">
      
      {/* STATUS FILTER */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#191C1F] mb-4 tracking-tight">Trạng thái</h3>
        <div className="space-y-4">
          {STATUS_OPTIONS.map((status) => (
            <div key={status.id} className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setSelectedStatus(status.id);
                onStatusChange?.(status.id);
              }}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                selectedStatus === status.id ? 'border-[#1E40AF] bg-[#1E40AF]' : 'border-gray-300'
              }`}>
                {selectedStatus === status.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
              <span className={`text-sm ${selectedStatus === status.id ? 'font-bold text-[#1E40AF]' : 'text-[#686868]'}`}>
                {status.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* KHU VỰC (Dropdown mới) */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#191C1F] mb-6 tracking-tight">Khu vực & Campus</h3>
        
        <SearchableSelect 
          label="Tỉnh / Thành phố"
          options={locationData.provinces}
          value={selectedLocation.province}
          onSelect={(id) => onProvinceChange?.(id)}
          placeholder="Chọn tỉnh..."
          isOpen={openDropdown === 'province'}
          onToggle={() => toggleDropdown('province')}
        />

        <SearchableSelect 
          label="Phường"
          options={locationData.wards}
          value={selectedLocation.ward}
          onSelect={(id) => onWardChange?.(id)}
          placeholder="Chọn phường..."
          isOpen={openDropdown === 'ward'}
          onToggle={() => toggleDropdown('ward')}
        />

        <SearchableSelect 
          label="Trường Đại học"
          options={locationData.campuses}
          value={selectedLocation.campus}
          onSelect={(id) => onCampusChange?.(id)}
          placeholder="Chọn campus..."
          isOpen={openDropdown === 'campus'}
          onToggle={() => toggleDropdown('campus')}
          listFontSize="text-[12px] font-medium"
        />
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* KHOẢNG GIÁ */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#191C1F] mb-4 tracking-tight">Khoảng giá</h3>
        
        <div className="relative h-12 flex items-center px-2 mb-4">
          <div className="absolute w-full h-1 bg-gray-200 rounded-none"></div>
          <div 
            className="absolute h-1 bg-[#1E40AF]"
            style={{ 
              left: `calc(${(minPrice / MAX_LIMIT) * 100}% + ${(7 - (minPrice / MAX_LIMIT) * 14) + 2}px)`, 
              width: `calc(${( (maxPrice - minPrice) / MAX_LIMIT ) * 100}% - ${( (maxPrice - minPrice) / MAX_LIMIT ) * 14}px)` 
            }}
          ></div>
          <input 
            type="range" min="0" max={MAX_LIMIT} step={FIXED_STEP} value={minPrice} 
            onChange={(e) => handleMinSlider(Number(e.target.value))}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none custom-slider z-10"
          />
          <input 
            type="range" min="0" max={MAX_LIMIT} step={FIXED_STEP} value={maxPrice} 
            onChange={(e) => handleMaxSlider(Number(e.target.value))}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none custom-slider z-20"
          />
          <style>{`
            .custom-slider::-webkit-slider-thumb {
              pointer-events: auto;
              appearance: none;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: white;
              border: 2px solid #1E40AF;
              cursor: pointer;
            }
          `}</style>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={formatVND(minPrice)}
            onChange={handleMinChange}
            placeholder="Giá thấp nhất"
            className="w-full border border-gray-200 rounded-none p-3 text-sm text-[#191C1F] outline-none bg-white placeholder-gray-400"
          />
          <input
            type="text"
            value={formatVND(maxPrice)}
            onChange={handleMaxChange}
            placeholder="Giá cao nhất"
            className="w-full border border-gray-200 rounded-none p-3 text-sm text-[#191C1F] outline-none bg-white placeholder-gray-400"
          />
        </div>

        {/* Price Presets */}
        <div className="mt-6 space-y-4">
          {PRICE_PRESETS.map((range) => (
            <div key={range.id} className="flex items-center gap-3 group cursor-pointer" 
              onClick={() => {
                setSelectedPricePreset(range.id);
                const actualMin = Math.min(range.min, MAX_LIMIT);
                const actualMax = Math.min(range.max, MAX_LIMIT);
                setMinPrice(actualMin);
                setMaxPrice(actualMax);
                onPriceChange?.(actualMin, actualMax);
              }}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                selectedPricePreset === range.id ? 'border-[#1E40AF] bg-[#1E40AF]' : 'border-gray-300 bg-white'
              }`}>
                {selectedPricePreset === range.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
              <span className={`text-sm ${selectedPricePreset === range.id ? 'font-bold text-[#191C1F]' : 'text-[#686868]'}`}>
                {range.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
