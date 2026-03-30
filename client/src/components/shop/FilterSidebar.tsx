import React, { useState } from 'react';

interface FilterSidebarProps {
  onCategoryChange?: (category: string) => void;
  onLocationChange?: (location: string) => void;
  onPriceChange?: (min: number, max: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'electronics', label: 'Đồ điện tử' },
  { id: 'books', label: 'Sách giáo trình' },
  { id: 'home', label: 'Đồ gia dụng' },
  { id: 'school', label: 'Dụng cụ học tập' },
  { id: 'clothing', label: 'Quần áo' },
  { id: 'furniture', label: 'Đồ nội thất' },
  { id: 'transport', label: 'Phương tiện di chuyển' },
  { id: 'sports', label: 'Dụng cụ thể thao' },
];

const PRICE_PRESETS = [
  { id: 'all', label: 'Tất cả giá', min: 0, max: 100000000 },
  { id: 'over5m', label: 'Trên 5 triệu', min: 5000000, max: 100000000 },
  { id: '3m-5m', label: 'Từ 3 đến 5 triệu', min: 3000000, max: 5000000 },
  { id: '1m-3m', label: 'Từ 1 đến 3 triệu', min: 1000000, max: 3000000 },
  { id: '500k-1m', label: 'Từ 500 ngàn đến 1 triệu', min: 500000, max: 1000000 },
  { id: '100k-500k', label: 'Từ 100 ngàn đến 500 ngàn', min: 100000, max: 500000 },
  { id: 'under100k', label: 'Dưới 100 ngàn', min: 0, max: 100000 },
];

const MAX_LIMIT = 20000000; // 20 triệu VND
const FIXED_STEP = 100000;  // 100k VND

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onCategoryChange,
  onLocationChange,
  onPriceChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricePreset, setSelectedPricePreset] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_LIMIT); 

  // Hàm định dạng số có dấu chấm phân cách
  const formatVND = (value: number) => {
    return value.toLocaleString('vi-VN');
  };

  // Hàm loại bỏ dấu chấm để lấy giá trị số nguyên
  const parseVND = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseVND(e.target.value);
    if (val > MAX_LIMIT) val = MAX_LIMIT; // Chốt chặn max
    if (val > maxPrice) val = maxPrice; // Min không được vượt max
    setMinPrice(val);
    onPriceChange?.(val, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseVND(e.target.value);
    if (val > MAX_LIMIT) val = MAX_LIMIT; // Chốt chặn max
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
    <aside className="w-full md:w-64 bg-white p-6 border-r border-gray-100 hidden md:block rounded-none select-none">
      {/* DANH MỤC */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase text-[#191C1F] mb-4 tracking-tight">DANH MỤC</h3>
        <div className="space-y-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 group cursor-pointer" 
              onClick={() => {
                setSelectedCategory(cat.id);
                onCategoryChange?.(cat.id);
              }}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                selectedCategory === cat.id ? 'border-[#1E40AF] bg-[#1E40AF]' : 'border-gray-300 bg-white'
              }`}>
                {selectedCategory === cat.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>
              <span className={`text-sm ${selectedCategory === cat.id ? 'font-bold text-[#1E40AF]' : 'text-[#686868]'}`}>
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* KHU VỰC */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase text-[#191C1F] mb-4 tracking-tight">KHU VỰC</h3>
        <div className="relative">
          <select
            className="w-full border border-gray-200 rounded-none p-3 text-sm text-[#191C1F] outline-none bg-white appearance-none pr-10"
            onChange={(e) => onLocationChange?.(e.target.value)}
            defaultValue="all"
          >
            <option value="all" className="text-sm">Tất cả khu vực/Campus</option>
            <option value="campus1">Campus Đại học Bách Khoa</option>
            <option value="campus2">Campus Đại học Kinh tế</option>
            <option value="campus3">Campus Đại học Sư phạm</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* KHOẢNG GIÁ */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase text-[#191C1F] mb-4 tracking-tight">KHOẢNG GIÁ</h3>
        
        {/* Dual Range Slider */}
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
                // Clamp these values just in case preset max is > Sidebar max
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
