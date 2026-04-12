import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Shop Pages
import Homepage from './pages/shop/Homepage';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import CheckoutSuccess from './pages/shop/CheckoutSuccess';

// Other Modules
import CreateProduct from './pages/seller/CreateProduct';
import Chat from './pages/communication/Chat';
import UserProfile from './pages/profile/UserProfile';
import AddressPayment from './pages/profile/AddressPayment';
import Logout from './pages/profile/Logout';
import ProductManagement from './pages/profile/ProductManagement';
import MyOrders from './pages/profile/MyOrders';
import MySales from './pages/profile/MySales';
import TransactionHistory from './pages/profile/TransactionHistory';
import SellerDashboard from './pages/seller/SellerDashboard';

// Error Pages
import NotFound from './pages/error/NotFound';
import ServerError from './pages/error/ServerError';

const AppContent: React.FC = () => {
  const location = useLocation();
  const authPaths = ['/login', '/register', '/forgot-password'];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <div className="app-container flex flex-col min-h-screen bg-white font-roboto">
      {!isAuthPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/sell" element={<CreateProduct />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/address" element={<AddressPayment />} />
          <Route path="/profile/password" element={<UserProfile />} />
          <Route path="/profile/products" element={<ProductManagement />} />
          <Route path="/profile/orders" element={<MyOrders />} />
          <Route path="/profile/sales" element={<MySales />} />
          <Route path="/profile/transactions" element={<TransactionHistory />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* Error Routes */}
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LocationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </LocationProvider>
    </Router>
  );
}

export default App;
