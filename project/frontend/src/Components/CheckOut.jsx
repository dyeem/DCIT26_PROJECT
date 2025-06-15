import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

//assets
import carticon from '../Assets/cart.png'
import BreadCrumbs from './BreadCrumbs';

export default function CheckOut() {
    const navigate = useNavigate()
    const[userCart, setUserCart] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        paymentMethod: '',
        address: '',
        street: '',
        city: '',
        province: '',
        postalCode: '',
        saveBilling: false
    });

    useEffect(() => {
        document.title = `Loop | Checkout`;
    }, []);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost/loop_backend/checkout_session_based.php`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log("Fetched checkout data:", response.data);
                
                if (response.data.success && response.data.items) {
                    setUserCart(response.data.items);
                    console.log("user Cart data:", userCart);

                } else {
                    console.log("No checkout data found");
                    setUserCart([]);
                }
            } catch (error) {
                console.error("Error fetching checkout data:", error);
                setUserCart([]);
            }
        };
        
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form validation here
        if (!formData.email || !formData.phone || !formData.paymentMethod || !formData.address) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Pass both formData and userCart to OCPage
        navigate('/products/checkout/orderconfirmationpage', { 
            state: { 
                formData: formData,
                userCart: userCart 
            } 
        });
    };

    function handleInputChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    }
    
    function calculateSubtotal() {
        let subtotal = 0;
        userCart.forEach(item => {
            subtotal += item.product_price * item.product_quantity;
        });
        return subtotal;
    }

    function calculateShipping() {
        return 30; 
    }

    function calculateTotal() {
        return calculateSubtotal() + calculateShipping();
    }
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <BreadCrumbs/>
                        <button 
                            onClick={() => navigate("/products")} 
                            className='flex items-center text-gray-600 hover:text-[#885b56] transition-colors duration-200 font-medium'
                        >
                            ← Back to Products
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                            <p className="text-gray-600">Complete your order details below</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left side - Form */}
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Contact Information */}
                                    <div className="bg-white rounded-xl shadow-sm border p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                            <div className="w-8 h-8 bg-[#885b56] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                                            Contact Information
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                    placeholder="+63 912 345 6789"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="bg-white rounded-xl shadow-sm border p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                            <div className="w-8 h-8 bg-[#885b56] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                                            Payment Method
                                        </h2>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {[
                                                { id: 'cash', label: 'Cash on Delivery', icon: '💵' },
                                                { id: 'gcash', label: 'GCash', icon: '📱' },
                                                { id: 'credit-card', label: 'Credit Card', icon: '💳' }
                                            ].map((method) => (
                                                <label key={method.id} className="relative">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value={method.id}
                                                        checked={formData.paymentMethod === method.id}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                    />
                                                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                                        formData.paymentMethod === method.id 
                                                            ? 'border-[#885b56] bg-[#885b56]/5' 
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                        <div className="text-center">
                                                            <div className="text-2xl mb-2">{method.icon}</div>
                                                            <div className="text-sm font-medium text-gray-900">{method.label}</div>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="bg-white rounded-xl shadow-sm border p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                            <div className="w-8 h-8 bg-[#885b56] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                                            Shipping Address
                                        </h2>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Street Address *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                    placeholder="123 Main Street"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Apartment, suite, etc. (optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                    placeholder="Apartment, suite, unit, building, floor, etc."
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        City *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                        placeholder="Tanza"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Province *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="province"
                                                        value={formData.province}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                        placeholder="Cavite"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Postal Code *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        value={formData.postalCode}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#885b56] focus:border-transparent transition-all duration-200"
                                                        placeholder="4108"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Billing Information */}
                                    <div className="bg-white rounded-xl shadow-sm border p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                            <div className="w-8 h-8 bg-[#885b56] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                                            Billing Information
                                        </h2>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="saveBilling"
                                                checked={formData.saveBilling}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-[#885b56] border-gray-300 rounded focus:ring-[#885b56]"
                                            />
                                            <span className="text-sm text-gray-700">Same as shipping address</span>
                                        </label>
                                    </div>
                                </form>
                            </div>

                            {/* Right side - Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <img src={carticon} alt="" className="w-6 h-6 mr-3"/>
                                        Order Summary
                                    </h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        {!userCart || userCart.length === 0 ? (
                                            <div className="text-center py-8">
                                                <div className="text-gray-400 mb-4">
                                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                                                        🛒
                                                    </div>
                                                </div>
                                                <p className="text-gray-500 mb-4">No items in cart</p>
                                                <button 
                                                    onClick={() => navigate("/products")}
                                                    className="text-[#885b56] hover:underline font-medium"
                                                >
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        ) : (
                                            userCart.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                                    <img
                                                        src={`/Assets/Products/${item.product_category}/${item.product_image}`}
                                                        alt={item.product_name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            {item.product_color} • {item.product_size}
                                                        </p>
                                                        <p className="text-sm text-gray-500">Qty: {item.product_quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">₱{item.product_price}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {userCart && userCart.length > 0 && (
                                        <>
                                            {/* Order Totals */}
                                            <div className="border-t pt-4 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Subtotal</span>
                                                    <span className="text-gray-900">₱{calculateSubtotal().toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Shipping</span>
                                                    <span className="text-gray-900">₱{calculateShipping().toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                                    <span className="text-gray-900">Total</span>
                                                    <span className="text-[#885b56]">₱{calculateTotal().toFixed(2)}</span>
                                                </div>
                                            </div>

                                            {/* Place Order Button */}
                                            <button
                                                onClick={handleSubmit}
                                                className="w-full mt-6 bg-[#885b56] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#69413D] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#885b56] focus:ring-offset-2"
                                            >
                                                Place Order
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}