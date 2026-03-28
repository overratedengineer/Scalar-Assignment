import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Package, ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'My Orders | Flipkart.com';
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-[#f1f3f6] min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4 md:py-8 px-2 md:px-0">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar (Filters) */}
        <div className="hidden md:block w-72 bg-white shadow-sm p-4 h-fit sticky top-20">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-2 uppercase text-gray-500">Order Status</h3>
              <div className="space-y-2">
                {['On the way', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t">
              <h3 className="font-medium text-sm mb-2 uppercase text-gray-500">Order Time</h3>
              <div className="space-y-2">
                {['Last 30 days', '2023', '2022', 'Older'].map((time) => (
                  <label key={time} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Order List) */}
        <div className="flex-1 space-y-4">
          <div className="bg-white p-4 hidden md:flex items-center shadow-sm">
            <input 
              type="text" 
              placeholder="Search your orders here" 
              className="flex-1 border rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-[#2874f0]"
            />
            <button className="bg-[#2874f0] text-white px-6 py-2 rounded-r-sm font-medium hover:bg-blue-600 transition-colors">
              Search Orders
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white p-10 md:p-20 text-center shadow-sm flex flex-col items-center justify-center">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myorders_96b4ef.png" alt="No orders" className="w-48 mb-6 opacity-75" />
              <h2 className="text-xl font-medium mb-4">No orders found</h2>
              <Link to="/" className="bg-[#2874f0] text-white px-8 py-2.5 rounded-sm font-medium hover:bg-blue-600 transition-colors">
                Shop Now
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/order-confirmation/${order.id}`} className="block">
                  {order.items.map((item: any, index: number) => (
                    <div key={item.id} className={`flex items-start gap-4 p-4 ${index !== order.items.length - 1 ? 'border-b' : ''}`}>
                      <div className="h-20 w-20 shrink-0 flex items-center justify-center">
                        <img 
                          src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/150'} 
                          alt={item.product?.name} 
                          className="max-h-full max-w-full object-contain" 
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-medium text-sm md:text-base line-clamp-1 hover:text-[#2874f0]">
                          {item.product?.name}
                        </h4>
                        <p className="text-gray-500 text-xs md:text-sm mt-1">Quantity: {item.quantity}</p>
                        <p className="font-bold text-sm md:text-base mt-2">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>

                      <div className="hidden md:flex flex-col flex-1 gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          <span className="font-medium text-sm">
                            {order.status === 'PROCESSING' ? 'Processing' : 
                             order.status === 'SHIPPED' ? 'Shipped' : 
                             order.status === 'DELIVERED' ? 'Delivered' : 
                             order.status === 'CANCELED' ? 'Cancelled' : order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 ml-5">
                          Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      
                      <div className="flex h-full items-center pl-2 md:pl-0">
                         <ChevronRight className="text-gray-400" size={20} />
                      </div>
                    </div>
                  ))}
                  
                  {/* Status row for Mobile only */}
                  <div className="md:hidden border-t p-3 bg-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                        <span className="font-medium text-xs text-gray-700">
                          {order.status} • {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                     </div>
                     <span className="font-bold text-sm">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
