'use client';

import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { Breadcrumbs } from '@/components/home/breadcrumbs';
import { ProfileSidebar } from '@/components/profile/profile-sidebar';
import { ProfileHeader } from '@/components/profile/profile-header';
import { BasicInfoForm } from '@/components/profile/basic-info-form';
import { PasswordForm } from '@/components/profile/password-form';
import { StudentVerificationZone } from '@/components/profile/student-verification-zone';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F5]">
      <Navbar />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Hồ sơ cá nhân' },
        ]}
      />

      {/* Main Content */}
      <div className="flex flex-1 max-w-full">
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

      <Footer />
    </div>
  );
}
