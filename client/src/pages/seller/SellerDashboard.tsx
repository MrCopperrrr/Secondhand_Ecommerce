import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { productService } from '../../services/product.services';
import { authService } from '../../services/auth.services';

const SellerDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    soldOutProducts: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Get current user profile for ID
        const profileRes = await authService.getMe();
        const userId = profileRes.data.result._id;

        // 2. Get all products and filter by seller_id
        const productRes = await productService.getAllProducts();
        const allProducts = productRes.data.result;
        const myProducts = allProducts.filter((p: any) => p.seller_id === userId);

        // 3. Calculate stats
        // status: 0 is SoldOut/Sold, status: 1 is Active
        const soldProducts = myProducts.filter((p: any) => p.status === 0);
        const activeProductsCount = myProducts.filter((p: any) => p.status === 1).length;
        const soldOutProductsCount = soldProducts.length;
        const revenue = soldProducts.reduce((sum: number, p: any) => sum + (p.price || 0), 0);

        setData({
          totalRevenue: revenue,
          totalOrders: soldOutProductsCount,
          activeProducts: activeProductsCount,
          soldOutProducts: soldOutProductsCount
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Tổng doanh thu', value: new Intl.NumberFormat('vi-VN').format(data.totalRevenue) + 'đ', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Tổng đơn hàng', value: data.totalOrders.toString(), icon: Package, color: 'text-orange-500' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1E40AF] animate-spin" />
        <p className="mt-4 text-[#686868] italic">Đang tải dữ liệu tổng quan...</p>
      </div>
    );
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
              <div className="bg-white border border-[#C9CFD2] p-8 shadow-sm h-full">
                <h3 className="text-lg font-bold text-[#191C1F] mb-6 border-b border-gray-100 pb-3">Phân tích Sản phẩm</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#475156]">Sản phẩm đang hiển thị</span>
                    <span className="font-bold text-[#1E40AF] text-lg">{data.activeProducts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#475156]">Sản phẩm hết hàng</span>
                    <span className="font-bold text-[#1E40AF] text-lg">{data.soldOutProducts}</span>
                  </div>
                </div>
                <Link to="/profile/products" className="block mt-8 text-center text-sm font-bold text-[#1E40AF] hover:underline uppercase">
                  Xem chi tiết kho hàng
                </Link>
              </div>

              {/* Notice Card */}
              <div className="bg-white border border-[#C9CFD2] p-8 shadow-sm h-full">
                <h3 className="text-lg font-bold text-[#191C1F] mb-6 border-b border-gray-100 pb-3">Thông báo quan trọng</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500">
                        <p className="text-sm text-blue-900 font-medium">Bán hàng ngay hôm nay!</p>
                        <p className="text-xs text-blue-700 mt-1">Đừng quên cập nhật tình trạng sản phẩm thường xuyên.</p>
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
