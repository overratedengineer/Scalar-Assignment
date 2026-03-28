import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, summary, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: user?.name || 'John Doe',
    phone: user?.phone || '9876543210',
    pincode: '400001',
    locality: 'South Mumbai',
    address: '123 E-commerce Avenue, Tech City',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Home'
  });

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: summary.total,
        shippingAddress: `${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`,
        paymentMethod: 'COD'
      };

      const { data } = await api.post('/orders', orderPayload);
      navigate(`/order-confirmation/${data.data.id}`);
      fetchCart(); // run in background so it doesn't trigger the empty cart redirect useEffect below
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Secure Checkout | Flipkart.com';
  }, []);

  useEffect(() => {
    if (cart.length === 0 && !loading) {
      navigate('/');
    }
  }, [cart, navigate, loading]);

  if (cart.length === 0) return null;

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-3 md:py-8">
      <div className="max-w-7xl mx-auto px-2 md:px-4 flex flex-col lg:flex-row gap-3 md:gap-4">
        {/* Left: Checkout Steps */}
        <div className="lg:w-2/3 flex flex-col gap-3 md:gap-4">
          {/* Step 1: Login */}
          <div className="bg-white shadow-sm rounded-sm">
            <div className={`p-3 md:p-4 flex items-center gap-3 md:gap-4 ${step > 1 ? 'bg-gray-50' : 'bg-[#2874f0] text-white'}`}>
              <span className={`w-5 h-5 md:w-6 md:h-6 rounded-sm flex items-center justify-center text-[10px] md:text-xs font-bold ${step > 1 ? 'bg-gray-200 text-[#2874f0]' : 'bg-white text-[#2874f0]'}`}>1</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold uppercase text-[10px] md:text-xs">Login</h3>
                {step > 1 && <div className="text-xs md:text-sm font-bold text-black mt-1 truncate">{user?.name} {user?.phone}</div>}
              </div>
              {step > 1 && <button onClick={() => setStep(1)} className="text-[#2874f0] font-bold text-xs md:text-sm border border-gray-200 px-2 md:px-4 py-1 md:py-2 rounded-sm bg-white shrink-0">CHANGE</button>}
            </div>
            {step === 1 && (
              <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
                <p className="text-xs md:text-sm">Logged in as <span className="font-bold">{user?.name || 'Guest'}</span></p>
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#fb641b] text-white px-8 md:px-12 py-2.5 md:py-3 font-bold rounded-sm shadow-md self-start text-sm md:text-base"
                >
                  CONTINUE CHECKOUT
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Address */}
          <div className="bg-white shadow-sm rounded-sm">
            <div className={`p-3 md:p-4 flex items-center gap-3 md:gap-4 ${step === 2 ? 'bg-[#2874f0] text-white' : 'bg-gray-50'}`}>
              <span className={`w-5 h-5 md:w-6 md:h-6 rounded-sm flex items-center justify-center text-[10px] md:text-xs font-bold ${step === 2 ? 'bg-white text-[#2874f0]' : 'bg-gray-200 text-[#2874f0]'}`}>2</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold uppercase text-[10px] md:text-xs">Delivery Address</h3>
                {step > 2 && <div className="text-xs md:text-sm font-bold text-black mt-1 truncate">{address.name}, {address.address}, {address.city} - {address.pincode}</div>}
              </div>
              {step > 2 && <button onClick={() => setStep(2)} className="text-[#2874f0] font-bold text-xs md:text-sm border border-gray-200 px-2 md:px-4 py-1 md:py-2 rounded-sm bg-white shrink-0">CHANGE</button>}
            </div>
            {step === 2 && (
              <div className="p-3 md:p-6">
                <div className="border border-[#2874f0] bg-blue-50 p-3 md:p-4 rounded-sm flex gap-3 md:gap-4">
                  <input type="radio" checked readOnly className="mt-1 shrink-0" />
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                      <span className="font-bold text-sm md:text-base">{address.name}</span>
                      <span className="bg-gray-200 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-sm font-bold">{address.type}</span>
                      <span className="font-bold text-sm md:text-base">{address.phone}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700">{address.address}, {address.locality}, {address.city}, {address.state} - <span className="font-bold">{address.pincode}</span></p>
                    <button 
                      onClick={() => setStep(3)}
                      className="bg-[#fb641b] text-white px-8 md:px-12 py-2.5 md:py-3 font-bold rounded-sm shadow-md self-start mt-3 md:mt-4 text-sm md:text-base"
                    >
                      DELIVER HERE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Order Summary */}
          <div className="bg-white shadow-sm rounded-sm">
            <div className={`p-3 md:p-4 flex items-center gap-3 md:gap-4 ${step === 3 ? 'bg-[#2874f0] text-white' : 'bg-gray-50'}`}>
              <span className={`w-5 h-5 md:w-6 md:h-6 rounded-sm flex items-center justify-center text-[10px] md:text-xs font-bold ${step === 3 ? 'bg-white text-[#2874f0]' : 'bg-gray-200 text-[#2874f0]'}`}>3</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold uppercase text-[10px] md:text-xs">Order Summary</h3>
                {step > 3 && <div className="text-xs md:text-sm font-bold text-black mt-1">{summary.itemCount} Items</div>}
              </div>
            </div>
            {step === 3 && (
              <div className="p-0">
                {cart.map(item => (
                  <div key={item.id} className="p-3 md:p-6 border-b flex gap-3 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
                      <img src={item.product.images[0]?.url || ''} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5 md:gap-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-medium line-clamp-2 md:line-clamp-1">{item.product.name}</h4>
                      <div className="text-[10px] md:text-xs text-gray-500">Qty: {item.quantity}</div>
                      <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                        <span className="text-gray-500 line-through text-[10px] md:text-xs">₹{(item.product.mrp * item.quantity).toLocaleString("en-IN")}</span>
                        <span className="text-sm md:text-base font-bold">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white">
                  <p className="text-xs md:text-sm">Order confirmation email will be sent to <span className="font-bold break-all">{user?.email}</span></p>
                  <button 
                    onClick={() => setStep(4)}
                    className="bg-[#fb641b] text-white px-8 md:px-12 py-2.5 md:py-3 font-bold rounded-sm shadow-md w-full sm:w-auto text-sm md:text-base"
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Payment Options */}
          <div className="bg-white shadow-sm rounded-sm">
            <div className={`p-3 md:p-4 flex items-center gap-3 md:gap-4 ${step === 4 ? 'bg-[#2874f0] text-white' : 'bg-gray-50'}`}>
              <span className={`w-5 h-5 md:w-6 md:h-6 rounded-sm flex items-center justify-center text-[10px] md:text-xs font-bold ${step === 4 ? 'bg-white text-[#2874f0]' : 'bg-gray-200 text-[#2874f0]'}`}>4</span>
              <div className="flex-1">
                <h3 className="font-bold uppercase text-[10px] md:text-xs">Payment Options</h3>
              </div>
            </div>
            {step === 4 && (
              <div className="p-3 md:p-6 flex flex-col gap-3 md:gap-4">
                <div className="border p-3 md:p-4 rounded-sm flex gap-3 md:gap-4 items-center cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" id="upi" />
                  <label htmlFor="upi" className="flex-1 font-medium cursor-pointer text-sm md:text-base">UPI (PhonePe, Google Pay, BHIM)</label>
                </div>
                <div className="border p-3 md:p-4 rounded-sm flex gap-3 md:gap-4 items-center cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" id="card" />
                  <label htmlFor="card" className="flex-1 font-medium cursor-pointer text-sm md:text-base">Credit / Debit / ATM Card</label>
                </div>
                <div className="border p-3 md:p-4 rounded-sm flex gap-3 md:gap-4 items-center cursor-pointer hover:bg-gray-50 bg-blue-50 border-[#2874f0]">
                  <input type="radio" name="payment" id="cod" checked readOnly />
                  <label htmlFor="cod" className="flex-1 font-medium cursor-pointer text-sm md:text-base">Cash on Delivery</label>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="bg-[#fb641b] text-white px-10 md:px-16 py-3 md:py-4 font-bold rounded-sm shadow-md self-stretch md:self-end mt-2 md:mt-4 text-base md:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'PROCESSING...' : 'CONFIRM ORDER'}
                </button>
              </div>
            )}
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
            </div>
          </div>
          
          <div className="mt-3 md:mt-4 flex items-center gap-2 md:gap-3 text-gray-500 text-xs md:text-sm font-medium p-3 md:p-4">
            <ShieldCheck size={20} className="md:w-6 md:h-6 shrink-0" />
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      </div>
    </div>
  );
}
