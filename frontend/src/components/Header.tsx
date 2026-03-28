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
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        {/* Row 1: Logo, Travel, Location, Coins */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1248px] mx-auto px-3 md:px-4 flex items-center justify-between h-[46px]">
            {/* Left: Logo + Travel */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700 p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>

              {/* Flipkart Logo Pill */}
              <Link to="/" className="flex items-center gap-1.5 bg-[#FFE500] hover:bg-[#ffd700] transition-colors rounded-full px-4 py-1.5">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/52/44/image/d2ecfddf891a3922.png?q=60"
                  alt="Flipkart"
                  className="h-[20px] object-contain"
                />
                <span className="text-[15px] font-bold text-[#2874f0]">Flipkart</span>
              </Link>

              {/* Travel Button */}
              <button className="hidden md:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-1.5">
                <Plane size={14} className="text-red-500" />
                <span className="text-[13px] font-medium text-gray-800">Travel</span>
              </button>
            </div>

            {/* Right: Location + Coins */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1 text-[13px] text-gray-600 cursor-pointer hover:text-[#2874f0]">
                <MapPin size={14} className="text-gray-400" />
                <span className="font-bold text-gray-900">140413</span>
                <span className="text-[#2874f0] font-medium">Select delivery location</span>
                <ChevronDown size={12} className="text-gray-400" />
              </div>
              <div className="flex items-center gap-1 text-[13px] text-gray-600">
                <span className="text-yellow-500">●</span>
                <span className="font-medium">125</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Search, User, More, Cart */}
        <div className="max-w-[1248px] mx-auto px-3 md:px-4 flex items-center justify-between h-[52px] gap-4 pb-1">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[680px] relative">
            <div className="w-full flex items-center border-2 border-[#2874f0] rounded-[8px] shadow-sm shadow-blue-100 transition-colors">
              <div className="pl-3 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                className="w-full bg-transparent text-gray-900 pl-3 pr-4 py-2 focus:outline-none text-[14px] placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden text-gray-700 p-1 ml-auto"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Right Nav Items */}
          <nav className="flex items-center gap-5 text-[14px] text-gray-700 font-medium">
            {/* User Dropdown */}
            <div className="group relative hidden md:block">
              {user ? (
                <>
                  <button className="flex items-center gap-1.5 text-gray-700 hover:text-[#2874f0]">
                    <User size={18} className="text-gray-500" />
                    <span>{user.name}</span>
                    <ChevronDown size={12} className="group-hover:rotate-180 transition-transform text-gray-400" />
                  </button>
                  <div className="absolute top-full right-0 pt-2 hidden group-hover:block w-56">
                    <div className="bg-white rounded-md shadow-xl border border-gray-100 text-gray-800 py-1">
                      <div className="hover:bg-gray-50 px-4 py-2.5 border-b font-semibold text-sm">
                        My Profile
                      </div>
                      <div className="hover:bg-gray-50 px-4 py-2.5 flex items-center gap-3 cursor-pointer text-sm" onClick={() => navigate('/orders')}>
                        <Package size={16} className="text-[#2874f0]" />
                        Orders
                      </div>
                      <div className="hover:bg-gray-50 px-4 py-2.5 flex items-center gap-3 cursor-pointer text-sm" onClick={logout}>
                        <User size={16} className="text-[#2874f0]" />
                        Logout
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/login')} className="text-[#2874f0] font-semibold hover:underline text-sm">
                      Login
                    </button>
                    <button onClick={defaultLogin} className="bg-[#FFE500] text-gray-900 px-3 py-1 rounded-full hover:bg-[#FFD700] transition-colors text-[11px] font-bold">
                      Auto Login
                    </button>
                  </div>
                  <div className="absolute top-full right-0 pt-2 hidden group-hover:block w-56">
                    <div className="bg-white rounded-md shadow-xl border border-gray-100 text-gray-800 py-1">
                      <div className="px-4 py-2.5 border-b flex justify-between items-center text-sm">
                        <span className="font-semibold">New Customer?</span>
                        <Link to="/signup" className="text-[#2874f0]">Sign Up</Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* More Dropdown */}
            <div className="group relative hidden lg:block">
              <button className="flex items-center gap-1 hover:text-[#2874f0] py-3 -my-3">
                <span>More</span>
                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform text-gray-400" />
              </button>
              <div className="absolute top-full right-0 pt-2 hidden group-hover:block w-48">
                <div className="bg-white rounded-md shadow-xl border border-gray-100 text-gray-800 py-1">
                  <Link
                    to={user ? "/wishlist" : "#"}
                    onClick={(e) => handleRestrictedClick(e, '/wishlist')}
                    className="hover:bg-gray-50 px-4 py-2.5 flex items-center gap-3 text-sm"
                  >
                    <Heart size={14} className="text-[#2874f0]" />
                    Wishlist
                  </Link>
                  <Link
                    to={user ? "/orders" : "#"}
                    onClick={(e) => handleRestrictedClick(e, '/orders')}
                    className="hover:bg-gray-50 px-4 py-2.5 flex items-center gap-3 text-sm"
                  >
                    <Package size={14} className="text-[#2874f0]" />
                    Orders
                  </Link>
                </div>
              </div>
            </div>

            {/* Cart */}
            <Link to={user ? "/cart" : "#"} onClick={(e) => handleRestrictedClick(e, '/cart')} className="flex items-center gap-1.5 hover:text-[#2874f0] relative">
              <div className="relative">
                <ShoppingCart size={20} />
                {summary.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {summary.itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {mobileSearchOpen && (
          <div className="md:hidden px-3 pb-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center border border-gray-300 rounded-[4px]">
                <div className="pl-3 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search for Products, Brands and More"
                  className="w-full bg-transparent text-gray-900 pl-3 pr-4 py-2.5 focus:outline-none text-[14px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
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
              <Link to="/" className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>
                <User size={18} className="text-[#2874f0]" />
                My Profile
              </Link>
              <Link
                to={user ? "/cart" : "#"}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={(e) => {
                  if (!user) { handleRestrictedClick(e, '/cart'); } else { setMobileMenuOpen(false); }
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
                  if (!user) { handleRestrictedClick(e, '/wishlist'); } else { setMobileMenuOpen(false); }
                }}
              >
                <Heart size={18} className="text-[#2874f0]" />
                My Wishlist
              </Link>
              <Link
                to={user ? "/orders" : "#"}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium"
                onClick={(e) => {
                  if (!user) { handleRestrictedClick(e, '/orders'); } else { setMobileMenuOpen(false); }
                }}
              >
                <Package size={18} className="text-[#2874f0]" />
                My Orders
              </Link>
              <Link to="/" className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>
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
