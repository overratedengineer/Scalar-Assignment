import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Calendar } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4 md:py-10 px-3 md:px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-sm overflow-hidden">
        <div className="bg-[#388e3c] p-5 md:p-8 text-white text-center">
          <CheckCircle2 size={48} className="mx-auto mb-3 md:mb-4 md:w-16 md:h-16" />
          <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Order Placed Successfully!</h1>
          <p className="opacity-90 text-sm md:text-base">Thank you for shopping with Flipkart.</p>
        </div>

        <div className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 md:gap-8 border-b pb-4 md:pb-8 mb-4 md:mb-8">
            <div>
              <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1 md:mb-2">Order ID</h3>
              <p className="font-bold text-sm md:text-lg break-all">{orderId}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1 md:mb-2">Estimated Delivery</h3>
              <p className="font-bold text-sm md:text-lg">By Sat, Oct 12th</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1 md:mb-2">Payment Method</h3>
              <p className="font-bold text-sm md:text-lg">Cash on Delivery</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="font-bold text-base md:text-lg">Order Status</h3>
            <div className="flex items-center gap-3 md:gap-4 relative">
              <div className="flex flex-col items-center z-10">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#388e3c] rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={14} className="md:w-4 md:h-4" />
                </div>
                <div className="h-10 md:h-12 w-0.5 bg-gray-200 mt-1"></div>
              </div>
              <div className="flex-1 pb-8 md:pb-10">
                <p className="font-bold text-sm md:text-base">Order Confirmed</p>
                <p className="text-xs md:text-sm text-gray-500">Your order has been placed and is being processed.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 relative -mt-8 md:-mt-10">
              <div className="flex flex-col items-center z-10">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <Package size={14} className="md:w-4 md:h-4" />
                </div>
                <div className="h-10 md:h-12 w-0.5 bg-gray-200 mt-1"></div>
              </div>
              <div className="flex-1 pb-8 md:pb-10">
                <p className="font-bold text-gray-400 text-sm md:text-base">Shipped</p>
                <p className="text-xs md:text-sm text-gray-400">Your item is yet to be shipped.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 relative -mt-8 md:-mt-10">
              <div className="flex flex-col items-center z-10">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <Truck size={14} className="md:w-4 md:h-4" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-400 text-sm md:text-base">Delivered</p>
                <p className="text-xs md:text-sm text-gray-400">Estimated delivery by Sat, Oct 12th.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/" className="flex-1 bg-[#2874f0] text-white py-2.5 md:py-3 text-center font-bold rounded-sm shadow-md text-sm md:text-base">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
