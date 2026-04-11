import React, { useEffect, useState } from 'react';
import { orderServices } from '../../services/order.services';
import OrderStatusTimeline from '../../components/shop/order/OrderStatusTimeline';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { ShoppingBag, ChevronRight, Package, Calendar, Tag, CreditCard } from 'lucide-react';

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user._id) {
        const response: any = await orderServices.getMyPurchases(user._id);
        if (response.data?.result) {
          setOrders(response.data.result);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirmReceived = async (orderId: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (window.confirm('Bạn xác nhận đã nhận được hàng và hài lòng với sản phẩm?')) {
      try {
        await orderServices.updateOrderStatus(orderId, 'Completed', user._id);
        fetchOrders(); // Refresh
      } catch (error) {
        alert('Có lỗi xảy ra khi cập nhật đơn hàng.');
      }
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-[#191C1F] font-medium italic">Đang tải lịch sử mua hàng...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài khoản' },
          { label: 'Đơn mua của tôi' },
        ]}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <ProfileSidebar activeTab="orders" />

        <main className="flex-1 p-8">
            <div className="max-w-4xl space-y-8 pb-12">
                <div className="flex items-center justify-between mt-2">
                    <div>
                        <h2 className="text-2xl font-bold text-[#191C1F] mb-1">Đơn mua của tôi</h2>
                        <p className="text-sm text-[#686868]">Theo dõi trạng thái và lịch sử mua sắm của bạn</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-none text-[#1E40AF]">
                        <ShoppingBag size={24} />
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-none border-2 border-dashed border-gray-200">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-500">Bạn chưa có đơn hàng nào</h3>
                    <p className="text-sm text-gray-400 mt-2">Hãy khám phá các sản phẩm thú vị và bắt đầu mua sắm ngay!</p>
                    <a href="/" className="inline-block mt-6 px-8 py-3 bg-[#1E40AF] text-white rounded-none font-bold">
                        Tiếp tục mua sắm
                    </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        {/* Top info bar */}
                        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Tag size={14} className="text-gray-400" />
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã đơn: {order._id.slice(-8)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-xs font-medium text-gray-500">{new Date(order.created_at).toLocaleDateString('vi-VN')}</span>
                            </div>
                            </div>
                            <div className="flex items-center gap-2">
                            <CreditCard size={14} className="text-[#1E40AF]" />
                            <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-1 rounded-none bg-blue-100 text-[#1E40AF]`}>
                                {order.payment_method} - {order.payment_status}
                            </span>
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="px-8 border-b border-gray-50">
                            <OrderStatusTimeline currentStatus={order.status} />
                        </div>

                        {/* Product List */}
                        <div className="px-6 py-4 space-y-4">
                            {order.products?.map((p: any) => (
                            <div key={p._id} className="flex items-center gap-4">
                                <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded-none border border-gray-100" />
                                <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#191C1F]">{p.name}</h4>
                                <p className="text-xs text-[#686868] mt-1 font-medium">{p.price.toLocaleString('vi-VN')} đ</p>
                                </div>
                            </div>
                            ))}
                        </div>

                        {/* Footer / Actions */}
                        <div className="px-6 py-4 bg-white flex items-center justify-between border-t border-gray-50">
                            <div className="text-[#191C1F]">
                            <p className="text-xs text-gray-400 mb-1">Tổng cộng (Đã bao gồm phí và VAT):</p>
                            <p className="text-lg font-black text-[#1E40AF]">{order.total_amount.toLocaleString('vi-VN')} đ</p>
                            </div>
                            
                            {order.status === 'Shipping' && (
                            <button 
                                onClick={() => handleConfirmReceived(order._id)}
                                className="px-6 py-2 bg-[#1E40AF] text-white rounded-none font-bold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Đã nhận được hàng
                            </button>
                            )}

                            {order.status === 'Completed' && (
                            <button className="flex items-center gap-2 text-xs font-bold text-[#2DB224] bg-green-50 px-4 py-2 rounded-none">
                                Giao dịch hoàn tất <ChevronRight size={14} />
                            </button>
                            )}
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

export default MyOrders;
