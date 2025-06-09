import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/loop_backend/admin/order/get_all_orders.php', {
      withCredentials: true
    })
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
      });
  }, []);

  const openDialog = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="px-12 py-4">
        <table className="min-w-full text-sm text-left bg-white rounded-lg shadow">
          <thead className="bg-[#7E62FF] text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer ID</th>
              <th className="px-6 py-3">Total Amount</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-900">
            {orders?.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{order.order_id}</td>
                <td className="px-6 py-4">{order.customer_id}</td>
                <td className="px-6 py-4">₱ {order.total_amount}</td>
                <td className="px-6 py-4">{order.order_date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-200 text-green-600' : order.status === 'Shipped' ? 'bg-blue-200 text-blue-600' : order.status === 'Pending' ? 'bg-yellow-200 text-yellow-600' : 'bg-red-200 text-red-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => openDialog(order)} className="bg-[#7E62FF] text-white px-4 py-1 rounded hover:bg-[#624bc7]">
                    View
                  </button>
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
                  <Dialog.Panel className="w-screen max-w-md rounded-l-2xl bg-white shadow-xl">
                    <div className="flex flex-col h-full py-6 overflow-y-auto">
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
                                  className="text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
                                >
                                  ✕
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize 
                                  ${selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-700'
                                    : selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-700'
                                    : selectedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                                    : selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-700'}`}>
                                  {selectedOrder.status}
                                </span>
                                <span className="text-sm text-gray-500">{selectedOrder.order_date}</span>
                              </div>
                            </>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </Dialog.Title>
                      </div>

                      <div className="mt-6 border-t border-gray-200 px-6 pt-4 space-y-6 text-sm text-gray-700">
                        {selectedOrder && (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer ID</span>
                              <span className="font-medium text-gray-900">{selectedOrder.customer_id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total</span>
                              <span className="font-semibold text-gray-900">₱{selectedOrder.total_amount}</span>
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <h3 className="text-base font-semibold text-gray-900 mb-2">Order Items</h3>
                          <ul className="space-y-3 divide-y divide-gray-100">
                            {selectedOrder?.items?.map((item, i) => (
                              <li key={i} className="pt-3 first:pt-0">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium text-gray-900">{item.product_name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-semibold text-gray-700">₱{item.price}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
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
    </>
  );
}
