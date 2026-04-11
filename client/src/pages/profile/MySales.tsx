import React, { useEffect, useState } from 'react';
import { orderServices } from '../../services/order.services';
import OrderStatusTimeline from '../../components/shop/order/OrderStatusTimeline';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { BarChart3, ChevronRight, Package, User, MapPin, Phone } from 'lucide-react';

const MySales: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user._id) {
        const response: any = await orderServices.getMySales(user._id);
        if (response.data?.result) {
          setOrders(response.data.result);
        }
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (window.confirm(`Xác nhận chuyển trạng thái sang "${status}"?`)) {
      try {
        await orderServices.updateOrderStatus(orderId, status, user._id);
        fetchOrders();
      } catch (error) {
        alert('Cập nhật thất bại.');
      }
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-[#191C1F] font-medium italic">Đang tải danh sách đơn bán...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Quản lý đơn bán hàng' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="sales" />
        
        <main className="flex-1 p-8">
            <div className="max-w-4xl space-y-8 pb-12">
                <div className="flex items-center justify-between mt-2">
                    <div>
                        <h2 className="text-2xl font-bold text-[#191C1F] mb-1">Quản lý đơn bán hàng</h2>
                        <p className="text-sm text-[#686868]">Theo dõi và cập nhật trạng thái các món đồ bạn đã bán</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-none text-[#1E40AF]">
                        <BarChart3 size={24} />
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="empty-state text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-none">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Chưa có đơn hàng nào</p>
                    <p className="text-gray-300 text-sm mt-1">Đơn hàng của khách sẽ xuất hiện tại đây</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden hover:shadow-md transition-all">
                        {/* Order Info Bar */}
                        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-6">
                            <div className="text-xs font-bold text-gray-400">#{order._id.slice(-8)}</div>
                            <div className="text-xs font-medium text-gray-500">{new Date(order.created_at).toLocaleDateString('vi-VN')}</div>
                            </div>
                            <div className={`px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider ${
                                order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                                order.status === 'Shipping' ? 'bg-blue-100 text-blue-600' :
                                order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                'bg-gray-100 text-gray-600'
                            }`}>
                                {order.status}
                            </div>
                        </div>

                        {/* Shipping Details */}
                        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-none bg-blue-50 flex items-center justify-center text-[#1E40AF]">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Người mua:</p>
                                    <p className="text-sm font-bold text-[#191C1F]">{order.shipping_details.fullName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-none bg-green-50 flex items-center justify-center text-[#2DB224]">
                                    <MapPin size={18} />
                                </div>
                                <div className="max-w-[200px]">
                                    <p className="text-xs text-gray-400">Địa chỉ giao:</p>
                                    <p className="text-sm font-medium text-[#191C1F] truncate">{order.shipping_details.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-none bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">SĐT khách:</p>
                                    <p className="text-sm font-bold text-[#191C1F]">{order.shipping_details.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="px-6 py-4 space-y-4 bg-white">
                            {order.products.map((p: any) => (
                            <div key={p._id} className="flex items-center gap-4">
                                <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded-none border border-gray-50 shadow-sm" />
                                <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#191C1F]">{p.name}</h4>
                                <p className="text-xs text-[#1E40AF] font-black uppercase tracking-widest">{p.price.toLocaleString('vi-VN')} đ</p>
                                </div>
                            </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                            <div className="text-[11px] font-bold text-gray-400 tracking-wider">
                            THANH TOÁN: {order.payment_method?.toUpperCase()} - {order.payment_status}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {order.status === 'Pending' && (
                                    <>
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id, 'Cancelled')}
                                            className="px-4 py-2 border border-red-200 text-red-500 rounded-none text-xs font-bold hover:bg-red-50 transition-colors"
                                        >
                                            Hủy đơn
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id, 'Shipping')}
                                            className="px-6 py-2 bg-[#1E40AF] text-white rounded-none text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            Xác nhận và Giao hàng
                                        </button>
                                    </>
                                )}
                                
                                {order.status === 'Shipping' && (
                                    <div className="px-6 py-2 bg-blue-50 text-[#1E40AF] rounded-none text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                    ⏳ Chờ khách xác nhận đã nhận hàng
                                    </div>
                                )}

                                {order.status === 'Completed' && (
                                    <div className="px-6 py-2 bg-green-50 text-[#2DB224] rounded-none text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                                        Thành công <ChevronRight size={14} />
                                    </div>
                                )}
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default MySales;
