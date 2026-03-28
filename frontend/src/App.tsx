import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col font-sans">
            <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            </Routes>
          </div>
          
          {/* Footer */}
          <footer className="bg-[#172337] text-white pt-8 md:pt-16 pb-6 md:pb-8 mt-auto">
            <div className="max-w-[1400px] mx-auto px-3 md:px-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-12 text-[12px] md:text-[13px]">
              <div className="flex flex-col gap-2 md:gap-3">
                <h4 className="text-gray-500 font-bold uppercase mb-1 md:mb-2 tracking-wider text-[10px] md:text-[12px]">About</h4>
                <a href="#" className="hover:underline">Contact Us</a>
                <a href="#" className="hover:underline">About Us</a>
                <a href="#" className="hover:underline">Careers</a>
                <a href="#" className="hover:underline">Flipkart Stories</a>
                <a href="#" className="hover:underline">Press</a>
                <a href="#" className="hover:underline">Corporate Information</a>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h4 className="text-gray-500 font-bold uppercase mb-1 md:mb-2 tracking-wider text-[10px] md:text-[12px]">Group Companies</h4>
                <a href="#" className="hover:underline">Myntra</a>
                <a href="#" className="hover:underline">Cleartrip</a>
                <a href="#" className="hover:underline">Shopsy</a>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h4 className="text-gray-500 font-bold uppercase mb-1 md:mb-2 tracking-wider text-[10px] md:text-[12px]">Help</h4>
                <a href="#" className="hover:underline">Payments</a>
                <a href="#" className="hover:underline">Shipping</a>
                <a href="#" className="hover:underline">Cancellation & Returns</a>
                <a href="#" className="hover:underline">FAQ</a>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h4 className="text-gray-500 font-bold uppercase mb-1 md:mb-2 tracking-wider text-[10px] md:text-[12px]">Consumer Policy</h4>
                <a href="#" className="hover:underline">Cancellation & Returns</a>
                <a href="#" className="hover:underline">Terms Of Use</a>
                <a href="#" className="hover:underline">Security</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Sitemap</a>
                <a href="#" className="hover:underline">Grievance Redressal</a>
                <a href="#" className="hover:underline">EPR Compliance</a>
              </div>
              <div className="flex flex-col gap-2 md:gap-3 border-l border-gray-700 pl-6 md:pl-8 hidden lg:flex">
                <h4 className="text-gray-500 font-bold uppercase mb-1 md:mb-2 tracking-wider text-[10px] md:text-[12px]">Mail Us:</h4>
                <p className="leading-relaxed">Flipkart Internet Private Limited,</p>
                <p className="leading-relaxed">Buildings Alyssa, Begonia &</p>
                <p className="leading-relaxed">Clove Embassy Tech Village,</p>
                <p className="leading-relaxed">Outer Ring Road, Devarabeesanahalli Village,</p>
                <p className="leading-relaxed">Bengaluru, 560103,</p>
                <p className="leading-relaxed">Karnataka, India</p>
                <div className="mt-4">
                  <h4 className="text-gray-500 font-bold uppercase mb-2 tracking-wider">Social:</h4>
                  <div className="flex gap-4 mt-2">
                     <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">f</div>
                     <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">X</div>
                     <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">y</div>
                     <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">i</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3 border-l border-gray-700 pl-6 md:pl-8 hidden lg:flex">
                <h4 className="text-gray-500 font-bold uppercase mb-1 md:mb-2 tracking-wider text-[10px] md:text-[12px]">Registered Office Address:</h4>
                <p className="leading-relaxed">Flipkart Internet Private Limited,</p>
                <p className="leading-relaxed">Buildings Alyssa, Begonia &</p>
                <p className="leading-relaxed">Clove Embassy Tech Village,</p>
                <p className="leading-relaxed">Outer Ring Road, Devarabeesanahalli Village,</p>
                <p className="leading-relaxed">Bengaluru, 560103,</p>
                <p className="leading-relaxed">Karnataka, India</p>
                <p className="leading-relaxed">CIN : U51109KA2012PTC066107</p>
                <p className="leading-relaxed">Telephone: <span className="text-[#2874f0]">044-45614700</span> / <span className="text-[#2874f0]">044-67415800</span></p>
              </div>
            </div>
            
            {/* Social Icons - Mobile Only */}
            <div className="lg:hidden max-w-[1400px] mx-auto px-3 mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-gray-500 font-bold uppercase mb-3 tracking-wider text-[10px]">Follow Us:</h4>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-[11px]">f</div>
                <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-[11px]">X</div>
                <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-[11px]">y</div>
                <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-[11px]">i</div>
              </div>
            </div>
            
            <div className="max-w-[1400px] mx-auto px-3 md:px-4 mt-8 md:mt-16 pt-6 md:pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[11px] md:text-[13px]">
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <span className="flex items-center gap-1.5 md:gap-2 font-bold"><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/sell_61288e.svg" alt="" className="w-3 md:w-4" /> Become a Seller</span>
                <span className="flex items-center gap-1.5 md:gap-2 font-bold"><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/advertise_866647.svg" alt="" className="w-3 md:w-4" /> Advertise</span>
                <span className="flex items-center gap-1.5 md:gap-2 font-bold"><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/gift-cards_0be13d.svg" alt="" className="w-3 md:w-4" /> Gift Cards</span>
                <span className="flex items-center gap-1.5 md:gap-2 font-bold"><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/help_633910.svg" alt="" className="w-3 md:w-4" /> Help Center</span>
              </div>
              <p className="font-medium">© 2007-2026 Flipkart.com</p>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7bc.svg" alt="payments" className="h-3 md:h-4" />
            </div>
          </footer>
        </div>
        </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
