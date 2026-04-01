import React from 'react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { ProfileHeader } from '../../components/profile/profile-header';
import { AddressManagement } from '../../components/profile/address-management';

const AddressPayment: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5] font-roboto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'địa chỉ & thanh toán' },
        ]}
      />

      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
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
    </div>
  );
};

export default AddressPayment;
