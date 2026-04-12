import React, { useEffect, useState } from 'react';
import { categoryServices } from '../../services/category.services';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const treeData = await categoryServices.getCategoryTree();
        if (treeData && treeData.length > 0) {
          setCategories(treeData);
        }
      } catch (error) {
        console.error('Error fetching categories for footer:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#092131] text-white font-roboto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Column 1: Branding Block - 4 on left */}
          <div className="col-span-1 md:col-span-4">
            <div className="mb-4">
              <img src="/LOGOlongboldwhite.png" alt="Uni2hand Logo" className="h-12 w-auto" />
            </div>
            <p className="font-semibold text-white mb-2 text-sm uppercase tracking-wide">
              University Second Hand Marketplace
            </p>
            <p className="text-[#9ea3ae] text-[13px] mb-6 leading-relaxed">
              Nền tảng mua bán đồ cũ hàng đầu dành cộng đồng sinh viên.
            </p>
            <p className="text-[#64748b] text-xs font-medium">
              © 2026 Uni2Hand. All rights reserved.
            </p>
          </div>

          {/* Link Area - 8 on right */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:pl-20">
            {/* Column 2: Danh mục - Wider col */}
            <div className="md:col-span-2">
              <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest text-[#57B7F5]">Danh mục</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link to={`/?category=${cat._id}`} className="text-[#9ea3ae] hover:text-white transition-colors text-sm">
                      {cat.name}
                    </Link>
                  </li>
                ))}
                {categories.length === 0 && (
                  <>
                    <li className="text-[#9ea3ae] text-sm italic">Đang tải danh mục...</li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 4: Thông tin */}
            <div>
              <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest text-[#57B7F5]">Thông tin</h3>
              <ul className="space-y-3 font-medium">
                <li><Link to="/about" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Về chúng tôi</Link></li>
                <li><Link to="/how-it-works" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Cách mua bán</Link></li>
                <li><Link to="/shipping" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Giao hàng & Hoàn trả</Link></li>
                <li><Link to="/privacy" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Chính sách bảo mật</Link></li>
                <li><Link to="/terms" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Điều khoản dịch vụ</Link></li>
              </ul>
            </div>

            {/* Column 5: Hướng dẫn */}
            <div>
              <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest text-[#57B7F5]">Hướng dẫn</h3>
              <ul className="space-y-3 font-medium">
                <li><Link to="/guide" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Hướng dẫn đăng tin</Link></li>
                <li><Link to="/tips" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Mẹo bán hàng</Link></li>
                <li><Link to="/payment" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Thanh toán an toàn</Link></li>
                <li><Link to="/dispute" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Xử lý tranh chấp</Link></li>
                <li><Link to="/contact" className="text-[#9ea3ae] hover:text-white transition-colors text-sm">Liên hệ hỗ trợ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#C1C1C1] border-opacity-30 my-8"></div>

        {/* Bottom Legal Bar */}
        <div className="flex justify-center items-center gap-6">
          <Link to="/privacy" className="text-white hover:text-[#57B7F5] transition-colors text-sm font-bold">Privacy</Link>
          <Link to="/terms" className="text-white hover:text-[#57B7F5] transition-colors text-sm font-bold">Terms</Link>
          <Link to="/contact" className="text-white hover:text-[#57B7F5] transition-colors text-sm font-bold">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
