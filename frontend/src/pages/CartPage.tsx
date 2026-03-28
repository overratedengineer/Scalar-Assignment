import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, summary, fetchCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-[#f1f3f6] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-10 shadow-sm rounded-sm text-center max-w-md w-full">
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/empty-cart_ee6143.png" 
            alt="empty cart" 
            className="w-36 md:w-48 mx-auto mb-4 md:mb-6"
          />
          <h2 className="text-base md:text-lg font-bold mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">Add items to it now.</p>
          <Link to="/" className="bg-[#2874f0] text-white px-8 md:px-12 py-2.5 md:py-3 font-bold rounded-sm shadow-md inline-block text-sm md:text-base">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-3 md:py-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-2 md:px-4 flex flex-col lg:flex-row gap-3 md:gap-4">
        {/* Left: Cart Items */}
        <div className="lg:w-2/3 flex flex-col gap-3 md:gap-4">
          <div className="bg-white shadow-sm rounded-sm">
            <div className="p-3 md:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base md:text-lg font-bold">My Cart ({summary.itemCount})</h2>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span className="text-gray-500">Deliver to:</span>
                <span className="font-bold">Mumbai - 400001</span>
                <button className="text-[#2874f0] font-bold border border-gray-200 px-2 py-0.5 md:py-1 rounded-sm text-xs md:text-sm">Change</button>
              </div>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="p-3 md:p-4 border-b flex flex-col sm:flex-row gap-3 md:gap-6">
                <div className="flex sm:flex-col items-center gap-3 sm:gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0">
                    <img src={item.product.images[0]?.url || ''} alt={item.product.name} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 md:w-7 md:h-7 border rounded-full flex items-center justify-center hover:bg-gray-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} className="md:w-3.5 md:h-3.5" />
                    </button>
                    <input 
                      type="text" 
                      value={item.quantity} 
                      readOnly 
                      className="w-8 md:w-10 text-center border text-xs md:text-sm font-bold py-0.5"
                    />
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 md:w-7 md:h-7 border rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={12} className="md:w-3.5 md:h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-1 md:gap-2">
                  <Link to={`/product/${item.productId}`} className="text-sm md:text-base font-medium hover:text-[#2874f0] line-clamp-2 sm:line-clamp-1">
                    {item.product.name}
                  </Link>
                  <div className="text-[10px] md:text-xs text-gray-500">Seller: RetailNet</div>
                  <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                    <span className="text-gray-500 line-through text-xs md:text-sm">₹{(item.product.mrp * item.quantity).toLocaleString()}</span>
                    <span className="text-base md:text-lg font-bold">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    <span className="text-[#388e3c] font-bold text-xs md:text-sm">{Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100)}% Off</span>
                  </div>
                  <div className="flex gap-4 md:gap-6 mt-2 md:mt-4">
                    <button className="text-xs md:text-sm font-bold hover:text-[#2874f0]">SAVE FOR LATER</button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs md:text-sm font-bold hover:text-[#2874f0] flex items-center gap-1"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="text-xs md:text-sm text-gray-800 hidden md:block shrink-0">
                  Delivery by Sat Oct 12 | <span className="text-[#388e3c]">Free</span>
                </div>
              </div>
            ))}

            {/* Desktop Place Order */}
            <div className="hidden md:flex p-4 justify-end sticky bottom-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <button 
                onClick={() => navigate('/checkout')}
                className="bg-[#fb641b] text-white px-16 py-3 font-bold rounded-sm shadow-md hover:bg-[#f05d15] transition-colors"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/* Right: Price Summary */}
        <div className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white shadow-sm rounded-sm">
            <h3 className="text-gray-500 font-bold p-3 md:p-4 border-b text-xs md:text-sm uppercase">Price Details</h3>
            <div className="p-3 md:p-4 flex flex-col gap-3 md:gap-4 text-gray-800 text-sm md:text-base">
              <div className="flex justify-between">
                <span>Price ({summary.itemCount} items)</span>
                <span>₹{summary.totalMrp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-[#388e3c]">- ₹{summary.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c]">FREE</span>
              </div>
              <div className="flex justify-between text-base md:text-lg font-bold border-t border-dashed pt-3 md:pt-4 mt-1 md:mt-2">
                <span>Total Amount</span>
                <span>₹{summary.total.toLocaleString()}</span>
              </div>
              <div className="text-[#388e3c] font-bold text-xs md:text-sm border-t border-dashed pt-3 md:pt-4">
                You will save ₹{summary.discount.toLocaleString()} on this order
              </div>
            </div>
          </div>
          
          <div className="mt-3 md:mt-4 flex items-center gap-2 md:gap-3 text-gray-500 text-xs md:text-sm font-medium p-3 md:p-4">
            <ShieldCheck size={20} className="md:w-6 md:h-6 shrink-0" />
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Place Order */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-40 p-3 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">₹{summary.total.toLocaleString()}</span>
          <p className="text-[10px] text-[#2874f0] font-bold">View price details</p>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="bg-[#fb641b] text-white px-8 py-3 font-bold rounded-sm shadow-md hover:bg-[#f05d15] transition-colors text-sm"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}
