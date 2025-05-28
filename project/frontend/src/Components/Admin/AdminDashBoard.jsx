import OrderPieChart from './Components/OrderPieChart';
import SalesChart from './Components/SalesChart';
import { useEffect } from 'react';
import { useAdminAuth } from './AdminAuth/AdminAuthContext';
import { useNavigate } from 'react-router-dom';


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
                  <svg viewBox="0 0 24 24" width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.9199 16.7486C21.5899 19.4086 19.4099 21.5886 16.7499 21.9186C15.1399 22.1186 13.6399 21.6786 12.4699 20.8186C11.7999 20.3286 11.9599 19.2886 12.7599 19.0486C15.7699 18.1386 18.1399 15.7586 19.0599 12.7486C19.2999 11.9586 20.3399 11.7986 20.8299 12.4586C21.6799 13.6386 22.1199 15.1386 21.9199 16.7486Z" fill="#7E62FF"></path> <path d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z" fill="#7E62FF"></path> </g>
                  </svg>
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
                  <svg viewBox="0 0 24 24" width="45" height="45" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#7E62FF" stroke-width="1.5"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#7E62FF" stroke-width="1.5"></path> <path d="M11 10.8L12.1429 12L15 9" stroke="#7E62FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" stroke="#7E62FF" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
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
                  <svg fill="#7E62FF" width="55" height="55" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" stroke="#7E62FF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <ellipse cx="41.3" cy="42.3" rx="12.2" ry="13.5"></ellipse> <path d="M52.6,57.4c-3.1,2.8-7,4.5-11.3,4.5c-4.3,0-8.3-1.7-11.3-4.6c-5.5,2.5-11,5.7-11,10.7v2.1 c0,2.5,2,4.5,4.5,4.5h35.7c2.5,0,4.5-2,4.5-4.5v-2.1C63.6,63,58.2,59.9,52.6,57.4z"></path> <path d="M68,47.4c-0.2-0.1-0.3-0.2-0.5-0.3c-0.4-0.2-0.9-0.2-1.3,0.1c-2.1,1.3-4.6,2.1-7.2,2.1c-0.3,0-0.7,0-1,0 c-0.5,1.3-1,2.6-1.7,3.7c0.4,0.2,0.9,0.3,1.4,0.6c5.7,2.5,9.7,5.6,12.5,9.8H75c2.2,0,4-1.8,4-4v-1.9C79,52.6,73.3,49.6,68,47.4z"></path> <path d="M66.9,34.2c0-4.9-3.6-8.9-7.9-8.9c-2.2,0-4.1,1-5.6,2.5c3.5,3.6,5.7,8.7,5.7,14.4c0,0.3,0,0.5,0,0.8 C63.4,43,66.9,39.1,66.9,34.2z"></path> </g></svg>
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
                  <svg viewBox="0 0 1024 1024" width="45" height="45" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#7E62FF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M182.99 146.2h585.14v402.29h73.14V73.06H109.84v877.71H512v-73.14H182.99z" fill="#7E62FF"></path><path d="M256.13 219.34h438.86v73.14H256.13zM256.13 365.63h365.71v73.14H256.13zM256.13 511.91h219.43v73.14H256.13zM731.55 585.06c-100.99 0-182.86 81.87-182.86 182.86s81.87 182.86 182.86 182.86c100.99 0 182.86-81.87 182.86-182.86s-81.86-182.86-182.86-182.86z m0 292.57c-60.5 0-109.71-49.22-109.71-109.71 0-60.5 49.22-109.71 109.71-109.71 60.5 0 109.71 49.22 109.71 109.71 0.01 60.49-49.21 109.71-109.71 109.71z" fill="#7E62FF"></path><path d="M758.99 692.08h-54.86v87.27l69.39 68.76 38.61-38.96-53.14-52.66z" fill="#7E62FF"></path></g></svg>
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
