import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, X, Rocket } from 'lucide-react';

const CATEGORY_ICONS = [
  { name: 'For You', shortName: 'For You', image: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100' },
  { name: 'Fashion', shortName: 'Fashion', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/fashion.svg' },
  { name: 'Mobiles', shortName: 'Mobiles', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/mobiles.svg' },
  { name: 'Beauty', shortName: 'Beauty', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/beauty.svg' },
  { name: 'Electronics', shortName: 'Electronics', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/headohones.svg' },
  { name: 'Home', shortName: 'Home', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/home-final.svg' },
  { name: 'Appliances', shortName: 'Appliances', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/tv.svg' },
  { name: 'Toys, Baby', shortName: 'Toys, ba...', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/toy.svg' },
  { name: 'Food & More', shortName: 'Food & H...', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/food.svg' },
  { name: 'Auto Accessories', shortName: 'Auto Acc...', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-acc.svg' },
  { name: '2 Wheelers', shortName: '2 Wheele...', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-new.svg' },
  { name: 'Sports & Fitness', shortName: 'Sports & ...', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/sport.svg' },
  { name: 'Books & More', shortName: 'Books & ...', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/books.svg' },
  { name: 'Furniture', shortName: 'Furniture', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/furniture.svg' }
];

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const categoryFilter = searchParams.get('category') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      document.title = `${searchQuery} - Flipkart Search`;
    } else if (categoryFilter) {
      document.title = `${categoryFilter} - Flipkart.com`;
    } else {
      document.title = 'Flipkart - Online Shopping India';
    }
  }, [searchQuery, categoryFilter]);

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
    <div className="bg-[#f1f3f6] min-h-screen">
      {/* ===== Category Navigation Bar ===== */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide sticky top-[92px] z-40">
        <div className="max-w-[1248px] mx-auto flex items-stretch justify-between">
          {CATEGORY_ICONS.map((cat) => {
            const isActive = categoryFilter === cat.name || (!categoryFilter && cat.name === 'For You');
            return (
              <button
                key={cat.name}
                className={`flex flex-col items-center justify-end cursor-pointer px-2 py-1.5 transition-all group relative`}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('category', cat.name);
                  window.history.replaceState({}, '', `?${params.toString()}`);
                  window.location.reload();
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[28px] h-[28px] object-contain mb-[2px]"
                  referrerPolicy="no-referrer"
                />
                <span className={`text-[12px] leading-tight whitespace-nowrap ${isActive ? 'text-[#2874f0] font-bold' : 'text-gray-800 font-medium group-hover:text-[#2874f0]'}`}>
                  {cat.shortName}
                </span>
                {/* Blue underline for active */}
                {isActive && (
                  <div className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#2874f0]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-[1248px] mx-auto flex flex-col gap-4 md:gap-5 pt-4 md:pt-5 pb-6 px-0">
        {/* ===== HOMEPAGE CONTENT ===== */}
        {!searchQuery && !categoryFilter && (
          <>
            {/* Brands In Spotlight heading */}
            <div className="px-3 pt-1">
              <h2 className="text-[16px] font-bold text-gray-900">Brands In Spotlight</h2>
            </div>

            {/* Main Hero Banner */}
            <div className="overflow-hidden rounded-[10px] mx-2 cursor-pointer" onClick={() => setShowComingSoon(true)}>
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3140/1040/image/aac979e745da211b.png?q=60"
                alt="Big Saving Days"
                className="w-full h-auto block hover:opacity-95 transition-opacity"
              />
            </div>

            {/* Two-panel promotional section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mx-2">
              {/* Aquaguard */}
              <div className="md:col-span-4 bg-white rounded-[10px] overflow-hidden relative shadow-sm cursor-pointer" onClick={() => setShowComingSoon(true)}>
                <img
                  src="https://rukminim2.flixcart.com/image/2940/2940/xif0q/headphone/z/2/6/-original-imahhfepyenmus3b.jpeg?q=90"
                  alt="True Wireless"
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="text-[10px] font-bold opacity-80 uppercase tracking-wider">True Wireless</h3>
                  <h2 className="text-sm md:text-lg font-black leading-tight mt-0.5">Best in Class Sound<br />Up to 70% Off*</h2>
                  <p className="text-[9px] opacity-60 mt-0.5">Top brands at unbeatable prices</p>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded text-[9px] text-gray-500 font-bold">AD</div>
              </div>

              {/* Best of Electronics */}
              <div className="md:col-span-8 bg-white rounded-[10px] overflow-hidden shadow-sm cursor-pointer" onClick={() => setShowComingSoon(true)}>
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/3160/1540/image/d5c0ce355f40f092.jpg?q=60"
                  alt="Best of Electronics"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Deals of the Day */}
            <div className="bg-white mx-2 rounded-[10px] shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-[16px] font-bold text-gray-900">Deals of the Day</h2>
                </div>
                <button className="bg-[#2874f0] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold hover:bg-[#1a5abd] transition-colors">
                  VIEW ALL
                </button>
              </div>
              <div className="px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.slice(0, 6).map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} className="flex flex-col items-center text-center group">
                    <div className="h-28 md:h-32 w-full flex items-center justify-center mb-2 overflow-hidden">
                      <img src={product.images[0]?.url || ''} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-[12px] font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-[#388e3c] text-[12px] font-bold mt-0.5">From ₹{product.price.toLocaleString("en-IN")}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">{product.category?.name || 'Category'}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Nothing Phone 4a Ad */}
            <div className="bg-white mx-2 rounded-[10px] shadow-sm overflow-hidden relative flex flex-col md:flex-row items-center cursor-pointer" onClick={() => setShowComingSoon(true)}>
              <div className="flex-1 p-6 md:p-10 text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">NOTHING (R)</span>
                  <span className="text-gray-300">|</span>
                  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Flipkart Unique" className="h-3.5" />
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">Phone ( 4a )</h2>
                <p className="text-sm md:text-lg text-gray-500">Segment's only 70x ultra zoom*</p>
              </div>
              <div className="flex-1 h-52 md:h-72 flex items-center justify-center p-4">
                <img src="https://rukminim2.flixcart.com/image/2850/2850/xif0q/mobile/e/c/w/-original-imahh7x7yyfzphfr.jpeg?q=90" alt="Phone" className="max-h-full object-contain" />
              </div>
              <div className="absolute top-2 right-2 bg-gray-200 px-1.5 py-0.5 rounded text-[9px] text-gray-600 font-bold">AD</div>
            </div>
          </>
        )}

        {/* ===== PRODUCT GRID ===== */}
        <div className="flex flex-col gap-2.5 mx-2">
          <div className="flex justify-between items-center bg-white px-4 py-3 rounded-[10px] shadow-sm">
            <h2 className="text-[16px] font-bold text-gray-900">
              {searchQuery ? `Search results for "${searchQuery}"` :
                categoryFilter ? `${categoryFilter}` : "Suggested For You"}
            </h2>
            <div className="bg-[#2874f0] text-white rounded-full p-1.5 cursor-pointer hover:bg-[#1a5abd] transition-colors">
              <ArrowRight size={16} />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 bg-white rounded-[10px] shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-gray-200 rounded-[10px] overflow-hidden shadow-sm">
              {products.map(product => (
                <div key={product.id} className="bg-white">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 md:p-20 text-center bg-white rounded-[10px] shadow-sm">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="no results" className="mx-auto mb-4 w-40 md:w-64" />
              <p className="text-base md:text-lg font-medium">Sorry, no results found!</p>
            </div>
          )}
        </div>
      </main>
      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowComingSoon(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[380px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#2874f0] to-[#6C63FF] p-5 flex justify-between items-start text-white">
              <div className="flex items-center gap-2">
                <Rocket size={22} />
                <h3 className="font-bold text-lg">Coming Soon!</h3>
              </div>
              <button onClick={() => setShowComingSoon(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-[#f0f5ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket size={28} className="text-[#2874f0]" />
              </div>
              <p className="text-gray-800 font-semibold text-[15px] mb-2">This feature is coming soon!</p>
              <p className="text-gray-500 text-[13px] leading-relaxed">We're working hard to bring this to you. Stay tuned for updates after Scaler Lab accepts us! </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="mt-5 bg-[#2874f0] hover:bg-[#1a5abd] text-white font-bold py-2.5 px-8 rounded-full text-[13px] transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
