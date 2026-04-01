import React from 'react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { ProfileHeader } from '../../components/profile/profile-header';
import { BasicInfoForm } from '../../components/profile/basic-info-form';
import { PasswordForm } from '../../components/profile/password-form';
import { StudentVerificationZone } from '../../components/profile/student-verification-zone';

const UserProfile: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'hồ sơ cá nhân' },
        ]}
      />

      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="profile" />

        {/* Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Profile Header */}
            <ProfileHeader name="Nguyễn Văn A" isVerified={true} />

            {/* Basic Info Form */}
            <BasicInfoForm />

            {/* Password Form */}
            <PasswordForm />

            {/* Student Verification Zone */}
            <StudentVerificationZone />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
