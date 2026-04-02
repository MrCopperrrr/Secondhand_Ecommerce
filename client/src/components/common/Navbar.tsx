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
import { useCart } from '../../context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { authService } from '../../services/auth.services';

const Navbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();

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
    <nav className="sticky top-0 z-50 bg-[#57B7F5] shadow-lg font-roboto">
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
            <Link to="/cart" className="hover:opacity-80 transition-opacity relative">
              <ShoppingCart size={20} className="text-[#FFFFFF]" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#EE1919] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#57B7F5]">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/notifications" className="hover:opacity-80 transition-opacity">
              <Bell size={20} className="text-[#FFFFFF]" />
            </Link>
            <Link to="/chat" className="hover:opacity-80 transition-opacity">
              <MessageCircle size={20} className="text-[#FFFFFF]" />
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:opacity-80 transition-opacity outline-none p-1">
                  <User size={22} className="text-[#FFFFFF]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-white border-gray-200 shadow-xl mt-3 p-0 rounded-none z-[60]">
                {localStorage.getItem('userInfo') ? (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 px-5 focus:bg-gray-100 outline-none rounded-none">
                      <Link to="/profile" className="flex items-center gap-3 text-sm font-medium text-[#191C1F]">
                        <User size={18} />
                        Tài khoản của tôi
                      </Link>
                    </DropdownMenuItem>
                    <div className="border-t border-gray-100"></div>
                    <DropdownMenuItem 
                      onClick={() => {
                        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                        authService.logout(userInfo.refresh_token).finally(() => {
                          localStorage.removeItem('userInfo');
                          window.location.href = '/login';
                        });
                      }}
                      className="cursor-pointer py-3 px-5 focus:bg-red-50 text-red-600 outline-none rounded-none flex items-center gap-3 text-sm font-bold"
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 px-5 focus:bg-gray-100 outline-none rounded-none">
                      <Link to="/login" className="text-sm font-medium text-[#191C1F]">Đăng nhập</Link>
                    </DropdownMenuItem>
                    <div className="border-t border-gray-100"></div>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 px-5 focus:bg-gray-100 outline-none rounded-none">
                      <Link to="/register" className="text-sm font-medium text-[#191C1F]">Đăng ký</Link>
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
