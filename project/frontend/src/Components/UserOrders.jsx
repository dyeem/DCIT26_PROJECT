import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Package, Calendar, Truck, CheckCircle, Clock, XCircle, Eye, MapPin, Phone } from 'lucide-react'
import { useAuth } from './Auth/AuthContext'
import loadingvid from '../Assets/Animations/loading.mp4'
import RefreshIcon from '@mui/icons-material/Refresh';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const navigate = useNavigate()

    const { isLogin, user } = useAuth()
    
    console.log('user: ', user)
    console.log('Loggedin: ', isLogin)

    useEffect(() => {
        CheckUserLogin()
    }, [])

    const CheckUserLogin = async () => {
        try {
            const res = await axios.get('http://localhost/loop_backend/session_check_users.php', {
                withCredentials: true,
            })
            if (res.data.loggedIn) {
                fetchUserOrders()
            } else {
            }
        } catch (err) {
            console.error("Session check failed:", err)
        }
    }

    const fetchUserOrders = async () => {
        try {
            setIsRefreshing(true);
            setError(null)
            
            const response = await axios.get('http://localhost/loop_backend/orders/fetch_user_orders.php', {
                withCredentials: true,
            })
            
            if (response.data.success) {
                setOrders(response.data.orders || [])
                console.log('orders: ', response.data.orders)
            } else {
                throw new Error(response.data.message || 'Failed to fetch orders')
            }
        } catch (err) {
            console.error('Fetch orders error:', err)
            setError(err.response?.data?.message || err.message || 'Failed to fetch orders')
            if (err.response?.status === 401) {
                navigate('/')
            }
        } finally {
            setIsRefreshing(false)
        }
    }

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />
            case 'shipped':
                return <Truck className="w-5 h-5 text-blue-500" />
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />
            default:
                return <Clock className="w-5 h-5 text-gray-500" />
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-blue-200'
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatPrice = (price) => {
        if (!price) return '₱0.00';
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(price);
    };

    const getFirstImage = (imageString) => {
        if (!imageString) return null;
        const images = imageString.split(',');
        return images[0].trim();
    };

    const openOrderModal = (order) => {
        setSelectedOrder(order)
        console.log('selected order: ', order)
        setShowModal(true)
    }

    const closeOrderModal = () => {
        setSelectedOrder(null)
        setShowModal(false)
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Orders</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchUserOrders}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await fetchUserOrders();
            setTimeout(() => {
                setIsRefreshing(false);
                console.log("Orders refreshed successfully");
            }, 1000);
        } catch (error) {
            console.log("Error refreshing orders:", error);
            toast.error("Error refreshing orders");
            setIsRefreshing(false);
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
                        <source src={loadingvid} type="video/webm" />
                    </video>
                </div>
            )}
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                            <p className="text-gray-600">Track and manage your order history</p>
                        </div>
                        <div className="">
                            <button
                                onClick={handleRefresh}
                                className="flex items-center gap-2 px-3 py-2 bg-green-500 rounded-lg shadow text-white hover:bg-green-600"
                            >
                                <RefreshIcon fontSize="small" />
                                Refresh List
                            </button>
                        </div>
                    </div>

                    {/* Orders List */}
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
                            <p className="text-gray-600">You haven't placed any orders yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.order_id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                            {/* Order Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-gray-500" />
                                                        <span className="font-semibold text-gray-900">
                                                            Order #{order.order_id}
                                                        </span>
                                                    </div>
                                                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                        <div className="flex items-center gap-1">
                                                            {getStatusIcon(order.status)}
                                                            {order.status || 'Pending'}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Ordered: {formatDate(order.order_date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <p>₱</p>
                                                        <span>Total: {formatPrice(order.total_amount)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Package className="w-4 h-4" />
                                                        <span>Items: {order.items_count || 0}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 lg:mt-0 lg:ml-6">
                                                <button
                                                    onClick={() => openOrderModal(order)}
                                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Order Details Modal */}
                    {showModal && selectedOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Order Details #{selectedOrder.order_id}
                                        </h2>
                                        <button
                                            onClick={closeOrderModal}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <XCircle className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Order Status */}
                                    <div className="mb-6">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                                            {getStatusIcon(selectedOrder.status)}
                                            {selectedOrder.status || 'Pending'}
                                        </div>
                                    </div>

                                    {/* Order Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <p className="text-gray-500"><span className="text-gray-600">Order Date:</span> {formatDate(selectedOrder.order_date)}</p>
                                                <p className="text-gray-500"><span className="text-gray-600">Total Amount:</span> {formatPrice(selectedOrder.total_amount)}</p>
                                                <p className="text-gray-500 capitalize"><span className="text-gray-600">Payment Method:</span> {selectedOrder.payment_method || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                                    <div>
                                                        <p className="text-gray-500"><span className="text-gray-600">Address:</span> {selectedOrder.shipping_address || 'N/A'}</p>
                                                        <p className="text-gray-500"><span className="text-gray-600">City:</span> {selectedOrder.shipping_city || 'N/A'}</p>
                                                        <p className="text-gray-500"><span className="text-gray-600">Phone:</span> {selectedOrder.shipping_phone || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    {selectedOrder.items && selectedOrder.items.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                                            <div className="space-y-3">
                                                {selectedOrder.items.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            {getFirstImage(item.product_image) && (
                                                                <img 
                                                                    src={`/Assets/Products/${item.product_category}/${getFirstImage(item.product_image)}`} 
                                                                    alt={item.product_name}
                                                                    className="w-12 h-12 object-cover rounded-lg"
                                                                />
                                                            )}
                                                            <div>
                                                                <p className="font-medium text-gray-900">{item.product_name}</p>
                                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-semibold text-gray-900">
                                                            {formatPrice(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}