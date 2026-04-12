import React, { useEffect, useState } from 'react';
import { transactionService } from '../../services/transaction.services';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProfileSidebar } from '../../components/profile/profile-sidebar';
import { Receipt, Calendar, ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const response: any = await transactionService.getHistory();
            if (response.data?.result) {
                setTransactions(response.data.result);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-roboto">
                <div className="w-12 h-12 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-4 text-[#191C1F] font-medium italic">Đang tải lịch sử giao dịch...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white font-roboto">
            <Breadcrumbs
                items={[
                    { label: 'Trang chủ', href: '/' },
                    { label: 'Tài khoản' },
                    { label: 'Lịch sử giao dịch' },
                ]}
            />

            <div className="flex flex-1 w-full max-w-7xl mx-auto">
                <ProfileSidebar activeTab="transactions" />

                <main className="flex-1 p-8">
                    <div className="max-w-4xl space-y-8 pb-12">
                        {/* Header */}
                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <h2 className="text-2xl font-bold text-[#191C1F] mb-1">Lịch sử giao dịch</h2>
                                <p className="text-sm text-[#686868]">Xem lại tất cả dòng tiền và thanh toán của bạn</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-[#1E40AF]">
                                <Receipt size={24} />
                            </div>
                        </div>

                        {/* Transactions List */}
                        {transactions.length === 0 ? (
                            <div className="text-center py-24 bg-gray-50 border-2 border-dashed border-gray-200">
                                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-500">Chưa có giao dịch phát sinh</h3>
                                <p className="text-sm text-gray-400 mt-2">Các thanh toán VNPAY hoặc COD sẽ được ghi nhận tại đây.</p>
                            </div>
                        ) : (
                            <div className="border border-gray-100 overflow-hidden shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Giao dịch</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Phương thức</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Số tiền</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {transactions.map((tx) => (
                                            <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 flex items-center justify-center ${
                                                            tx.type === 'PAYMENT' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                                        }`}>
                                                            {tx.type === 'PAYMENT' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-[#191C1F] uppercase tracking-tighter leading-tight">
                                                                {tx.type === 'PAYMENT' ? (
                                                                    tx.products && tx.products.length > 0 ? (
                                                                        tx.products.map((p: any, idx: number) => (
                                                                            <div key={idx} className="mb-0.5">{p.name}</div>
                                                                        ))
                                                                    ) : 'Thanh toán đơn hàng'
                                                                ) : 'Nhận tiền bán hàng'}
                                                            </div>
                                                            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1 font-medium italic">
                                                                <Calendar size={12} /> {new Date(tx.created_at).toLocaleString('vi-VN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-2.5 py-1">
                                                        {tx.payment_method}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <p className={`text-sm font-black ${
                                                        tx.type === 'PAYMENT' ? 'text-red-600' : 'text-[#1E40AF]'
                                                    }`}>
                                                        {tx.type === 'PAYMENT' ? '-' : '+'}{tx.amount.toLocaleString('vi-VN')} đ
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 ${
                                                        tx.status === 'SUCCESS' ? 'bg-green-100 text-[#2DB224]' : 
                                                        tx.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        {/* Security Note */}
                        <div className="p-6 bg-blue-50/50 border border-blue-100 flex items-start gap-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-[#1E40AF] mt-1 shrink-0">
                                <Receipt size={16} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-[#1E40AF] uppercase tracking-widest">Lưu ý bảo mật</p>
                                <p className="text-xs text-[#475156] leading-relaxed">
                                    Lịch sử giao dịch này ghi lại tất cả các hoạt động tài chính liên quan đến ví và tài khoản của bạn. 
                                    Nếu phát hiện bất kỳ giao dịch bất thường nào, vui lòng liên hệ bộ phận hỗ trợ Uni2hand ngay lập tức.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TransactionHistory;
