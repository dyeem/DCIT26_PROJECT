import checkicon from '../Assets/check.png'
import housepin from '../Assets/housepin.png'
import tel from '../Assets/tel.png'
import barcode from '../Assets/barcode.png'

import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './Auth/AuthContext'
import BreadCrumbs from './BreadCrumbs'
import axios from 'axios'

export default function OCPage() {
    const { user, refreshCart } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost/loop_backend/session_check_users.php', {
            withCredentials: true,
        })
        .then(res => {
            if (!res.data.loggedIn) {
                navigate('/login');
            }
        })
        .catch(err => console.error("Session check failed:", err));
    }, []);

    useEffect(() => {
        document.title = `Loop | Order Confirmation`;
    }, []);

    const { state } = location;
    const formData = state?.formData;
    const checkoutItems = state?.checkoutItems; 
    const checkoutSource = state?.checkoutSource; 

    console.log("formData:", formData)
    console.log("checkoutItems:", checkoutItems)
    console.log("checkoutSource:", checkoutSource)

    if (!formData || !checkoutItems || checkoutItems.length === 0) {
        console.log("Missing data, redirecting to checkout");
        navigate('/checkout');
        return null;
    }

    async function handleClearUserCart() {
        if (checkoutSource === 'cart') {
            try {
                await fetch('http://localhost/loop_backend/checkout_session_based.php', {
                    method: 'DELETE',
                    credentials: 'include'
                });
                await refreshCart();
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        }
        navigate('/');
    }

    const calculateSubtotal = () => {
        return checkoutItems.reduce((total, item) => {
            const price = parseFloat(item.product_price) || 0;
            const quantity = parseInt(item.product_quantity) || 1;
            return total + (price * quantity);
        }, 0);
    };

    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    
    
    return (
        <>
            <div className='min-h-screen bg-gray-100'>
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4">
                        <BreadCrumbs/>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                                <img src={checkicon} alt="" className='w-10 h-10'/>
                            </div>
                            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Order Confirmed!</h1>
                            <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
                        </div>

                        {/* Order Number Card */}
                        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-1">Order Number</h2>
                                    <p className="text-2xl font-bold text-[#885b56]">#{orderNumber}</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <p className="text-sm text-gray-600">Order Date</p>
                                    <p className="font-semibold text-gray-900">{new Date().toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Order Details */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Confirmation Message */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirmation Details</h2>
                                    <div className="space-y-4 text-gray-700">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>We've sent a confirmation email with your order details to <span className="font-semibold text-gray-900">{formData.email}</span></p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>For in-store order pickups, please bring the confirmation email and your photo ID.</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p>You can track your order status by logging into your account or using the order number provided above.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Information */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <img src={housepin} alt="" className="w-6 h-6 mr-3"/>
                                        Shipping Information
                                    </h2>
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-900">Home Delivery</span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Standard</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">
                                            <span className='font-medium'>Shipping to:</span><br/>
                                            {formData.address}<br/>
                                            {formData.street && `${formData.street}, `}
                                            {formData.city}, {formData.province} {formData.postalCode}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className='font-medium'>Estimated Delivery:</span> 3-4 Business Days
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-between">
                                        <span>Order Items</span>
                                        <span className="text-sm font-normal text-gray-500">
                                            {checkoutItems.length} item{checkoutItems.length > 1 ? 's' : ''}
                                        </span>
                                    </h2>
                                    <div className="space-y-4">
                                        {checkoutItems.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                                <img 
                                                    src={`/Assets/Products/${item.product_category}/${item.product_image}`} 
                                                    alt={item.product_name} 
                                                    className='w-20 h-20 object-cover rounded-lg'
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1">{item.product_name}</h3>
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <p><span className="font-medium">Category:</span> {item.product_category}</p>
                                                        <p><span className="font-medium">Size:</span> {item.product_size}</p>
                                                        <p><span className="font-medium">Color:</span> {item.product_color}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-[#885b56]">₱{item.product_price}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.product_quantity || 1}</p>
                                                    {(item.product_quantity || 1) > 1 && (
                                                        <p className="text-xs text-gray-400">
                                                            ₱{item.product_price} × {item.product_quantity || 1}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary & Actions */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Order Summary */}
                                <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-gray-700">
                                            <span>Subtotal:</span>
                                            <span className="font-semibold">₱{calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Shipping:</span>
                                            <span className="font-semibold">₱30.00</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Tax:</span>
                                            <span className="font-semibold">₱0.00</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Items:</span>
                                            <span className="font-semibold">{checkoutItems.length}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                                <span>Total:</span>
                                                <span className="text-[#885b56]">₱{(calculateSubtotal() + 30).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="border-t pt-4 mb-6">
                                        <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                                        <p className="font-semibold text-gray-900 capitalize">{formData.paymentMethod?.replace('-', ' ')}</p>
                                    </div>

                                    {/* Barcode */}
                                    <div className="text-center mb-6">
                                        <img src={barcode} alt="Order Barcode" className="mx-auto mb-2"/>
                                        <p className="text-xs text-gray-500">Scan for quick reference</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button className='w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200'>
                                            📄 Print Order Details
                                        </button>
                                        <button 
                                            onClick={() => navigate('/products')} 
                                            className='w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200'
                                        >
                                             Continue Shopping
                                        </button>
                                        <button className='w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center'>
                                            <img src={tel} alt="" className='w-4 h-4 mr-2'/>
                                            +63 13456798
                                        </button>
                                        <button 
                                            onClick={() => handleClearUserCart()} 
                                            className='w-full py-3 px-4 bg-[#885b56] text-white rounded-lg font-semibold hover:bg-[#69413D] transition-colors duration-200'
                                        >
                                             Back to Home
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}