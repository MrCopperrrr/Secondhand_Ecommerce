'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterSidebarProps {
  onCategoryChange?: (category: string) => void;
  onLocationChange?: (location: string) => void;
  onPriceChange?: (min: number, max: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'electronics', label: 'Điện tử' },
  { id: 'furniture', label: 'Đồ nội thất' },
  { id: 'books', label: 'Sách' },
  { id: 'clothing', label: 'Quần áo' },
];

const LOCATIONS = [
  { value: 'all', label: 'Tất cả khu vực' },
  { value: 'campus1', label: 'Campus Đại học Bách Khoa' },
  { value: 'campus2', label: 'Campus Đại học Kinh tế' },
  { value: 'campus3', label: 'Campus Đại học Sư phạm' },
];

const PRICE_RANGES = [
  { id: 'under100k', label: 'Dưới 100 ngàn' },
  { id: '100k-500k', label: '100k - 500k' },
  { id: '500k-1m', label: '500k - 1 triệu' },
  { id: '1m-5m', label: '1 - 5 triệu' },
  { id: 'over5m', label: 'Trên 5 triệu' },
];

export function FilterSidebar({
  onCategoryChange,
  onLocationChange,
  onPriceChange,
}: FilterSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedPricePreset, setSelectedPricePreset] = useState('');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange?.(value);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    onLocationChange?.(value);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    onPriceChange?.(values[0], values[1]);
  };

  const handleMinPriceInput = (value: string) => {
    const num = parseInt(value) || 0;
    setMinPrice(num);
    onPriceChange?.(num, maxPrice);
  };

  const handleMaxPriceInput = (value: string) => {
    const num = parseInt(value) || 0;
    setMaxPrice(num);
    onPriceChange?.(minPrice, num);
  };

  return (
    <aside className="w-full md:w-1/5 bg-white p-6 border-r border-[#C9CFD2]">
      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase text-[#191C1F] mb-4">
          Danh mục
        </h3>
        <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange}>
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={category.id}
                  id={`category-${category.id}`}
                  className="border-[#C9CFD2]"
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className={`text-sm cursor-pointer ${
                    selectedCategory === category.id
                      ? 'font-bold text-[#1E40AF]'
                      : 'text-[#686868]'
                  }`}
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Location Filter */}
      <div className="mb-8 pb-8 border-b border-[#C9CFD2]">
        <h3 className="text-sm font-bold uppercase text-[#191C1F] mb-4">
          Khu vực
        </h3>
        <Select value={selectedLocation} onValueChange={handleLocationChange}>
          <SelectTrigger className="border-[#C9CFD2] bg-white text-[#686868]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((location) => (
              <SelectItem key={location.value} value={location.value}>
                {location.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase text-[#191C1F] mb-4">
          Khoảng giá
        </h3>

        {/* Range Slider */}
        <div className="mb-6">
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-[#686868] mt-2">
            {minPrice} - {maxPrice} triệu VND
          </div>
        </div>

        {/* Min/Max Inputs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-xs text-[#686868] mb-1">Min</label>
            <Input
              type="number"
              value={minPrice}
              onChange={(e) => handleMinPriceInput(e.target.value)}
              placeholder="0"
              className="border-[#C9CFD2] bg-white text-[#191C1F]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#686868] mb-1">Max</label>
            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => handleMaxPriceInput(e.target.value)}
              placeholder="100"
              className="border-[#C9CFD2] bg-white text-[#191C1F]"
            />
          </div>
        </div>

        {/* Price Presets */}
        <RadioGroup value={selectedPricePreset} onValueChange={setSelectedPricePreset}>
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={range.id}
                  id={`price-${range.id}`}
                  className="border-[#C9CFD2]"
                />
                <Label
                  htmlFor={`price-${range.id}`}
                  className="text-sm text-[#686868] cursor-pointer"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
}
