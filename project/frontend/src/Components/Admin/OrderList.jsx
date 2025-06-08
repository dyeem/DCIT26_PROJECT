import { useState, useEffect } from 'react';

// ✅ Mock data
const mockOrders = [
  {
    order_id: 'ORD001',
    customer_id: 'CUST101',
    total_amount: 599.98,
    order_date: '2025-01-15',
    status: 'Completed'
  },
  {
    order_id: 'ORD002',
    customer_id: 'CUST102',
    total_amount: 299.50,
    order_date: '2025-01-16',
    status: 'Pending'
  },
  {
    order_id: 'ORD003',
    customer_id: 'CUST103',
    total_amount: 449.75,
    order_date: '2025-01-17',
    status: 'Processing'
  },
  {
    order_id: 'ORD004',
    customer_id: 'CUST104',
    total_amount: 199.99,
    order_date: '2025-01-18',
    status: 'Shipped'
  },
  {
    order_id: 'ORD005',
    customer_id: 'CUST105',
    total_amount: 749.25,
    order_date: '2025-01-19',
    status: 'Completed'
  },
  {
    order_id: 'ORD006',
    customer_id: 'CUST106',
    total_amount: 149.50,
    order_date: '2025-01-20',
    status: 'Cancelled'
  }
];

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Loop | Manage Orders';
  }, []);

  // Simulate data fetching
  useEffect(() => {
    const fetchOrders = () => {
      setTimeout(() => {
        try {
          // Simulate successful fetch
          setOrders(mockOrders);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch orders.');
          setLoading(false);
        }
      }, 1000); // Simulate network delay
    };

    fetchOrders();
  }, []);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-800">Error: {error}</p>
        <button
          onClick={retryFetch}
          className="px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-12 py-4 font-roboto">
      <div className="flex flex-col mt-[2rem] w-full max-w-8xl overflow-x-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs font-semibold text-white uppercase bg-[#7E62FF]">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Customer ID</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
                <th scope="col" className="px-6 py-3">Order Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{order.order_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₱{order.total_amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.order_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-white hover:text-white bg-[#7E62FF] hover:bg-[#624bc7] px-3 py-1 rounded-lg">
                        View
                      </button>
                      <button className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700 hover:text-white">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}