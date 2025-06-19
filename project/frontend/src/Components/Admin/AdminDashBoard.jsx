import OrderPieChart from './Components/OrderPieChart';
import SalesChart from './Components/SalesChart';
import { useEffect, useState } from 'react';
import { useAdminAuth } from './AdminAuth/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import money from './Components/SVG/money.svg';
import cart from './Components/SVG/cart.svg';
import user from './Components/SVG/users-dash.svg';
import order from './Components/SVG/order-dash.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdminLogin, setIsAdminLogin, setAdmin } = useAdminAuth();
  
  const [dashboardData, setDashboardData] = useState({
    total_earnings: '0.00',
    total_orders: 0,
    total_customers: 0,
    pending_orders: 0,
    earnings_growth: 0,
    orders_growth: 0,
    customers_growth: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  
  useEffect(() => {
    document.title = "Loop | Admin - Dashboard";
    if (isAdminLogin) {
      fetchDashboardData();
      fetchOrderStatusData();
      fetchRecentOrders();
      fetchLatestProducts();
    }
  }, [isAdminLogin]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost/loop_backend/admin/statistics/admin_dashboard_stats.php', {
        withCredentials: true
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStatusData = async () => {
    try {
      const response = await axios.get('http://localhost/loop_backend/admin/statistics/fetch_order_status.php', {
        withCredentials: true
      });

      if (response.data.success) {
        setOrderStatusData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching order status data:', error);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get('http://localhost/loop_backend/admin/statistics/fetch_recent_orders.php', {
        withCredentials: true
      });

      if (response.data.success) {
        setRecentOrders(response.data.data);
        console.log('recent orders: ', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  };

  const fetchLatestProducts = async () => {
    try {
      const response = await axios.get('http://localhost/loop_backend/admin/statistics/fetch_latest_products.php', {
        withCredentials: true
      });

      if (response.data.success) {
        setLatestProducts(response.data.data);
        console.log('latest products: ', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching latest products:', error);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await Promise.all([
      fetchDashboardData(),
      fetchOrderStatusData(),
      fetchRecentOrders(),
      fetchLatestProducts()
    ]);
    toast.success('Dashboard refreshed successfully');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    if (!price) return '₱0.00';
    return `₱${parseFloat(price).toFixed(2)}`;
  };

  if (!isAdminLogin) {
    navigate('/admin/login');
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full p-4 font-roboto rounded-xl min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E62FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-10 font-roboto rounded-xl py-6">
        <div className="w-full flex flex-col justify-center items-start">
        {/* Refresh Button */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            className="px-3 py-2 bg-[#7E62FF] text-white rounded-lg hover:bg-[#6B4FE8] transition-colors flex items-center gap-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        <div className="flex flex-wrap w-full">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 font-poppins">
            {/* Total Earnings Card */}
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">TOTAL EARNINGS</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-3xl font-bold text-gray-900 font-poppins">₱ {dashboardData.total_earnings}</p>
                </div>
                <div className="p-2 bg-gray-200 rounded-full">
                  <img src={money} alt="Money icon" />
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">TOTAL ORDERS</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-3xl font-bold text-gray-900 font-poppins">{dashboardData.total_orders} orders</p>
                </div>
                <div className="p-2 bg-gray-200 rounded-full">
                  <img src={cart} alt="Cart icon" />
                </div>
              </div>
            </div>

            {/* Total Customers Card */}
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">TOTAL CUSTOMERS</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-3xl font-bold text-gray-900 font-poppins">{dashboardData.total_customers} Customers</p>
                </div>
                <div className="p-1 bg-gray-200 rounded-full">
                  <img src={user} alt="User icon" />
                </div>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">PENDING ORDERS</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">{dashboardData.pending_orders} Orders</p>
                  <div className="flex items-center gap-x-1 bg-yellow-400 py-1 max-w-[7rem] justify-center rounded-full">
                    <p className="text-sm text-white">Pending</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-200 rounded-full">
                  <img src={order} alt="Order icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="flex flex-wrap w-full py-8 gap-x-4 font-poppins">
          <div className="flex-1 min-w-0">
            {/* Recent Orders Section */}
            <div className="flex flex-col gap-y-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <p onClick={() => navigate('/admin/orders')} className="text-sm text-[#7E62FF] underline cursor-pointer">View All</p>
              </div>
              
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent orders found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.order_id} className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md">
                      <div className="flex items-center gap-x-4">
                        <div className="p-2 bg-gray-200 rounded-full">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={`/Assets/Products/${order.items[0].product_category}/${order.items[0].product_image.split(',')[0]}`}
                            alt={order.items[0].product_name}
                          />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <p className="text-sm font-medium text-gray-900">{order.items[0].product_name}</p>
                          <p className="text-sm text-gray-500">{order.customer_name}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-1 text-right">
                        <p className="text-sm font-medium text-gray-900">₱{order.total_amount}</p>
                        <p className="text-sm text-gray-500">{dayjs(order.order_date).format('MMMM D, YYYY h:mm A')}</p>
                      </div>
                      <div className="flex flex-col gap-y-1 text-right">
                        <p className="text-sm font-medium text-gray-900">{order.items[0].quantity} item(s)</p>
                        <span className={`px-2 py-1 rounded-full text-sm
                          ${order.status === 'Completed' ? 'p-2 bg-green-200 text-green-600' 
                          : order.status === 'Shipped' ? 'p-2 bg-blue-200 text-blue-600' 
                          : order.status === 'Pending' ? 'p-2 bg-yellow-200 text-yellow-600' 
                          : order.status === 'Refunded' ? 'p-2 bg-gray-200 text-gray-600' 
                          : 'p-2 bg-red-200 text-red-600'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/3">
              {/* Latest Added Products Section */}
              <div className="flex flex-col gap-y-4 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    Latest Products
                  </h3>
                  <p 
                    onClick={() => navigate('/admin/manage-product')} 
                    className="text-sm text-[#7E62FF] underline cursor-pointer hover:text-[#624bc7] transition-colors"
                  >
                    View All
                  </p>
                </div>
                
                {latestProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📦</span>
                    </div>
                    <p className="text-gray-500 text-sm">No products added yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {latestProducts.slice(0, 6).map((product) => (
                      <div key={product.product_id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-shrink-0 p-2 bg-gray-200 rounded-full">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={product.first_image ? 
                              `/Assets/Products/${product.product_category}/${product.first_image}` : 
                              '/Assets/placeholder-product.png'
                            }
                            alt={product.product_name}
                            onError={(e) => {
                              e.target.src = '/Assets/placeholder-product.png';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.product_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.product_category}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-semibold text-[#7E62FF]">
                              ₱{product.product_price}
                            </span>
                            
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Added {product.days_ago}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Stock</p>
                            <p className={`text-sm font-medium ${
                              product.product_quantity > 10 ? 'text-green-600' : 
                              product.product_quantity > 5 ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}>
                              {product.product_quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
