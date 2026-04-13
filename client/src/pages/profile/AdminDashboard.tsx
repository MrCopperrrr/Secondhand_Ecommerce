import React, { useState, useEffect } from 'react';
import { adminServices } from '../../services/admin.services';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight,
  Calendar,
  Loader2,
  Clock
} from 'lucide-react';
import Breadcrumbs from '../../components/shop/Breadcrumbs';

const AdminDashboard: React.FC = () => {
    // Default to today's date in YYYY-MM-DD format
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async (date: string) => {
        try {
            setLoading(true);
            const response = await adminServices.getStats(date);
            setStats(response.data.result);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu quản trị:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats(selectedDate);
    }, [selectedDate]);

    const formatVND = (value: number) => {
        return (value || 0).toLocaleString('vi-VN');
    };

    const formatDateVN = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    if (loading && !stats) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Breadcrumbs
                    items={[
                    { label: 'Trang chủ', href: '/' },
                    { label: 'Tài khoản' },
                    { label: 'Kênh Quản trị' },
                    ]}
                />
                <div className="flex flex-1 w-full max-w-7xl mx-auto font-roboto">
                    <ProfileSidebar activeTab="admin" />
                    <main className="flex-1 p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 className="w-10 h-10 text-[#1E40AF] animate-spin mb-4" />
                        <p className="text-gray-500 italic">Đang phân tích dữ liệu hệ thống...</p>
                    </main>
                </div>
            </div>
        );
    }

    const mainStatCards = [
        { 
            label: 'Tổng lợi nhuận (All-time)', 
            value: `${formatVND(stats?.total_profit)} VND`, 
            icon: DollarSign, 
            color: 'bg-emerald-500', 
            desc: 'Tổng phí sàn tích lũy' 
        },
        { 
            label: 'Tổng giá trị giao dịch', 
            value: `${formatVND(stats?.total_sales)} VND`, 
            icon: TrendingUp, 
            color: 'bg-[#1E40AF]', 
            desc: 'Tổng giá trị hàng đã bán ra' 
        },
    ];

    const dailyStatCards = [
        { 
            label: `Lợi nhuận ngày ${formatDateVN(selectedDate)}`, 
            value: `${formatVND(stats?.daily_profit)} VND`, 
            icon: Clock, 
            color: 'bg-emerald-600', 
            desc: `Phí sàn riêng ngày chọn` 
        },
        { 
            label: `Giá trị giao dịch ngày ${formatDateVN(selectedDate)}`, 
            value: `${formatVND(stats?.daily_sales)} VND`, 
            icon: Calendar, 
            color: 'bg-blue-600', 
            desc: `Doanh số riêng ngày chọn` 
        },
    ];

    const otherStatCards = [
        { 
            label: 'Người dùng hệ thống', 
            value: stats?.total_users, 
            icon: Users, 
            color: 'bg-orange-500', 
            desc: 'Số lượng tài khoản đã đăng ký' 
        },
        { 
            label: 'Sản phẩm đang bán', 
            value: stats?.total_products, 
            icon: Package, 
            color: 'bg-purple-500', 
            desc: 'Tổng số lượng tin đăng trên sàn' 
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white font-roboto">
            <Breadcrumbs
                items={[
                { label: 'Trang chủ', href: '/' },
                { label: 'Tài khoản' },
                { label: 'Kênh Quản trị' },
                ]}
            />

            <div className="flex flex-1 w-full max-w-7xl mx-auto">
                <ProfileSidebar activeTab="admin" />
                
                <main className="flex-1 p-8">
                    <div className="max-w-5xl">
                        <div className="mb-10 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black text-[#191C1F] flex items-center gap-2">
                                    Thống kê hệ thống
                                </h1>
                                <p className="text-gray-500 text-sm mt-1 italic">Theo dõi hiệu suất kinh doanh và quản lý tổng thể sàn.</p>
                            </div>
                            
                            {/* Interactive Date Picker */}
                            <div className="flex flex-col items-end gap-2 group">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover:text-[#1E40AF]">
                                    <Clock size={12} />
                                    Chọn ngày xem báo cáo
                                </label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="appearance-none bg-[#F8FAFC] border border-gray-200 px-4 py-2 text-sm font-bold text-[#1E40AF] focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-blue-100 transition-all cursor-pointer hover:bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {loading && stats && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-100">
                                <div className="h-full bg-[#1E40AF] animate-progress w-full origin-left"></div>
                            </div>
                        )}

                        {/* Stats Grid - Main All-time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            {mainStatCards.map((card, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-6 flex items-start gap-5 hover:shadow-xl transition-all duration-300 group relative">
                                    <div className={`p-4 ${card.color} text-white shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                                        <card.icon size={24} />
                                    </div>
                                    <div className="flex-1 relative z-10">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
                                        <h3 className="text-xl font-black text-[#191C1F] mb-1">{card.value}</h3>
                                        <p className="text-[11px] text-gray-400 italic font-medium">{card.desc}</p>
                                    </div>
                                    <ArrowUpRight className="text-gray-200 group-hover:text-[#1E40AF] transition-colors relative z-10" size={20} />
                                </div>
                            ))}
                        </div>

                        {/* Stats Grid - Daily Selected Date */}
                        <div className="mb-8">
                            <h2 className="text-xs font-black text-[#1E40AF] mb-4 flex items-center gap-2 uppercase tracking-widest px-1">
                                {/* <Calendar size={14} />
                                Báo cáo chi tiết ngày {formatDateVN(selectedDate)} */}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dailyStatCards.map((card, idx) => (
                                    <div key={idx} className="bg-white border border-gray-100 p-6 flex items-start gap-5 hover:shadow-xl transition-all duration-300 group shadow-sm">
                                        <div className={`p-4 ${card.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                            <card.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{card.label}</p>
                                            <h3 className="text-xl font-black text-[#191C1F] mb-1">{card.value}</h3>
                                            <p className="text-[11px] text-gray-400 italic font-medium">{card.desc}</p>
                                        </div>
                                        {loading ? (
                                            <Loader2 size={16} className="text-blue-400 animate-spin" />
                                        ) : (
                                            <ArrowUpRight className="text-gray-200 group-hover:text-[#1E40AF] transition-colors" size={20} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Stats Grid - Infrastructure */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {otherStatCards.map((card, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-6 flex items-start gap-5 hover:shadow-xl transition-all duration-300 group shadow-sm relative">
                                    <div className={`p-4 ${card.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        <card.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{card.label}</p>
                                        <h3 className="text-xl font-black text-[#191C1F] mb-1">{card.value}</h3>
                                        <p className="text-[11px] text-gray-400 italic font-medium">{card.desc}</p>
                                    </div>
                                    <ArrowUpRight className="text-gray-200 group-hover:text-[#1E40AF] transition-colors" size={20} />
                                </div>
                            ))}
                        </div>

                        {/* Summary Table or Secondary Stats */}
                             <div className="absolute top-0 left-0 w-full h-[3px] bg-gray-50 group-hover:bg-[#1E40AF] transition-colors"></div>
                            <div>
                                <h1 className="text-2xl font-black text-[#191C1F] flex items-center gap-2">
                                    Hiệu suất đơn hàng
                                </h1>
                                <p className="text-gray-500 text-sm mt-1 italic mb-8">Theo dõi hiệu suất đơn hàng.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                <div className="text-center p-6 bg-gray-50 border border-dashed border-gray-200 hover:border-[#1E40AF] transition-all hover:bg-white">
                                    <p className="text-2xl font-black text-[#1E40AF]">{stats?.total_orders}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase mt-2">Tổng đơn hàng</p>
                                </div>
                                <div className="text-center p-6 bg-emerald-50 border border-dashed border-emerald-200 hover:border-emerald-500 transition-all hover:bg-white">
                                    <p className="text-2xl font-black text-emerald-600">{stats?.successful_orders_count}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase mt-2">Đơn thành công</p>
                                </div>
                                <div className="text-center p-6 bg-orange-50 border border-dashed border-orange-200 hover:border-orange-500 transition-all hover:bg-white">
                                    <p className="text-2xl font-black text-orange-600">
                                        {stats?.total_orders > 0 
                                            ? ((stats?.successful_orders_count / stats?.total_orders) * 100).toFixed(1) 
                                            : '0.0'}%
                                    </p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase mt-2">Tỷ lệ hoàn tất</p>
                                </div>
                            </div>
                        

                        <div className="mt-8 p-6 bg-[#1e40af05] border border-dashed border-[#1E40AF]/20 rounded-sm">
                            <p className="text-sm text-[#1E40AF]/70 leading-relaxed italic">
                                <span className="font-bold underline">Cơ chế báo cáo:</span> Dữ liệu ngày được tính dựa trên các đơn hàng được cập nhật trạng thái <span className="font-bold text-[#1E40AF]">"Đã hoàn thành"</span> trong đúng khoảng thời gian của ngày được chọn.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            
            <style>{`
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(0.5); }
                    100% { transform: scaleX(1); }
                }
                .animate-progress {
                    animation: progress 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
