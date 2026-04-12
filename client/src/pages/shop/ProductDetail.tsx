import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProductGallery } from '../../components/shop/product-detail/product-gallery';
import { ProductTitle } from '../../components/shop/product-detail/product-title';
import { ProductPricing } from '../../components/shop/product-detail/product-pricing';
import { ProductMeta } from '../../components/shop/product-detail/product-meta';
import { SellerCard } from '../../components/shop/product-detail/seller-card';
import { ProductDescription } from '../../components/shop/product-detail/product-description';
import { AddToCartModal } from '../../components/shop/product-detail/add-to-cart-modal';

import { useCart } from '../../context/CartContext';
import { productService } from '../../services/product.services';
import { Loader2, MapPin } from 'lucide-react';
import { useLocationContext, calculateDistance } from '../../context/LocationContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userLocation, provinces } = useLocationContext();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [otherProductsCount, setOtherProductsCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        const p = response.data.result;
        
        // Province and Campus from address of seller
        const provinceName = p.seller?.address?.city || p.province || '';
        const campusName = p.seller?.address?.campus || p.campus || 'Chưa cập nhật';
        
        let realProximity = 'Không rõ';
        if (userLocation && provinces.length > 0) {
           const pData = provinces.find((prov: any) => prov.name === provinceName);
           if (pData) {
             const cData = pData.campus_data?.find((c: any) => c.name === campusName) || { lat: pData.lat, lng: pData.lng };
             if (cData && cData.lat !== undefined) {
               const dist = calculateDistance(userLocation.lat, userLocation.lng, cData.lat, cData.lng);
               realProximity = dist < 1 ? '< 1 km' : `${Math.round(dist)} km`;
             }
           }
        }

        setProduct({
            ...p,
            product_id: p._id,
            category: p.category?.name && p.subCategory?.name 
                ? `${p.category.name} / ${p.subCategory.name}` 
                : (p.category?.name || 'Sách giáo trình / Sách Đại cương'),
            condition: p.condition < 100 ? 'Đã qua sử dụng' : 'Mới 100%',
            statusLabel: p.status === 1 ? 'Còn hàng' : 'Hết hàng',
            campus: campusName,
            proximity: realProximity
        });

        // Fetch other products to count for this seller
        if (p.seller_id) {
          const allResponse = await productService.getAllProducts();
          const allProducts = allResponse.data.result;
          const count = allProducts.filter((item: any) => item.seller_id === p.seller_id).length;
          setOtherProductsCount(count);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsModalOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1E40AF] animate-spin" />
        <p className="mt-4 text-[#686868] italic">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h2>
        <button onClick={() => navigate('/')} className="bg-[#1E40AF] text-white px-6 py-2">
          Quay về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-roboto">
      <Breadcrumbs
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: product.category, href: `/?category=${encodeURIComponent(product.category)}` },
          { label: 'Chi tiết sản phẩm' },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Two Column Layout (1:1 approximately) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Gallery */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Right: Product Details Stack */}
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              <ProductTitle title={product.name} />

              <ProductMeta
                productId={product.product_id}
                category={product.category}
                status={product.statusLabel as any}
                condition={product.condition}
                location={product.campus}
                proximity={product.proximity}
              />

              <ProductPricing
                price={product.price}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isDisabled={JSON.parse(localStorage.getItem('user') || '{}')._id === product.seller_id}
              />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <SellerCard
                sellerName={product.seller?.username || 'Lê Diệu Quỳnh'}
                sellerAvatar={product.seller?.avatar || ''}
                rating={product.seller?.rating || 5}
                isOnline={product.seller?.isOnline || true}
                otherProductsCount={otherProductsCount}
              />
            </div>
          </div>
        </div>

        {/* Full Width Description Section */}
        <ProductDescription description={product.description} />
      </main>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productImage={product.images[0]}
      />
    </div>
  );
}

export default ProductDetail;
