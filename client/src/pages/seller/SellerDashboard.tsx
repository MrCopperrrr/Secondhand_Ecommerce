import React from 'react';
import { Package, MessageSquare, ListTodo, TrendingUp, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';

const SellerDashboard: React.FC = () => {
  const stats = [
    { label: 'Doanh thu hôm nay', value: '1.250.000đ', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Đơn hàng mới', value: '3', icon: Package, color: 'text-orange-500' },
    { label: 'Việc cần làm', value: '2', icon: ListTodo, color: 'text-purple-600' },
    { label: 'Tin nhắn mới', value: '5', icon: MessageSquare, color: 'text-green-600' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Kênh Người Bán', href: '/seller/dashboard' },
          { label: 'Tổng quan' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="seller-dashboard" />

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-[#191C1F]">Kênh Người Bán - Tổng quan</h1>
              <Link 
                to="/sell" 
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1E40AF] text-white font-bold text-sm hover:bg-blue-800 transition-all shadow-sm"
              >
                <PlusCircle size={20} /> ĐĂNG SẢN PHẨM MỚI
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white border border-[#C9CFD2] p-6 shadow-sm hover:border-[#1E40AF] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gray-50 rounded-lg ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#686868] uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-bold text-[#191C1F]">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Status Card */}
              <div className="bg-white border border-[#C9CFD2] p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#191C1F] mb-6 border-b border-gray-100 pb-3">Phân tích Sản phẩm</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#475156]">Sản phẩm đang hiển thị</span>
                    <span className="font-bold text-[#1E40AF]">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#475156]">Sản phẩm hết hàng</span>
                    <span className="font-bold text-[#1E40AF]">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#475156]">Lượt xem sản phẩm (7 ngày)</span>
                    <span className="font-bold text-[#2DB224]">248</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#475156]">Lượt thích sản phẩm (7 ngày)</span>
                    <span className="font-bold text-orange-500">42</span>
                  </div>
                </div>
                <Link to="/profile/products" className="block mt-8 text-center text-sm font-bold text-[#1E40AF] hover:underline uppercase">
                  Xem chi tiết kho hàng
                </Link>
              </div>

              {/* Notice Card */}
              <div className="bg-white border border-[#C9CFD2] p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#191C1F] mb-6 border-b border-gray-100 pb-3">Thông báo quan trọng</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500">
                        <p className="text-sm text-blue-900 font-medium">Bán hàng ngay hôm nay!</p>
                        <p className="text-xs text-blue-700 mt-1">Đừng quên cập nhật tình trạng sản phẩm thường xuyên.</p>
                    </div>
                    <div className="p-3 bg-orange-50 border-l-4 border-orange-500">
                        <p className="text-sm text-orange-900 font-medium">2 tin nhắn mới từ khách hàng</p>
                        <p className="text-xs text-orange-700 mt-1">Vui lòng phản hồi sớm để tăng độ tin cậy.</p>
                    </div>
                    <div className="p-3 bg-gray-50 border-l-4 border-gray-400 opacity-60">
                        <p className="text-sm text-gray-700 font-medium">Lịch sử cập nhật hệ thống</p>
                        <p className="text-xs text-gray-500 mt-1">Hệ thống vừa cập nhật chức năng quản lý Campus.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
