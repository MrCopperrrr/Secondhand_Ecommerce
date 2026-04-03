import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { authService } from '../../services/auth.services';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Đăng xuất' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="logout" />

        <main className="flex-1 p-8">
          <div className="max-w-2xl px-4 ">
            <h1 className="text-2xl font-bold text-[#191C1F] mb-8">
              Đăng xuất khỏi tài khoản
            </h1>
            
            <p className="text-base text-[#475156] mb-8">
              Bạn có chắc chắn muốn đăng xuất không?
            </p>

            <button
              onClick={handleLogout}
              className="px-10 py-3.5 bg-[#1E40AF] text-white text-[14px] font-bold uppercase tracking-wider hover:bg-blue-800 transition-all rounded-none cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Logout;
