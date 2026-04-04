import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Bell,
  MessageCircle,
  User,
  Search,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  X,
  PlusCircle,
  Laptop,
  Book,
  Home,
  PenTool,
  Shirt,
  Armchair,
  Bike,
  Trophy,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { authService } from '../../services/auth.services';
import { categoryServices } from '../../services/category.services';

const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [megaMenuData, setMegaMenuData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [activeCat, setActiveCat] = useState(0);

  const [userMode, setUserMode] = useState<'buyer' | 'seller'>('buyer');

  const iconMap: { [key: string]: any } = {
    'Đồ điện tử': Laptop,
    'Sách giáo trình': Book,
    'Đồ gia dụng': Home,
    'Dụng cụ học tập': PenTool,
    'Quần áo': Shirt,
    'Đồ nội thất': Armchair,
    'Phương tiện di chuyển': Bike,
    'Dụng cụ thể thao': Trophy,
    'Mỹ phẩm & Chăm sóc': Sparkles,
    'khác': MoreHorizontal,
  };

  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const [cats, subs] = await Promise.all([
          categoryServices.getCategories(),
          categoryServices.getSubCategories()
        ]);

        if (cats && cats.length > 0) {
          const structuredData = cats.map((cat: any) => ({
            id: cat._id,
            name: cat.name,
            icon: iconMap[cat.name] || PlusCircle,
            subs: subs
              .filter((sub: any) => sub.parent_id === cat._id)
              .map((sub: any) => ({ id: sub._id, name: sub.name }))
          }));
          setMegaMenuData(structuredData);
          setCategories(cats);
        }
      } catch (error) {
        console.error('Error loading mega menu data:', error);
      }
    };
    loadCategories();
  }, []);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleCategoryClick = (catId: string, subId?: string) => {
    const params = new URLSearchParams();
    if (catId) params.append('category', catId);
    if (subId) params.append('subcategory', subId);
    navigate(`/?${params.toString()}`);
    setIsMegaMenuOpen(false); // Force close on click
  };

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
    <nav className="sticky top-0 z-50 shadow-lg font-roboto">
      {/* Top Utility Bar */}
      <div className="bg-[#45a2e5] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-[#FFFFFF] text-[12px] font-medium">
          <div className="flex items-center gap-4">
            <Link to="/help" className="hover:opacity-80 transition-opacity">Trung tâm hỗ trợ</Link>
            <div className="w-px h-3 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <span>Kết nối:</span>
              <div className="flex items-center gap-2.5">
                {/* Facebook SVG */}
                <svg className="w-4 h-4 fill-white cursor-pointer hover:scale-110 hover:opacity-80 transition-all shadow-sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 19">
                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v10h3.142V9h2.795l.425-3H5.142l.006-1.558a.952.952 0 0 1 .987-1.442Z" clipRule="evenodd"/>
                </svg>
                {/* Instagram SVG */}
                <svg className="w-4 h-4 fill-white cursor-pointer hover:scale-110 hover:opacity-80 transition-all shadow-sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.058 1.066.048 1.79.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.637.417 1.361.465 2.427.048 1.066.058 1.405.058 4.122s-.01 3.056-.058 4.122c-.048 1.066-.218 1.79-.465 2.427a4.88 4.88 0 0 1-1.153 1.772 4.88 4.88 0 0 1-1.772 1.153c-.637.247-1.361.417-2.427.465-1.066.048-1.405.058-4.122.058s-3.056-.01-4.122-.058c-1.066-.048-1.79-.218-2.427-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.247-.637-.417-1.361-.465-2.427C2.01 15.056 2 14.717 2 12s.01-3.056.058-4.122c.048-1.066.218-1.79.465-2.427a4.917 4.917 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.523c.637-.247 1.361-.417 2.427-.465C8.944 2.01 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" clipRule="evenodd"/>
                </svg>
                {/* Twitter SVG */}
                <svg className="w-4 h-4 fill-white cursor-pointer hover:scale-110 hover:opacity-80 transition-all shadow-sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M13.682 10.62 20.239 3h-1.554l-5.693 6.618L8.441 3H3.2l6.876 10.007L3.2 21h1.554l6.012-6.989L15.368 21h5.241l-6.927-10.38ZM11.557 13.06l-.697-.997L5.32 4.14h2.387l4.463 6.387.697.997 5.823 8.331h-2.387l-4.746-6.795Z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/notifications" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Bell size={14} /> Thông báo
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <span>VI</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#57B7F5]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center bg-white/10">
                <div className="w-4 h-4 rounded-full border border-[#FFFFFF]"></div>
              </div>
              <span className="text-[#FFFFFF] font-bold text-2xl tracking-tight whitespace-nowrap">Uni2hand</span>
            </Link>
          </div>

          {/* Search Bar & Channel Toggle Area */}
          <div className="flex-1 max-w-3xl flex items-center gap-4">
            {/* Professional Channel Toggle - Commented out as requested */}
            {/* 
            <div className="bg-white/20 p-1 rounded-full flex items-center relative min-w-[260px] h-12 border border-white/30">
              <div 
                className={`absolute h-10 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
                  userMode === 'buyer' ? 'w-[126px] left-1' : 'w-[126px] left-[128px]'
                }`}
              />
              <button 
                onClick={() => {
                   setUserMode('buyer');
                   navigate('/');
                }}
                className={`flex-1 text-center relative z-10 text-[13px] font-extrabold transition-colors duration-300 ${
                  userMode === 'buyer' ? 'text-[#1E40AF]' : 'text-white'
                }`}
              >
                NGƯỜI MUA
              </button>
              <button 
                onClick={() => {
                   setUserMode('seller');
                   navigate('/seller/dashboard');
                }}
                className={`flex-1 text-center relative z-10 text-[13px] font-extrabold transition-colors duration-300 ${
                  userMode === 'seller' ? 'text-[#1E40AF]' : 'text-white'
                }`}
              >
                NGƯỜI BÁN
              </button>
            </div>
            */}

            {/* Replacement: Single Management Button - Rectangular, Dark Blue */}
            <Link 
              to="/seller/dashboard" 
              className="h-9 px-6 bg-[#1E40AF] hover:bg-blue-900 text-white font-extrabold text-[13px] transition-all flex items-center gap-2 rounded-sm border border-[#1E40AF] whitespace-nowrap active:scale-95 shadow-lg"
            >
              <TrendingUp size={18} /> QUẢN LÝ SẢN PHẨM
            </Link>

            <div className="flex-1 flex bg-white rounded-sm overflow-hidden border border-white shadow-sm">
              <input
                type="text"
                placeholder={userMode === 'buyer' ? "Tìm sản phẩm, thương hiệu..." : "Tìm đơn hàng, khách hàng..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 text-[#191C1F] placeholder-[#77878F] focus:outline-none text-sm bg-white"
              />

              <button 
                onClick={handleSearch}
                className="px-6 bg-[#1E40AF] text-white hover:bg-blue-900 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            <Link to="/cart" className="hover:scale-110 transition-transform relative p-2">
              <ShoppingCart size={24} className="text-[#FFFFFF]" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#EE1919] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#57B7F5]">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-white/10 p-1.5 pr-3 rounded-sm transition-all outline-none">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={20} className="text-[#FFFFFF]" />
                  </div>
                  <ChevronDown size={16} className="text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-gray-100 shadow-2xl mt-2 p-0 rounded-none z-[60]">
                {localStorage.getItem('userInfo') ? (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-3.5 px-5 focus:bg-gray-50 outline-none rounded-none border-b border-gray-50">
                      <Link to="/profile" className="flex items-center gap-3 text-sm font-semibold text-[#191C1F]">
                        <User size={18} className="text-gray-400" />
                        Tài khoản của tôi
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer py-3.5 px-5 focus:bg-gray-50 outline-none rounded-none border-b border-gray-50">
                      <Link to="/seller/dashboard" className="flex items-center gap-3 text-sm font-semibold text-[#191C1F]">
                        <TrendingUp size={18} className="text-blue-500" />
                        Kênh Người Bán
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                        authService.logout(userInfo.refresh_token).finally(() => {
                          localStorage.removeItem('userInfo');
                          window.location.href = '/login';
                        });
                      }}
                      className="cursor-pointer py-3.5 px-5 focus:bg-red-50 text-red-600 outline-none rounded-none flex items-center gap-3 text-sm font-bold"
                    >
                      <X size={18} />
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-4 px-6 focus:bg-gray-50 outline-none rounded-none border-b border-gray-50">
                      <Link to="/login" className="text-sm font-bold text-[#191C1F]">Đăng nhập</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer py-4 px-6 focus:bg-gray-50 outline-none rounded-none">
                      <Link to="/register" className="text-sm font-bold text-[#1E40AF]">Đăng ký</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">
          {/* Custom Mega Menu for "Danh mục sản phẩm" */}
          <div 
            className="group/category"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className="py-3 text-[13px] font-bold text-[#191C1F] hover:text-[#1E40AF] transition-colors whitespace-nowrap flex items-center gap-2 group">
              <X size={18} className={`${isMegaMenuOpen ? 'block' : 'hidden'}`} />
              <div className={`flex flex-col gap-0.5 text-[#1E40AF] ${isMegaMenuOpen ? 'hidden' : 'flex'}`}>
                <div className="w-4 h-0.5 bg-current"></div>
                <div className="w-4 h-0.5 bg-current"></div>
                <div className="w-4 h-0.5 bg-current"></div>
              </div>
              DANH MỤC SẢN PHẨM
            </button>

            {/* Mega Menu Panel */}
            {megaMenuData.length > 0 && isMegaMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-white shadow-2xl border border-gray-100 flex z-[100] min-h-[500px]">
                {/* Sidebar Categories */}
                <div className="w-[280px] border-r border-gray-100 bg-gray-50/50 py-2 shrink-0">
                  {megaMenuData.map((cat, idx) => (
                    <div 
                      key={cat.id} 
                      onMouseEnter={() => setActiveCat(idx)}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`px-5 py-3 transition-all cursor-pointer flex items-center justify-between ${
                          activeCat === idx ? 'bg-white text-[#1E40AF]' : 'text-[#475156] hover:bg-white hover:text-[#1E40AF]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <cat.icon size={18} className={`${activeCat === idx ? 'text-[#1E40AF]' : 'text-[#77878F]'}`} />
                        <span className="text-[14px] font-medium uppercase">{cat.name}</span>
                      </div>
                      <ChevronRight size={14} className={`${activeCat === idx ? 'text-[#1E40AF]' : 'text-[#77878F]'}`} />
                    </div>
                  ))}
                </div>

                {/* Dynamic Content Panel */}
                {megaMenuData[activeCat] && (
                  <div className="flex-1 p-8 bg-white overflow-y-auto">
                    <div className="grid grid-cols-2 gap-16">
                        <div>
                            <h4 
                                onClick={() => handleCategoryClick(megaMenuData[activeCat].id)}
                                className="font-bold text-[#191C1F] mb-6 text-[16px] border-b pb-2 uppercase flex items-center gap-2 cursor-pointer hover:text-[#1E40AF]"
                            >
                               {megaMenuData[activeCat].name} nổi bật
                            </h4>
                            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                                {megaMenuData[activeCat].subs.map((sub: any) => (
                                    <li 
                                        key={sub.id} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCategoryClick(megaMenuData[activeCat].id, sub.id);
                                        }}
                                        className="text-[14px] text-[#475156] hover:text-[#1E40AF] transition-colors cursor-pointer font-medium"
                                    >
                                        {sub.name}
                                    </li>
                                ))}
                                {megaMenuData[activeCat].subs.length === 0 && (
                                    <li className="text-[14px] text-gray-400 italic">Chưa có danh mục con</li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#191C1F] mb-6 text-[16px] border-b pb-2 uppercase">Theo Campus</h4>
                            <ul className="grid grid-cols-1 gap-y-4 font-medium">
                                {['Cơ sở Lý Thường Kiệt', 'Ký túc xá Bách Khoa', 'Cơ sở Dĩ An'].map(campus => (
                                    <li key={campus} className="text-[14px] text-[#475156] hover:text-[#1E40AF] cursor-pointer">{campus}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Static Links (Now limited to first few items or fixed ones) */}
          {megaMenuData.slice(0, 8).map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="py-3 text-[13px] font-bold text-[#475156] hover:text-[#1E40AF] transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-[#1E40AF]"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
