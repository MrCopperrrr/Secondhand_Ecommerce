import React from 'react';
import { Link } from 'react-router-dom';

interface ProfileSidebarProps {
  activeTab?: string;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab = 'profile' }) => {
  const sections: MenuSection[] = [
    {
      title: 'TÀI KHOẢN',
      items: [
        { id: 'profile', label: 'Hồ sơ cá nhân', href: '/profile' },
        { id: 'address', label: 'Địa chỉ & Thanh toán', href: '/profile/address' },
      ]
    },
    {
      title: 'KÊNH NGƯỜI MUA',
      items: [
        { id: 'track-order', label: 'Theo dõi đơn hàng', href: '/profile/track-order' },
        { id: 'favorites', label: 'Sản phẩm yêu thích', href: '/profile/favorites' },
        { id: 'history', label: 'Lịch sử giao dịch', href: '/profile/history' },
      ]
    },
    {
      title: 'KÊNH NGƯỜI BÁN',
      items: [
        { id: 'seller-dashboard', label: 'Tổng quan (Dashboard)', href: '/seller/dashboard' },
        { id: 'sell', label: 'Đăng bán sản phẩm', href: '/sell' },
        { id: 'products', label: 'Quản lý sản phẩm', href: '/profile/products' },
        { id: 'orders-received', label: 'Đơn hàng đã nhận', href: '/seller/orders' },
      ]
    },
    {
        title: 'HỆ THỐNG',
        items: [
          { id: 'logout', label: 'Đăng xuất', href: '/logout' },
        ]
      }
  ];

  return (
    <div className="w-80 px-4 py-8 sticky top-24 self-start font-roboto">
      <div className="flex flex-col gap-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white border border-[#C9CFD2] p-0 shadow-sm rounded-none overflow-hidden">
            <div className="bg-[#F3F4F6] px-6 py-2 border-b border-[#C9CFD2]">
              <span className="text-[12px] font-bold text-[#1E40AF] tracking-wider uppercase">
                {section.title}
              </span>
            </div>
            <nav className="flex flex-col">
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`w-full px-6 py-4 text-[15px] transition-all border-l-4 ${
                      isActive
                        ? 'bg-[#1E40AF] text-[#FFFFFF] font-medium border-l-[#000000]'
                        : 'bg-[#FFFFFF] text-[#475156] hover:bg-gray-50 border-l-transparent'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
};
