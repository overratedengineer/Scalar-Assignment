import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, summary, fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Shopping Cart | Flipkart.com'; }, []);

  if (cart.length === 0) {
    return (
      <div className="bg-[#f1f3f6] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-10 shadow-sm rounded-sm text-center max-w-md w-full">
          <div className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-4 md:mb-6 flex items-center justify-center">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Cart handle */}
              <path d="M55 60 L45 30" stroke="#d5d5d5" strokeWidth="6" strokeLinecap="round"/>
              {/* Cart body */}
              <path d="M40 65 L50 135 C52 145 58 150 68 150 L145 150 C155 150 160 145 162 135 L172 65 Z" fill="#e8e8e8" stroke="#d5d5d5" strokeWidth="3"/>
              {/* Decorative lines on right */}
              <line x1="178" y1="80" x2="195" y2="80" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round"/>
              <line x1="175" y1="100" x2="198" y2="100" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round"/>
              <line x1="178" y1="120" x2="195" y2="120" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round"/>
              {/* Decorative lines on left */}
              <line x1="5" y1="100" x2="28" y2="100" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round"/>
              <line x1="10" y1="120" x2="25" y2="120" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round"/>
              {/* Eyes */}
              <ellipse cx="90" cy="105" rx="5" ry="12" fill="#d5d5d5"/>
              <ellipse cx="125" cy="105" rx="5" ry="12" fill="#d5d5d5"/>
              {/* Smile */}
              <path d="M88 125 Q107 140 127 125" stroke="#d5d5d5" strokeWidth="4" strokeLinecap="round" fill="none"/>
              {/* Wheels */}
              <circle cx="80" cy="168" r="12" fill="#d5d5d5"/>
              <circle cx="80" cy="168" r="5" fill="#f1f3f6"/>
              <circle cx="140" cy="168" r="12" fill="#d5d5d5"/>
              <circle cx="140" cy="168" r="5" fill="#f1f3f6"/>
            </svg>
          </div>
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
                    <span className="text-gray-500 line-through text-xs md:text-sm">₹{(item.product.mrp * item.quantity).toLocaleString("en-IN")}</span>
                    <span className="text-base md:text-lg font-bold">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
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
                <span>₹{summary.totalMrp.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-[#388e3c]">- ₹{summary.discount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c]">FREE</span>
              </div>
              <div className="flex justify-between text-base md:text-lg font-bold border-t border-dashed pt-3 md:pt-4 mt-1 md:mt-2">
                <span>Total Amount</span>
                <span>₹{summary.total.toLocaleString("en-IN")}</span>
              </div>
              <div className="text-[#388e3c] font-bold text-xs md:text-sm border-t border-dashed pt-3 md:pt-4">
                You will save ₹{summary.discount.toLocaleString("en-IN")} on this order
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
          <span className="text-lg font-bold">₹{summary.total.toLocaleString("en-IN")}</span>
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
