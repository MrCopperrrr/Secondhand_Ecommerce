import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center font-roboto">
      <div className="w-24 h-24 bg-[#FFF5F5] rounded-full flex items-center justify-center mb-8">
        <AlertCircle size={48} className="text-[#EE1919]" />
      </div>
      
      <h1 className="text-4xl font-bold text-[#191C1F] mb-4">Lỗi hệ thống</h1>
      <p className="text-9xl font-black text-[#EE1919] opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">500</p>
      
      <p className="text-[#5F6C72] max-w-md mb-10 text-lg leading-relaxed z-10">
        Rất tiếc! Đã có lỗi xảy ra trên hệ thống của chúng tôi. 
        Chúng tôi đang nỗ lực khắc phục sự cố này. Vui lòng thử lại sau.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#EE1919] text-white font-bold rounded-none hover:bg-red-700 transition-all shadow-md"
        >
          <RefreshCw size={20} />
          <span>Thử lại ngay</span>
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#F2F4F5] text-[#191C1F] font-bold rounded-none hover:bg-gray-200 transition-all border border-gray-200"
        >
          <Home size={20} />
          <span>Về trang chủ</span>
        </button>
      </div>

      <div className="mt-16 p-8 bg-[#F2F4F5] border border-gray-200 w-full max-w-4xl text-left">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-white rounded-full">
            <AlertCircle size={24} className="text-[#EE1919]" />
          </div>
          <div>
            <h3 className="font-bold text-[#191C1F] mb-1">Chi tiết lỗi</h3>
            <p className="text-sm text-[#5F6C72] mb-4">Mã lỗi: INTERNAL_SERVER_ERROR_500</p>
            <p className="text-sm text-[#5F6C72]">
              Hệ thống đã ghi nhận lỗi này và gửi báo cáo cho đội ngũ kỹ thuật. 
              Bạn có thể thử xóa cache trình duyệt hoặc liên hệ với chúng tôi nếu tình trạng này kéo dài.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
