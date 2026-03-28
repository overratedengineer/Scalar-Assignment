import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu, MapPin, Plane, Sparkles, X, Package, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingPath, setPendingPath] = useState('');
  const { summary } = useCart() || { summary: { itemCount: 0 } };
  const { user, logout, defaultLogin } = useAuth();
  const navigate = useNavigate();

  const handleRestrictedClick = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setPendingPath(path);
      setShowLoginPrompt(true);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <>
      <header className="bg-[#2874f0] sticky top-0 z-50 shadow-md">
        <div className="max-w-[1248px] mx-auto px-3 md:px-4 flex items-center justify-between h-14 gap-2 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo Section */}
          <div className="flex flex-col items-start shrink-0">
            <Link to="/" className="flex flex-col items-start">
              <img 
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" 
                alt="Flipkart" 
                className="h-5 italic" 
              />
              <div className="flex items-center gap-0.5 -mt-0.5">
                <span className="text-[11px] font-medium italic text-white opacity-90">Explore</span>
                <span className="text-[11px] font-bold italic text-[#ffe500]">Plus</span>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="h-2.5" />
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[600px] relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full bg-white text-black pl-4 pr-12 py-2 rounded-sm focus:outline-none text-[14px] shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2874f0]">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden text-white p-1 ml-auto"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Navigation Section */}
          <nav className="flex items-center gap-3 md:gap-8 text-white font-bold text-[15px]">
            <div className="group relative hidden md:block">
              {user ? (
                <>
                  <button className="flex items-center gap-1 text-white font-bold hover:text-gray-100">
                    <span>{user.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block w-64">
                    <div className="bg-white rounded-sm shadow-2xl border border-gray-100 text-gray-800 py-2">
                      <div className="hover:bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                        <span className="font-bold">My Profile</span>
                      </div>
                      <div className="hover:bg-gray-50 px-4 py-3 flex items-center gap-4 cursor-pointer" onClick={() => navigate('/orders')}>
                        <ShoppingCart size={18} className="text-[#2874f0]" />
                        <span>Orders</span>
                      </div>
                      <div className="hover:bg-gray-50 px-4 py-3 flex items-center gap-4 cursor-pointer" onClick={logout}>
                        <User size={18} className="text-[#2874f0]" />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/login')} className="bg-white text-[#2874f0] px-4 lg:px-6 py-1 rounded-sm hover:bg-gray-100 transition-colors text-sm lg:text-[15px]">
                      Login
                    </button>
                    <button onClick={defaultLogin} className="bg-[#FFE500] text-black px-2 lg:px-4 py-1 rounded-sm hover:bg-[#FFD700] transition-colors text-sm lg:text-[12px] shadow-sm font-bold">
                      Auto Login
                    </button>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block w-64">
                    <div className="bg-white rounded-sm shadow-2xl border border-gray-100 text-gray-800 py-2">
                      <div className="px-4 py-3 border-b flex justify-between items-center">
                        <span className="font-bold">New Customer?</span>
                        <Link to="/signup" className="text-[#2874f0] cursor-pointer">Sign Up</Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link to="/" className="hover:text-gray-100 hidden lg:block">
              Become a Seller
            </Link>

            <div className="group relative hidden lg:block">
              <button className="flex items-center gap-1 hover:text-gray-100 py-4 -my-4">
                <span>More</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full -left-4 pt-2 hidden group-hover:block w-48">
                <div className="bg-white rounded-sm shadow-2xl border border-gray-100 text-gray-800 py-2">
                  <Link 
                    to={user ? "/wishlist" : "#"} 
                    onClick={(e) => handleRestrictedClick(e, '/wishlist')} 
                    className="hover:bg-gray-50 px-4 py-3 flex items-center gap-3 font-medium transition-colors"
                  >
                    <Heart size={16} className="text-[#2874f0]" />
                    <span>Wishlist</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link to={user ? "/orders" : "#"} onClick={(e) => handleRestrictedClick(e, '/orders')} className="hidden lg:flex items-center gap-1 md:gap-2 hover:text-gray-100 relative">
              <Package size={20} />
              <span>Orders</span>
            </Link>

            <Link to={user ? "/cart" : "#"} onClick={(e) => handleRestrictedClick(e, '/cart')} className="flex items-center gap-1 md:gap-2 hover:text-gray-100 relative">
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {summary.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 sm:-right-2 bg-[#ff6161] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center border border-[#2874f0] font-bold">
                  {summary.itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {mobileSearchOpen && (
          <div className="md:hidden px-3 pb-3 bg-[#2874f0]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full bg-white text-black pl-4 pr-12 py-2.5 rounded-sm focus:outline-none text-[14px] shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2874f0]">
                <Search size={20} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        )}

        {/* Sub-header (Location & Travel) */}
        <div className="bg-white border-b border-gray-200 hidden md:block">
          <div className="max-w-[1248px] mx-auto px-4 h-10 flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin size={14} className="text-gray-400" />
                <span>Deliver to <span className="font-bold text-gray-900">Mumbai 400001</span></span>
                <ChevronDown size={12} className="text-gray-400" />
              </div>
              <div className="h-4 w-[1px] bg-gray-300"></div>
              <button className="flex items-center gap-2 font-bold text-gray-700 hover:text-[#2874f0]">
                <Plane size={16} className="text-[#fb641b]" />
                Travel
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <span>Offer Zone</span>
              <span>Gift Cards</span>
              <span>Help Center</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-white mobile-menu-enter flex flex-col">
            <div className="bg-[#2874f0] p-5 flex items-center justify-between text-white">
              <div>
                <p className="font-bold text-lg">Hello, {user ? user.name : 'User'}</p>
                <p className="text-sm opacity-80">Welcome to Flipkart</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <Link
                to="/"
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} className="text-[#2874f0]" />
                My Profile
              </Link>
              <Link
                to={user ? "/cart" : "#"}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={(e) => {
                  if (!user) {
                    handleRestrictedClick(e, '/cart');
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <ShoppingCart size={18} className="text-[#2874f0]" />
                My Cart
                {summary.itemCount > 0 && (
                  <span className="ml-auto bg-[#ff6161] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {summary.itemCount}
                  </span>
                )}
              </Link>
              <Link
                to={user ? "/wishlist" : "#"}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={(e) => {
                  if (!user) {
                    handleRestrictedClick(e, '/wishlist');
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <Heart size={18} className="text-[#2874f0]" />
                My Wishlist
              </Link>
              <Link
                to={user ? "/orders" : "#"}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={(e) => {
                  if (!user) {
                    handleRestrictedClick(e, '/orders');
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <Package size={18} className="text-[#2874f0]" />
                My Orders
              </Link>
              <Link
                to="/"
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={18} className="text-[#2874f0]" />
                Flipkart Plus Zone
              </Link>
              <div className="border-t border-gray-100 my-2" />
              <div className="px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Categories</div>
              {['Mobiles', 'Electronics', 'Fashion', 'Home & Furniture', 'Appliances', 'Beauty, Toys & More'].map(cat => (
                <Link
                  key={cat}
                  to={`/?category=${cat}`}
                  className="block px-5 py-3 hover:bg-gray-50 text-gray-700 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2" />
              <div className="flex items-center gap-2 px-5 py-3 text-gray-600 text-sm">
                <MapPin size={14} className="text-gray-400" />
                <span>Deliver to <span className="font-bold text-gray-900">Mumbai 400001</span></span>
              </div>
              <button className="flex items-center gap-3 px-5 py-3 text-gray-700 text-sm font-medium">
                <Plane size={16} className="text-[#fb641b]" />
                Travel
              </button>
            </div>
            <div className="p-4 border-t bg-gray-50">
              {user ? (
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full bg-[#2874f0] text-white py-2.5 rounded-sm font-bold text-sm">
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full bg-white border border-gray-300 text-gray-800 py-2.5 rounded-sm font-bold text-sm">
                    Login / Sign Up
                  </button>
                  <button onClick={() => { defaultLogin(); setMobileMenuOpen(false); }} className="w-full bg-[#2874f0] text-white py-2.5 rounded-sm font-bold text-sm">
                    Default Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="bg-[#2874f0] p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Login Required</h3>
              <button onClick={() => setShowLoginPrompt(false)}><X size={20} /></button>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-700 mb-6 font-medium">Please login to access this feature. Would you like to use the Default Login?</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={async () => {
                    await defaultLogin();
                    setShowLoginPrompt(false);
                    navigate(pendingPath);
                  }}
                  className="bg-[#2874f0] hover:bg-blue-600 text-white font-bold py-2.5 rounded-sm w-full transition-colors shadow-sm"
                >
                  Use Default Login
                </button>
                <button 
                  onClick={() => {
                    setShowLoginPrompt(false);
                    navigate('/login');
                  }}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2.5 rounded-sm border border-gray-200 w-full transition-colors"
                >
                  Normal Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
