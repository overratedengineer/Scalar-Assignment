import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems, isLoading } = useWishlist();

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4 md:py-8 px-2 md:px-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        
        <div className="bg-white p-4 shadow-sm flex items-center gap-3">
          <Heart fill="#2874f0" className="text-[#2874f0]" size={24} />
          <h1 className="font-bold text-xl md:text-2xl text-gray-900">My Wishlist ({wishlistItems.length})</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-40 bg-white shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white p-10 md:p-20 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="mb-6 p-6 bg-blue-50 rounded-full text-[#2874f0]">
               <Heart size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Empty Wishlist</h2>
            <p className="text-gray-500 mb-8 max-w-sm">You have no items in your wishlist. Start adding items you love!</p>
            <Link to="/" className="bg-[#2874f0] text-white px-8 py-3 rounded-sm font-bold shadow-md hover:bg-blue-600 transition-colors shadow-blue-500/30 font-medium">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {wishlistItems.map((item) => (
              <ProductCard key={item.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
