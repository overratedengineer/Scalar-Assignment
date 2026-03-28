import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';
import { useCart, Product } from '../context/CartContext';
import { Star, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data.data;
        setProduct(p);
        if (p?.images?.length > 0) {
          setActiveImage(p.images[0].url);
        }
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-[#f1f3f6] min-h-screen">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="p-20 text-center text-lg font-bold min-h-screen bg-[#f1f3f6]">Product not found</div>;
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
      navigate('/cart');
    } catch (err) {
      // Handled by context or login redirect
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, 1);
      navigate('/checkout');
    } catch (err) {}
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto bg-white p-3 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 shadow-sm">
        {/* Left Column: Images */}
        <div className="w-full md:w-2/5 flex flex-col gap-3 md:gap-4 md:sticky md:top-24 md:self-start">
          <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible scrollbar-hide">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`w-14 h-14 md:w-16 md:h-16 border p-1 cursor-pointer rounded-sm shrink-0 ${activeImage === img.url ? 'border-[#2874f0]' : 'border-gray-200'}`}
                  onMouseEnter={() => setActiveImage(img.url)}
                  onClick={() => setActiveImage(img.url)}
                >
                  <img src={img.url} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 h-[300px] sm:h-[350px] md:h-[450px] border border-gray-100 p-3 md:p-4 flex items-center justify-center relative group">
              <img src={activeImage} alt={product.name} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex gap-3 mt-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#ff9f00] text-white py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-[#f59a00] transition-colors shadow-sm"
            >
              <ShoppingCart size={20} /> ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#fb641b] text-white py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-[#f05d15] transition-colors shadow-sm"
            >
              <Zap size={20} /> BUY NOW
            </button>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-3/5 flex flex-col gap-3 md:gap-4">
          <nav className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
            <span>Home</span> &gt; <span>{product.category?.name || 'Category'}</span> &gt; <span className="text-gray-900 line-clamp-1">{product.name}</span>
          </nav>

          <h1 className="text-base md:text-xl text-gray-900 font-medium">{product.name}</h1>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <div className="bg-[#388e3c] text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              {product.rating} <Star size={10} fill="white" className="md:w-3 md:h-3" />
            </div>
            <span className="text-gray-500 text-xs md:text-sm font-medium">{product.ratingCount.toLocaleString()} Ratings & {Math.floor(product.ratingCount/10).toLocaleString()} Reviews</span>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-4 md:h-5" />
          </div>

          <div className="flex items-baseline gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</span>
            <span className="text-gray-500 line-through text-sm md:text-base">₹{(product.mrp || product.price).toLocaleString()}</span>
            <span className="text-[#388e3c] font-bold text-sm md:text-base">{Math.round((((product.mrp || product.price) - product.price) / (product.mrp || product.price)) * 100)}% off</span>
          </div>

          {/* Offers */}
          <div className="flex flex-col gap-2 mt-1 md:mt-2">
            <h3 className="font-bold text-sm">Available offers</h3>
            <div className="flex items-start gap-2 text-xs md:text-sm">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/offertag_7ad934.png" alt="tag" className="w-3 md:w-4 mt-1" />
              <span><span className="font-bold">Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span className="text-[#2874f0] font-bold">T&C</span></span>
            </div>
            <div className="flex items-start gap-2 text-xs md:text-sm">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/offertag_7ad934.png" alt="tag" className="w-3 md:w-4 mt-1" />
              <span><span className="font-bold">Special Price</span> Get extra ₹{Math.floor(product.price * 0.1).toLocaleString()} off (price inclusive of cashback/coupon) <span className="text-[#2874f0] font-bold">T&C</span></span>
            </div>
          </div>

          {/* Highlights & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-gray-500 text-xs md:text-sm font-medium">Highlights</h3>
              <ul className="list-disc list-inside text-xs md:text-sm flex flex-col gap-1.5 md:gap-2">
                {product.specs.map((spec) => (
                  <li key={spec.id}><span className="text-gray-500">{spec.specKey}:</span> {spec.specValue}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-gray-500 text-xs md:text-sm font-medium">Services</h3>
              <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
                <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#2874f0] md:w-4 md:h-4" /> 1 Year Warranty</div>
                <div className="flex items-center gap-2"><RotateCcw size={14} className="text-[#2874f0] md:w-4 md:h-4" /> 7 Days Replacement Policy</div>
                <div className="flex items-center gap-2"><Truck size={14} className="text-[#2874f0] md:w-4 md:h-4" /> Cash on Delivery available</div>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-8">
            <h3 className="text-base md:text-lg font-bold border-b pb-2 mb-3 md:mb-4">Product Description</h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-40">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#ff9f00] text-white py-3.5 font-bold flex items-center justify-center gap-2 text-sm"
        >
          <ShoppingCart size={16} /> ADD TO CART
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 bg-[#fb641b] text-white py-3.5 font-bold flex items-center justify-center gap-2 text-sm"
        >
          <Zap size={16} /> BUY NOW
        </button>
      </div>
    </div>
  );
}
