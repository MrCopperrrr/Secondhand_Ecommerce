'use client';

// Navbar component with updated icons
import { useState } from 'react';
import {
  ShoppingCart,
  Bell,
  MessageCircle,
  User,
  Search,
  ChevronDown,
  Twitter,
  Facebook,
  Share2,
  Youtube,
  Instagram,
} from 'lucide-react';

export function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState('Danh mục');

  const categories = [
    'Danh mục',
    'Điện tử',
    'Thời trang',
    'Sách & Văn phòng',
    'Thể thao',
    'Khác',
  ];

  return (
    <nav className="w-full bg-[#57B7F5]">
      {/* Top Utility Bar */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left Section */}
          <div className="text-[#FFFFFF] text-sm font-medium">
            Chào mừng đến với Uni2hand
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <button
                className="hover:opacity-80 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter size={16} className="text-[#FFFFFF]" />
              </button>
              <button
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-[#FFFFFF]" />
              </button>
              <button
                className="hover:opacity-80 transition-opacity"
                aria-label="Share"
              >
                <Share2 size={16} className="text-[#FFFFFF]" />
              </button>
              <button
                className="hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube size={16} className="text-[#FFFFFF]" />
              </button>
              <button
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-[#FFFFFF]" />
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-4 bg-white/30"></div>

            {/* Language Selector */}
            <button className="flex items-center gap-1 text-[#FFFFFF] text-sm font-medium hover:opacity-80 transition-opacity">
              <span>VI</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Branding (Logo) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-[#FFFFFF]"></div>
            </div>
            {/* Brand Name */}
            <span className="text-[#FFFFFF] font-bold text-lg whitespace-nowrap">
              Uni2hand
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="flex bg-[#FFFFFF] rounded-lg overflow-hidden shadow-sm">
              {/* Category Dropdown */}
              <div className="relative w-1/4 border-r border-gray-200">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-11 px-3 py-2 text-sm font-medium text-[#191C1F] bg-[#FFFFFF] focus:outline-none appearance-none cursor-pointer"
                  aria-label="Danh mục sản phẩm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#77878F] pointer-events-none"
                />
              </div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="flex-1 px-4 py-2 text-[#191C1F] placeholder-[#77878F] focus:outline-none text-sm"
                aria-label="Tìm kiếm sản phẩm"
              />

              {/* Search Icon */}
              <button
                className="px-4 hover:bg-gray-50 transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search size={18} className="text-[#77878F]" />
              </button>
            </div>
          </div>

          {/* Action Icons Group */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              className="hover:opacity-80 transition-opacity"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={20} className="text-[#FFFFFF]" />
            </button>
            <button
              className="hover:opacity-80 transition-opacity"
              aria-label="Thông báo"
            >
              <Bell size={20} className="text-[#FFFFFF]" />
            </button>
            <button
              className="hover:opacity-80 transition-opacity"
              aria-label="Tin nhắn"
            >
              <MessageCircle size={20} className="text-[#FFFFFF]" />
            </button>
            <button
              className="hover:opacity-80 transition-opacity"
              aria-label="Tài khoản"
            >
              <User size={20} className="text-[#FFFFFF]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
