import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Bell,
  MessageCircle,
  User,
  Search,
  ChevronDown,
  Share2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isLoggedIn] = useState(false); // Giả lập trạng thái đăng nhập
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Tất cả',
    'Đồ điện tử',
    'Sách giáo trình',
    'Đồ gia dụng',
    'Dụng cụ học tập',
    'Quần áo',
    'Đồ nội thất',
    'Phương tiện di chuyển',
    'Dụng cụ thể thao',
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.append('q', searchQuery.trim());
    }
    
    if (selectedCategory !== 'Tất cả') {
      params.append('category', selectedCategory);
    }

    const queryString = params.toString();
    if (queryString) {
      navigate(`/${queryString ? '?' + queryString : ''}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="w-full bg-[#57B7F5]">
      {/* ... (Top Utility Bar remains same) */}
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
          <div className="flex-1 max-w-3xl px-4">
            <div className="flex bg-white rounded-none overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative w-1/4 border-r border-gray-200 bg-[#F2F4F5]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-11 px-3 py-2 text-sm font-medium text-[#191C1F] bg-[#F2F4F5] rounded-none focus:outline-none appearance-none cursor-pointer"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 text-[#191C1F] placeholder-[#77878F] focus:outline-none text-sm bg-white rounded-none"
              />

              <button 
                onClick={handleSearch}
                className="px-4 hover:bg-gray-50 transition-colors bg-white rounded-none"
              >
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:opacity-80 transition-opacity outline-none">
                  <User size={20} className="text-[#FFFFFF]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-gray-200 shadow-lg mt-2 p-0">
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 px-4 focus:bg-gray-100 outline-none">
                      <Link to="/login">Đăng nhập</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 px-4 focus:bg-gray-100 outline-none border-t border-gray-100">
                      <Link to="/register">Đăng ký</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 px-4 focus:bg-gray-100 outline-none">
                      <Link to="/profile">Hồ sơ của tôi</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer py-3 px-4 focus:bg-gray-100 outline-none border-t border-gray-100 text-red-600">
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
