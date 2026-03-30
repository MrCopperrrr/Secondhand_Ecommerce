import React from 'react';
import { Circle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#092131] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Branding Block */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Circle size={24} className="text-[#57B7F5]" fill="#57B7F5" />
              <span className="text-xl font-bold text-white">Uni2hand</span>
            </div>
            <p className="font-semibold text-white mb-2 text-sm">
              University Second Hand Marketplace
            </p>
            <p className="text-[#C1C1C1] text-xs mb-4">
              Chợ đồ cũ dành cho sinh viên
            </p>
            <p className="text-[#C1C1C1] text-xs">
              © 2024 Uni2hand. All rights reserved.
            </p>
          </div>

          {/* Column 2: Danh mục */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Danh mục</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Sách & Giáo trình</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Quần áo & Giày dép</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Điện tử & Phụ kiện</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Nội thất & Ký túc xá</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Khác</a></li>
            </ul>
          </div>

          {/* Column 3: Cộng đồng */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Cộng đồng</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Diễn đàn thảo luận</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Sự kiện & Workshop</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Hỗ trợ cộng đồng</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Tin tức</a></li>
            </ul>
          </div>

          {/* Column 4: Thông tin */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Thông tin</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Về chúng tôi</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Cách mua bán</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Giao hàng & Hoàn trả</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Điều khoản dịch vụ</a></li>
            </ul>
          </div>

          {/* Column 5: Hướng dẫn */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Hướng dẫn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Hướng dẫn đăng tin</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Mẹo bán hàng</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Thanh toán an toàn</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Xử lý tranh chấp</a></li>
              <li><a href="#" className="text-[#C1C1C1] hover:text-white transition-colors text-sm">Liên hệ hỗ trợ</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#C1C1C1] border-opacity-30 my-8"></div>

        {/* Bottom Legal Bar */}
        <div className="flex justify-center items-center gap-6">
          <a href="#" className="text-white hover:text-[#57B7F5] transition-colors text-sm">Privacy</a>
          <a href="#" className="text-white hover:text-[#57B7F5] transition-colors text-sm">Terms</a>
          <a href="#" className="text-white hover:text-[#57B7F5] transition-colors text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
