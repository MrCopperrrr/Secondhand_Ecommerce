'use client';

import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Breadcrumbs } from '@/components/home/breadcrumbs';
import { ProfileSidebar } from '@/components/profile/profile-sidebar';
import { ProfileHeader } from '@/components/profile/profile-header';
import { AddressManagement } from '@/components/profile/address-management';

export default function AddressPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
      <Navbar />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Hồ sơ cá nhân', href: '/profile' },
          { label: 'Địa chỉ & Thanh toán' },
        ]}
      />

      {/* Main Content */}
      <div className="flex flex-1 max-w-full">
        <ProfileSidebar activeTab="address" />

        {/* Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Profile Header */}
            <ProfileHeader name="Nguyễn Văn A" isVerified={true} />

            {/* Address Management */}
            <AddressManagement />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
