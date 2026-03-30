import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Bell,
  MessageCircle,
  User,
  Search,
  ChevronDown,
  // Twitter,
  // Facebook,
  Share2,
  // Youtube,
  // Instagram,
} from 'lucide-react';

const Navbar: React.FC = () => {
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
          <div className="text-[#FFFFFF] text-sm font-medium">
            Chào mừng đến với Uni2hand
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button className="hover:opacity-80 transition-opacity" aria-label="Pinterest">
                <Share2 size={16} className="text-[#FFFFFF]" />
              </button>
            </div>

            <div className="w-px h-4 bg-white/30"></div>

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
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#FFFFFF]"></div>
              </div>
              <span className="text-[#FFFFFF] font-bold text-lg whitespace-nowrap">Uni2hand</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="flex bg-white rounded-none overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative w-1/4 border-r border-gray-200">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-11 px-3 py-2 text-sm font-medium text-[#191C1F] bg-white rounded-none focus:outline-none appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#77878F] pointer-events-none" />
              </div>

              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="flex-1 px-4 py-2 text-[#191C1F] placeholder-[#77878F] focus:outline-none text-sm bg-white rounded-none"
              />

              <button className="px-4 hover:bg-gray-50 transition-colors bg-white rounded-none">
                <Search size={18} className="text-[#77878F]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/cart" className="hover:opacity-80 transition-opacity">
              <ShoppingCart size={20} className="text-[#FFFFFF]" />
            </Link>
            <Link to="/notifications" className="hover:opacity-80 transition-opacity">
              <Bell size={20} className="text-[#FFFFFF]" />
            </Link>
            <Link to="/chat" className="hover:opacity-80 transition-opacity">
              <MessageCircle size={20} className="text-[#FFFFFF]" />
            </Link>
            <Link to="/profile" className="hover:opacity-80 transition-opacity">
              <User size={20} className="text-[#FFFFFF]" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
