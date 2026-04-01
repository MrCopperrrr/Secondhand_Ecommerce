import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/shop/Breadcrumbs';
import { ProductGallery } from '../../components/shop/product-detail/product-gallery';
import { ProductInfo } from '../../components/shop/product-detail/product-info';
import { ProductMeta } from '../../components/shop/product-detail/product-meta';
import { SellerCard } from '../../components/shop/product-detail/seller-card';
import { ProductDescription } from '../../components/shop/product-detail/product-description';

import products from '../../data/products.json';
import { useCart } from '../../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find the product by product_id
  const product = products.find((p: any) => p.product_id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate('/checkout');
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center font-outfit">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm!</h1>
        <button 
           onClick={() => navigate('/')}
           className="bg-[#1E40AF] text-white px-6 py-2 font-bold"
        >
          QUAY VỀ TRANG CHỦ
        </button>
      </div>
    );
  }

  const statusLabel = product.status === 'Active' ? 'Còn hàng' : 'Hết hàng';

  return (
    <div className="flex flex-col min-h-screen bg-white font-outfit">
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
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">
              <ProductInfo
                title={product.name}
                price={product.price}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />

              <ProductMeta
                productId={product.product_id}
                category={product.category}
                status={statusLabel as any}
                condition={product.condition}
                location={product.campus}
                proximity={product.proximity || '<1km'}
              />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <SellerCard
                sellerName={product.seller?.name || 'Người bán'}
                sellerAvatar={product.seller?.avatar || 'https://via.placeholder.com/100'}
                rating={product.seller?.rating || 5}
                isOnline={product.seller?.isOnline || true}
                otherProductsCount={5}
              />
            </div>
          </div>
        </div>

        {/* Full Width Description Section */}
        <ProductDescription description={product.description} />
      </main>
    </div>
  );
}

export default ProductDetail;
