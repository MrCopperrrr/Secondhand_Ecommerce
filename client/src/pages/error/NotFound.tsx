import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center font-roboto">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-[#57B7F5] opacity-20 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold text-[#191C1F]">Trang không tìm thấy</p>
        </div>
      </div>
      
      <p className="text-[#5F6C72] max-w-md mb-10 text-lg leading-relaxed">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. 
        Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#F2F4F5] text-[#191C1F] font-bold rounded-none hover:bg-gray-200 transition-all border border-gray-200"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#57B7F5] text-white font-bold rounded-none hover:bg-[#46a2db] transition-all shadow-md"
        >
          <Home size={20} />
          <span>Về trang chủ</span>
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-left">
        <div className="p-6 bg-white border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#191C1F] mb-2 text-lg">Bạn bị lạc?</h3>
          <p className="text-sm text-[#5F6C72]">Hãy thử sử dụng thanh tìm kiếm ở đầu trang để tìm sản phẩm bạn cần.</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#191C1F] mb-2 text-lg">Cần trợ giúp?</h3>
          <p className="text-sm text-[#5F6C72]">Liên hệ với đội ngũ hỗ trợ của chúng tôi nếu bạn nghĩ đây là một lỗi kỹ thuật.</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#191C1F] mb-2 text-lg">Khám phá</h3>
          <p className="text-sm text-[#5F6C72]">Xem các sản phẩm mới nhất đang được đăng bán trên Uni2hand.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
