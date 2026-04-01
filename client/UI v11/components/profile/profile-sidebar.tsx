'use client';

import { User, Lock, FileText, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';

interface ProfileSidebarProps {
  activeTab?: string;
}

export function ProfileSidebar({ activeTab = 'profile' }: ProfileSidebarProps) {
  const menuItems = [
    {
      id: 'profile',
      label: 'Hồ sơ cá nhân',
      icon: User,
      href: '/profile',
    },
    {
      id: 'password',
      label: 'Quản lý mật khẩu',
      icon: Lock,
      href: '/profile/password',
    },
    {
      id: 'address',
      label: 'Địa chỉ & Thanh toán',
      icon: MapPin,
      href: '/profile/address',
    },
    {
      id: 'orders',
      label: 'Đơn hàng của tôi',
      icon: FileText,
      href: '/profile/orders',
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#C9CFD2]">
      <nav className="py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-[#1E40AF] text-white'
                  : 'text-[#191C1F] hover:bg-[#F2F4F5]'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <hr className="my-4 border-[#C9CFD2]" />

        <button className="w-full flex items-center gap-3 px-6 py-3 text-[#191C1F] hover:bg-[#F2F4F5] transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </nav>
    </aside>
  );
}
