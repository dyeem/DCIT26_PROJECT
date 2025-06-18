import OrderPieChart from './Components/OrderPieChart';
import SalesChart from './Components/SalesChart';
import { useEffect } from 'react';
import { useAdminAuth } from './AdminAuth/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import money from './Components/SVG/money.svg';
import cart from './Components/SVG/cart.svg';
import user from './Components/SVG/users.svg';
import order from './Components/SVG/orders.svg';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdminLogin, setIsAdminLogin, setAdmin } = useAdminAuth();  
  
  useEffect(() => {
    document.title = "Loop | Admin - Dashboard";
  }, []);


  if(!isAdminLogin) {
    navigate('/admin/login');
  }

  return (
    <div className="flex items-center justify-center w-full p-4 font-roboto rounded-xl">
      <div className="mt-[2rem] max-w-9xl flex flex-col justify-center items-center">
        <div className="flex flex-wrap w-full">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">TOTAL EARNINGS</p>
                <p className="text-sm text-[#7E62FF] underline">Detail</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">₱ 666.60</p>
                  <div className="flex items-center gap-x-1 bg-[#36c069] py-1 max-w-[7rem] justify-center rounded-full">
                    <p>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke="#ffffff " stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                      </svg>
                    </p>
                    <p className="text-sm text-white">+1.23%</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-200 rounded-full ">
                  <img src={money} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">TOTAL ORDERS</p>
                <p className="text-sm text-[#7E62FF] underline">Detail</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">106 orders</p>
                  <div className="flex items-center gap-x-1 bg-[#36c069] py-1 max-w-[7rem] justify-center rounded-full">
                    <p>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke="#ffffff " stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                      </svg>
                    </p>
                    <p className="text-sm text-white">+1.23%</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-200 rounded-full">
                  <img src={cart} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">TOTAL CUSTOMER</p>
                <p className="text-sm text-[#7E62FF] underline">Detail</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">660 Customers</p>
                  <div className="flex items-center gap-x-1 bg-[#36c069] py-1 max-w-[7rem] justify-center rounded-full">
                    <p>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke="#ffffff " stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                      </svg>
                    </p>
                    <p className="text-sm text-white">+1.23%</p>
                  </div>
                </div>
                <div className="p-1 bg-gray-200 rounded-full">
                  <img src={user} />
                  
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-6 px-8 py-6 bg-[#faf8f8] shadow-lg rounded-lg">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">PENDING ORDERS</p>
                <p className="text-sm text-[#7E62FF] underline">Detail</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-6">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">666 Orders</p>
                  <div className="flex items-center gap-x-1 bg-[#D73A00] py-1 max-w-[7rem] justify-center rounded-full">
                    <p className="text-sm text-white">Pending</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-200 rounded-full">
                  <img src={order} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full py-8 gap-x-4 font-poppins">
          <SalesChart/>
          <OrderPieChart/>
        </div>
      </div>
    </div>
  )
}
