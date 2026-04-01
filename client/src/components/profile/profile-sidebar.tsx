import React from 'react';
import { Link } from 'react-router-dom';

interface ProfileSidebarProps {
  activeTab?: string;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab = 'profile' }) => {
  const menuItems = [
    {
      id: 'profile',
      label: 'Hồ sơ cá nhân',
      href: '/profile',
    },
    {
      id: 'address',
      label: 'Địa chỉ & Thanh toán',
      href: '/profile/address',
    },
    {
      id: 'sell',
      label: 'Đăng bán sản phẩm',
      href: '/sell',
    },
    {
      id: 'products',
      label: 'Quản lý sản phẩm',
      href: '/profile/products',
    },
    {
      id: 'complaints',
      label: 'Khiếu nại & Hoàn trả',
      href: '/profile/complaints',
    },
    {
      id: 'reviews',
      label: 'Đánh giá',
      href: '/profile/reviews',
    },
    {
      id: 'track-order',
      label: 'Theo dõi đơn hàng',
      href: '/profile/track-order',
    },
    {
      id: 'history',
      label: 'Lịch sử giao dịch',
      href: '/profile/history',
    },
  ];

  return (
    <div className="w-80 px-4 py-8 sticky top-24 self-start font-roboto">
      <div className="bg-white border border-[#C9CFD2] p-0 shadow-sm rounded-none">
        <nav className="flex flex-col">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <Link
                key={item.id}
                to={item.href}
                className={`w-full px-6 py-4 text-[16px] transition-all border border-transparent ${
                  isActive
                    ? 'bg-[#1E40AF] text-[#FFFFFF] font-medium border-[#1E40AF]'
                    : 'bg-[#FFFFFF] text-[#686868] hover:bg-gray-50 border-[#FFFFFF]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button 
            className="w-full px-6 py-4 text-[16px] text-[#686868] hover:bg-gray-50 transition-all text-left bg-[#FFFFFF] border border-[#FFFFFF]"
          >
            Đăng xuất
          </button>
        </nav>
      </div>
    </div>
  );
};
