import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Smartphone, Shirt, Sparkles, Laptop, Home as HomeIcon, Refrigerator, Baby, Utensils, Car, Bike, Trophy, Book, Sofa, LayoutGrid } from 'lucide-react';

const CATEGORY_ICONS = [
  { name: 'For You', image: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100' },
  { name: 'Fashion', image: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100' },
  { name: 'Mobiles', image: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100' },
  { name: 'Beauty', image: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
  { name: 'Electronics', image: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100' },
  { name: 'Home', image: 'https://rukminim1.flixcart.com/flap/128/128/image/ee1144564f355693.png?q=100' },
  { name: 'Appliances', image: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100' },
  { name: 'Toys, Baby', image: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
  { name: 'Food & More', image: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b0c08.png?q=100' },
  { name: 'Auto Acc...', image: 'https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100' },
  { name: '2 Wheele...', image: 'https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100' },
  { name: 'Sports & ...', image: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
  { name: 'Books & ...', image: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
  { name: 'Furniture', image: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2c021d97a8e2.png?q=100' },
];

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const categoryFilter = searchParams.get('category') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (categoryFilter && categoryFilter !== 'For You') params.append('category', categoryFilter.toLowerCase());
        
        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, categoryFilter]);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Bar */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide sticky top-[56px] md:top-[96px] z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-2 md:px-4 py-2 md:py-3 flex gap-1 md:gap-4 items-center min-w-max">
          {CATEGORY_ICONS.map((cat) => {
            const isActive = categoryFilter === cat.name || (!categoryFilter && cat.name === 'For You');
            return (
              <button
                key={cat.name}
                className="flex flex-col items-center gap-0.5 md:gap-1 group cursor-pointer relative pb-1 px-1 md:px-2"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('category', cat.name);
                  window.history.replaceState({}, '', `?${params.toString()}`);
                  window.location.reload();
                }}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-[#f0f5ff] scale-110' : 'group-hover:bg-gray-50'}`}>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-9 h-9 md:w-12 md:h-12 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className={`text-[10px] md:text-[12px] font-bold tracking-tight ${isActive ? 'text-[#2874f0]' : 'text-gray-800'}`}>
                  {cat.name}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#2874f0] rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto p-3 md:p-4 flex flex-col gap-4 md:gap-8">
        {/* Banner Section */}
        {!searchQuery && !categoryFilter && (
          <div className="flex flex-col gap-3 md:gap-6">
            {/* Main Carousel Mock */}
            <div className="w-full h-[160px] sm:h-[200px] md:h-[280px] bg-[#2874f0] rounded-sm overflow-hidden relative group">
              <img src="https://picsum.photos/seed/flipkartbanner/1600/400" alt="Banner" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center p-4 sm:p-8 md:p-12 text-white">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-black mb-1 md:mb-2 tracking-tight">Big Saving Days</h2>
                <p className="text-sm sm:text-base md:text-xl font-medium opacity-90 mb-3 md:mb-6">Up to 80% Off on Electronics & More</p>
                <button className="bg-white text-[#2874f0] font-bold px-5 md:px-8 py-2 md:py-2.5 rounded-sm w-fit hover:bg-gray-100 transition-colors text-sm md:text-base">
                  Shop Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              <div className="md:col-span-4 h-[200px] md:h-[280px] bg-[#f5f5f5] rounded-sm overflow-hidden shadow-sm relative group">
                <img src="https://picsum.photos/seed/aquaguard/800/600" alt="Aquaguard" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 md:p-6 text-white">
                  <h3 className="text-xs md:text-sm font-bold opacity-80 mb-1 uppercase">Aquaguard</h3>
                  <h2 className="text-lg md:text-2xl font-black leading-tight mb-1 md:mb-2">2 year filter life<br/>Up to 60% Off*</h2>
                  <p className="text-[10px] md:text-xs opacity-70">Save up to ₹18,000 on filters</p>
                </div>
                <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-black/40 px-2 py-0.5 rounded text-[10px] text-white">AD</div>
              </div>
              
              <div className="md:col-span-8 h-[200px] md:h-[280px] bg-[#f0f7ff] rounded-sm overflow-hidden shadow-sm relative flex items-center p-4 md:p-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 md:mb-4">
                    <span className="text-[#fb641b] font-black text-base md:text-xl italic">DEALS</span>
                    <span className="text-gray-400">|</span>
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Flipkart Unique" className="h-3 md:h-4" />
                  </div>
                  <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">Best of Electronics</h2>
                  <p className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">From ₹129</p>
                  <p className="text-gray-500 font-medium text-sm md:text-base">Headsets, TWS, speakers & more</p>
                </div>
                <div className="flex-1 h-full flex items-center justify-center relative">
                  <img src="https://picsum.photos/seed/gadgets/400/400" alt="Gadgets" className="max-h-full object-contain" />
                  <div className="absolute bottom-0 right-0 bg-black/10 px-2 py-0.5 rounded text-[10px] text-gray-500">AD</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deals of the Day Section */}
        {!searchQuery && !categoryFilter && (
          <div className="bg-white shadow-sm border border-gray-100 rounded-sm">
            <div className="p-3 md:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2 md:gap-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Deals of the Day</h2>
                <div className="flex items-center gap-1 md:gap-2 text-gray-500 text-xs md:text-sm font-medium">
                  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/timer_a73391.svg" alt="timer" className="w-3 md:w-4" />
                  <span>19 : 45 : 12 Left</span>
                </div>
              </div>
              <button className="bg-[#2874f0] text-white px-3 md:px-4 py-1 md:py-1.5 rounded-sm text-xs md:text-sm font-bold shadow-sm hover:bg-[#1a5abd] transition-colors">
                VIEW ALL
              </button>
            </div>
            <div className="p-3 md:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
              {products.slice(0, 6).map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="flex flex-col items-center text-center group">
                  <div className="h-24 md:h-32 w-full flex items-center justify-center mb-2 md:mb-3 overflow-hidden">
                    <img src={product.images[0]?.url || ''} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-[#388e3c] text-xs md:text-sm font-medium mt-1">From ₹{product.price.toLocaleString()}</p>
                  <p className="text-gray-500 text-[10px] md:text-xs mt-0.5">{product.category?.name || 'Category'}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Section */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex justify-between items-center bg-white p-3 md:p-4 shadow-sm border border-gray-100 rounded-sm">
            <h2 className="text-base md:text-xl font-bold text-gray-900">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               categoryFilter ? `${categoryFilter}` : "Suggested For You"}
            </h2>
            <div className="bg-[#2874f0] text-white rounded-full p-1 md:p-1.5 cursor-pointer hover:bg-[#1a5abd] transition-colors">
              <ArrowRight size={16} className="md:w-5 md:h-5" />
            </div>
          </div>
          
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
             </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-10 md:p-20 text-center bg-white rounded-sm border border-gray-100 shadow-sm">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="no results" className="mx-auto mb-4 w-40 md:w-64" />
              <p className="text-base md:text-lg font-medium">Sorry, no results found!</p>
            </div>
          )}
        </div>

        {/* Today's Hot Pick Banner */}
        {!searchQuery && !categoryFilter && (
          <div className="bg-[#f0f2f5] rounded-xl p-4 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 md:mb-4 justify-center md:justify-start">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">NOTHING (R)</span>
                  <span className="text-gray-300">|</span>
                  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Flipkart Unique" className="h-3 md:h-4" />
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2 md:mb-4">Phone ( 4a )</h2>
                <p className="text-base md:text-xl text-gray-600">Segment's only 70x ultra zoom*</p>
             </div>
             <div className="flex-1 h-48 md:h-64 flex items-center justify-center">
                <img src="https://picsum.photos/seed/phone4a/600/400" alt="Phone" className="max-h-full object-contain" />
             </div>
             <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-gray-300 px-2 py-0.5 rounded text-[10px] text-gray-600 font-bold">AD</div>
          </div>
        )}
      </main>
    </div>
  );
}
