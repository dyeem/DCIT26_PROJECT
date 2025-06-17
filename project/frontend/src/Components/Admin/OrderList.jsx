import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading from '../../Assets/Animations/loading.mp4'
import { Menu } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SortIcon from '@mui/icons-material/Sort';
import RefreshIcon from '@mui/icons-material/Refresh';

import dayjs from 'dayjs';
import axios from 'axios';
import useravatar from '../../Assets/admin/user-avatar.png'
import dot from '../../Assets/admin/dot.png'
import shipped from '../../Assets/admin/shipped.png'
import completed from '../../Assets/admin/completed.png'
import cancelled  from '../../Assets/admin/cancelled.png'
import refund from '../../Assets/admin/refund.png'

// Mock Data for demonstration
const mockOrders = [
  {
    order_id: 'ORD001',
    customer_id: 'CUST101',
    total_amount: 599.98,
    order_date: '2025-01-15',
    status: 'Completed',
    items: [
      { product_name: 'Shirt', quantity: 2, price: 199.99 },
      { product_name: 'Cap', quantity: 1, price: 199.99 }
    ]
  },
  {
    order_id: 'ORD002',
    customer_id: 'CUST102',
    total_amount: 599.98,
    order_date: '2025-01-15',
    status: 'Shipped',
    items: [
      { product_name: 'Shirt', quantity: 2, price: 199.99 },
      { product_name: 'Cap', quantity: 1, price: 199.99 }
    ]
  },
  {
    order_id: 'ORD003',
    customer_id: 'CUST103',
    total_amount: 599.98,
    order_date: '2025-01-15',
    status: 'Pending',
    items: [
      { product_name: 'Shirt', quantity: 2, price: 199.99 },
      { product_name: 'Cap', quantity: 1, price: 199.99 }
    ]
  },
  {
    order_id: 'ORD004',
    customer_id: 'CUST104',
    total_amount: 599.98,
    order_date: '2025-01-15',
    status: 'Cancelled',
    items: [
      { product_name: 'Shirt', quantity: 2, price: 199.99 },
      { product_name: 'Cap', quantity: 1, price: 199.99 }
    ]
  }
  
];

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [toastError, setToastError] = useState(
    {
      message: '',
      isOpen: false,
    },
  );

  //error toast
  const showToastError = (msg) => {
    setToastError({ message: msg, isOpen: true });

    toast.error(msg, {
      position: 'bottom-center',
      icon: '⚠️',
      style: {
        background: '#1f2937',     
        color: '#f87171',          
        borderRadius: '8px',       
        border: '1px solid #ef4444', 
        padding: '12px 16px',
      },
    });
  };
  
  //FETCHING ALL ORDERS FROM ORDER TABLE
  useEffect(() => {
    axios.get('http://localhost/loop_backend/admin/order/get_all_orders.php', {
      withCredentials: true
    })
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data); // Initialize filtered orders
        console.log('all orders: ', res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
      });
  }, []);

  //DIALOG VIEWING SPECIFIC ORDER
  const openDialog = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  //CLOSE DIALOG VIEWING SPECIFIC ORDER
  const closeDialog = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const handleOpenCancelModal = (orderId, orderStatus) => {

    if (orderStatus === 'Cancelled') {
      showToastError('This order is already cancelled!');
      return;
    }

    if (orderStatus === 'Completed') {
      showToastError('This order is already completed!');;
      return;
    }
    setSelectedOrderId(orderId);
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    updateOrderStatus(selectedOrderId, 'Active', 'Cancelled'); // 'Active' could be dynamic if needed
  };

  const updateOrderStatus = (orderId, currentStatus, newStatus) => {
    if (currentStatus === newStatus) {
      showToastError(`Order is already marked as "${newStatus}".`);
      return;
    }

    if (currentStatus === 'Cancelled') {
      showToastError('This order is already cancelled!');
      return;
    }

    if (currentStatus === 'Completed') {
      showToastError('This order is already completed!');;
      return;
    }

    setCancelModalOpen(false);
    setIsOpen(false);

    // Update both orders and filteredOrders
    const updatedOrders = orders.map((order) =>
      order.order_id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    // Update filtered orders based on current filter
    if (selectedStatusFilter === 'All') {
      setFilteredOrders(updatedOrders);
    } else {
      const filtered = updatedOrders.filter(order => order.status === selectedStatusFilter);
      setFilteredOrders(filtered);
    }

    axios.post('http://localhost/loop_backend/admin/order/update_status_order.php', {
      order_id: orderId,
      status: newStatus,
    },{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
        console.log(`Order ${orderId} marked as ${newStatus}.`, res.data);
      })
      .catch((err) => {
        console.error('Failed to update order status:', err);
        showToastError('Failed to update order status');
      });

  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleRefresh() {
    setIsRefreshing(true);

    axios.get('http://localhost/loop_backend/admin/order/get_all_orders.php', {
      withCredentials: true
    })
      .then((res) => {
        setOrders(res.data);
        
        // Apply current filter to refreshed data
        if (selectedStatusFilter === 'All') {
          setFilteredOrders(res.data);
        } else {
          const filtered = res.data.filter(order => order.status === selectedStatusFilter);
          setFilteredOrders(filtered);
        }
        
        console.log('All orders:', res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
        toast.error('Failed to refresh orders.');
      })
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 1000); 
      });
  }

  function handleSortByDate(order = 'desc') {
    const sorted = [...filteredOrders].sort((a, b) => {
      if (order === 'desc') {
        return new Date(b.order_date) - new Date(a.order_date);
      } else {
        return new Date(a.order_date) - new Date(b.order_date);
      }
    });
    setFilteredOrders(sorted);
  }

  function handleSortByStatus() {
    const statusPriority = {
      'Pending': 1,
      'Shipped': 2,
      'Completed': 3,
      'Cancelled': 4,
    };

    const sorted = [...orders].sort((a, b) => {
      return (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99);
    });

    setOrders(sorted);
  }
  function handleFilterByStatus(status) {
    setSelectedStatusFilter(status);
    
    if (status === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  }


  return (
    <>
      {isRefreshing && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex flex-col items-center justify-center">
            <p className="mb-4 text-lg font-medium text-gray-700">Hang tight, fetching the latest data...</p>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-32 h-32 object-contain"
                >
                <source src={loading} type="video/webm" />
            </video>
        </div>
      )}
      <div className="px-12 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Order List</h1>
          <div className="flex gap-3 flex-wrap items-center">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                <CalendarTodayIcon fontSize="small" />
                Sort by Date
                <ChevronDown className="w-4 h-4" />
              </Menu.Button>
              <Menu.Items className="text-white absolute mt-2 w-44 origin-top-right bg-blue-500 border rounded-md shadow-lg z-10">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleSortByDate('asc')}
                      className={`w-full text-left px-4 py-2 ${active ? 'bg-blue-100 text-gray-700' : ''}`}
                    >
                      Oldest First
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleSortByDate('desc')}
                      className={`w-full text-left px-4 py-2 ${active ? 'bg-blue-100 text-gray-700' : ''}`}
                    >
                      Newest First
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
                <SortIcon fontSize="small" />
                Filter by Status ({selectedStatusFilter})
                <ChevronDown className="w-4 h-4" />
              </Menu.Button>
              <Menu.Items className="absolute mt-2 w-44 origin-top-right text-white bg-yellow-500 border rounded-md shadow-lg z-10">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilterByStatus('All')}
                      className={`w-full text-left px-4 py-2 ${active ? 'bg-yellow-100 text-gray-700' : ''} ${selectedStatusFilter === 'All' ? 'font-bold' : ''}`}
                    >
                      All Orders
                    </button>
                  )}
                </Menu.Item>
                {['Pending', 'Shipped', 'Completed', 'Cancelled'].map((status) => (
                  <Menu.Item key={status}>
                    {({ active }) => (
                      <button
                        onClick={() => handleFilterByStatus(status)}
                        className={`w-full text-left px-4 py-2 ${active ? 'bg-yellow-100 text-gray-700' : ''} ${selectedStatusFilter === status ? 'font-bold' : ''}`}
                      >
                        {status} Only
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 rounded-lg shadow text-white hover:bg-green-600"
            >
              <RefreshIcon fontSize="small" />
              Refresh List
            </button>
          </div>
        </div>
        <table className="min-w-full text-sm text-left bg-white rounded-lg shadow">
          <thead className="bg-[#7E62FF] text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer ID</th>
              <th className="px-6 py-3">Total Amount</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-900">
            {filteredOrders?.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{order.order_id}</td>
                <td className="px-6 py-4">{order.customer_id}</td>
                <td className="px-6 py-4">₱ {order.total_amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4">{dayjs(order.order_date).format('MMMM D, YYYY h:mm A')}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full 
                    ${order.status === 'Completed' ? 'p-2 bg-green-200 text-green-600' 
                    : order.status === 'Shipped' ? 'p-2 bg-blue-200 text-blue-600' 
                    : order.status === 'Pending' ? 'p-2 bg-yellow-200 text-yellow-600' 
                    : order.status === 'Refund' ? 'p-2 bg-gray-200 text-gray-600' 
                    : 'p-2 bg-red-200 text-red-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center items-center">
                  {/* <button onClick={() => openDialog(order)} className="bg-[#7E62FF] text-white px-4 py-1 rounded hover:bg-[#624bc7]">
                    View
                  </button> */}
                  <img onClick={() => openDialog(order)} src={dot} alt="" className="cursor-pointer w-6 h-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 sm:duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md rounded-l-2xl bg-[#FFFFFF] shadow-xl">
                    <div className="flex flex-col h-[calc(100vh-9rem)] py-6 overflow-y-auto">
                      <div className="px-6">
                        <Dialog.Title className="space-y-4">
                          {selectedOrder ? (
                            <>
                              <div className="flex items-center justify-between">
                                <div>
                                  <h2 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.order_id}</h2>
                                </div>
                                <button
                                  onClick={closeDialog}
                                  className="text-gray-800 text-2xl hover:text-gray-700 transition px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-400"
                                >
                                  ✕
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize 
                                  ${selectedOrder.status === 'Completed' ? 'p-2 bg-green-100 text-green-700 border border-green-300'
                                    : selectedOrder.status === 'Shipped' ? 'p-2 bg-blue-100 text-blue-700 border border-blue-300'
                                    : selectedOrder.status === 'Pending' ? 'p-2 bg-yellow-100 text-yellow-700 border border-yellow-300'
                                    : selectedOrder.status === 'Cancelled' ? 'p-2 bg-red-100 text-red-700 border border-red-300'
                                    : 'bg-gray-100 text-gray-700'}`}>
                                  {selectedOrder.status}
                                </span>
                                <span className="text-sm text-gray-600">{dayjs(selectedOrder.order_date).format('MMMM D, YYYY h:mm A')}</span>
                              </div>
                            </>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </Dialog.Title>
                      </div>

                      <div className="mt-6 border-t border-gray-300 px-6 pt-4 space-y-6 text-sm text-gray-700">
                        {selectedOrder && (
                          <div className="space-y-2">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <div className="">
                                <img src={useravatar} alt="" className='w-40 h-40 object-cover rounded-full bg-gray-300 p-3' />
                              </div>
                              <div className="flex flex-row items-center justify-center gap-x-1 text-2xl font-semibold">
                                <p>{selectedOrder.customer_first_name}</p>
                                <p>{selectedOrder.customer_last_name}</p>
                              </div>
                              <div className="flex flex-col items-center justify-center text-sm text-gray-500">
                                <p>{selectedOrder.customer_email}</p>
                                <p>{selectedOrder.shipping.phone}</p>
                                <p>{selectedOrder.shipping.address}</p>
                                <p>{selectedOrder.shipping.city}, {selectedOrder.shipping.province}</p>
                                <p>{selectedOrder.shipping.postal_code}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 border-t border-gray-300">
                          <h3 className="text-base font-semibold text-gray-900 mb-2 mt-2">Order Items</h3>
                          <ul className="space-y-3 divide-y divide-gray-400">
                            {selectedOrder?.items?.map((item, i) => (
                              <li key={i} className="pt-3 first:pt-0">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <img src={`/Assets/Products/${item.category}/${item.image}`} alt={item.image} className="w-20 h-20 object-cover rounded-md bg-gray-100 p-2" />
                                    <div className="flex flex-col">
                                      <p className="font-medium text-gray-900">{item.product_name}</p>
                                      <p className="font-medium text-gray-900">{item.category}</p>
                                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm font-semibold text-gray-700">₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 border-t border-gray-300">
                          <h3 className="text-base font-semibold text-gray-900 mb-2 mt-2">Order Summary</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Subtotal:</p>
                            <p className="text-sm font-semibold text-gray-700">₱{(selectedOrder?.total_amount?? 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Shipping:</p>
                            <p className="text-sm font-semibold text-gray-700">₱30.00</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Tax:</p>
                            <p className="text-sm font-semibold text-gray-700">₱0.00</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-bold text-gray-700">Total:</p>
                            <p className="text-sm font-semibold text-gray-700">
                              ₱{(parseFloat(selectedOrder?.total_amount ?? 0) + 30).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                   <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-6 py-4 shadow-[0_-2px_6px_rgba(0,0,0,0.05)]">
                      <div className="flex flex-col space-y-3">
                        <p className="text-sm font-semibold text-gray-800 text-center">Update Order Status</p>
                        <div className="flex flex-col justify-center items-center w-full space-y-2">
                          <div className="grid grid-cols-3 gap-3">
                            <button
                              onClick={() => updateOrderStatus(selectedOrder.order_id, selectedOrder.status, 'Shipped')}
                              className="flex flex-row justify-center items-center gap-x-1 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                            >
                              Shipped
                              <img src={shipped} alt="" className='w-6 h-6' />
                            </button>
                            <button
                              onClick={() => updateOrderStatus(selectedOrder.order_id, selectedOrder.status, 'Completed')}
                              className="flex flex-row justify-center items-center gap-x-1 w-full bg-green-600 hover:bg-green-700 text-white  py-2 px-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                            >
                              Completed
                              <img src={completed} alt="" className='w-6 h-6' />
                            </button>
                            <button
                              onClick={() => handleOpenCancelModal(selectedOrder.order_id, selectedOrder.status)}
                              className="flex flex-row justify-center items-center gap-x-1 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                            >
                              Cancelled
                              <img src={cancelled} alt="" className='w-6 h-6' />
                            </button>
                          </div>
                          <button 
                            onClick={() => updateOrderStatus(selectedOrder.order_id, selectedOrder.status, 'Refund')}
                            className="flex flex-row justify-center items-center gap-x-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md">
                            Refund
                            <img src={refund} alt="" className='w-6 h-6' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Modal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        aria-labelledby="cancel-order-title"
        aria-describedby="cancel-order-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: 8,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            id="cancel-order-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', mb: 2 }}
            className='text-red-500'
          >
            🚫 Cancel This Order?
          </Typography>

          <Typography
            id="cancel-order-description"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            You're about to cancel <strong className='underline'>Order #{selectedOrderId}</strong>. This action cannot be undone.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCancelModalOpen(false)}
              sx={{ px: 3, py: 1.5, borderRadius: 2, fontWeight: 500 }}
            >
              No, Keep Order
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleCancelConfirm}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)',
              }}
            >
              Yes, Cancel It
            </Button>
          </Box>
        </Box>
      </Modal>

    </>
  );
}
