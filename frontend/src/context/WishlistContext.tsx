import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';
import { Product } from './CartContext';

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistIds: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token || !user) {
        setWishlistItems([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await api.get('/wishlist');
        setWishlistItems(res.data.data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, [token, user]);

  const toggleWishlist = async (productId: string) => {
    if (!token || !user) return;

    // Optimistic UI for toggling off
    const wasInWishlist = wishlistItems.some(i => i.productId === productId);
    if (wasInWishlist) {
      setWishlistItems(prev => prev.filter(i => i.productId !== productId));
    }

    try {
      const res = await api.post('/wishlist/toggle', { productId });
      
      if (res.data.data.added) {
         // Full refetch after add so we have nested product object schemas
         const fetchRes = await api.get('/wishlist');
         setWishlistItems(fetchRes.data.data);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
      // Revert optimistic delete if it failed
      if (wasInWishlist) {
         const fetchRes = await api.get('/wishlist');
         setWishlistItems(fetchRes.data.data);
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const wishlistIds = wishlistItems.map(item => item.productId);

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistIds, toggleWishlist, isInWishlist, isLoading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
