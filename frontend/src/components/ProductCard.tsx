import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isAd = Math.random() > 0.7; // Mocking some ads
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white p-2 md:p-4 flex flex-col group hover:shadow-xl transition-shadow relative border border-gray-100 rounded-lg overflow-hidden"
    >
      <button 
        onClick={handleWishlistClick}
        className={`absolute top-2 md:top-3 right-2 md:right-3 transition-colors z-10 ${wishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
      >
        <Heart 
          size={16} 
          className="md:w-[18px] md:h-[18px] transition-all duration-300" 
          fill={wishlisted ? "currentColor" : "none"} 
        />
      </button>

      {isAd && (
        <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-gray-200 px-1.5 py-0.5 rounded text-[8px] md:text-[9px] text-gray-500 font-bold z-10">AD</div>
      )}

      <div className="h-32 md:h-48 flex items-center justify-center mb-2 md:mb-4 overflow-hidden relative">
        <img 
          src={product.images[0]?.url || ''} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        
        {/* Rating Badge on Image */}
        <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm px-1 md:px-1.5 py-0.5 rounded-tr-md flex items-center gap-0.5 border-t border-r border-gray-100">
          <span className="text-[10px] md:text-[11px] font-bold text-gray-800">{product.rating}</span>
          <Star size={9} fill="#388e3c" className="text-[#388e3c] md:w-[10px] md:h-[10px]" />
        </div>
      </div>

      <div className="flex flex-col gap-0.5 md:gap-1">
        <div className="flex items-center gap-1 md:gap-2 mb-0.5">
          <h3 className="text-[11px] md:text-[13px] font-medium text-gray-800 group-hover:text-[#2874f0] line-clamp-2 h-8 md:h-10 leading-tight flex-1">
            {product.name}
          </h3>
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
            alt="Flipkart Assured" 
            className="h-3 md:h-3.5 mb-auto mt-1 hidden sm:block" 
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1 flex-wrap">
          <span className="text-sm md:text-base font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-400 text-[10px] md:text-xs line-through">₹{(product.mrp || product.price).toLocaleString()}</span>
          <span className="text-[10px] md:text-[12px] font-bold text-[#388e3c]">
            {Math.round((((product.mrp || product.price) - product.price) / (product.mrp || product.price)) * 100)}% off
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-0.5 md:mt-1">
          <span className="text-[9px] md:text-[11px] font-bold text-[#fb641b] bg-[#fff1ec] px-1 md:px-1.5 py-0.5 rounded">Hot Deal</span>
          <span className="text-[9px] md:text-[10px] text-gray-500 font-medium hidden sm:block">Buy for ₹2, save extra 1%</span>
        </div>
      </div>
    </Link>
  );
}
