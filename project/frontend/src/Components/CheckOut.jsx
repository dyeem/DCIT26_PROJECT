import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './Auth/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import loading from '../Assets/Animations/loading.mp4'

//assets
import carticon from '../Assets/cart.png'
import BreadCrumbs from './BreadCrumbs';

export default function CheckOut() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Get data from both sources
    const checkoutData = state?.checkoutData; // From ProductDetails (single item)
    const { userCart } = useAuth(); // From cart (multiple items)

    // Determine which data source to use
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [checkoutSource, setCheckoutSource] = useState(''); // 'direct' or 'cart'

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
        
        if (checkoutData && checkoutData.items && checkoutData.items.length > 0) {
            console.log("Using direct checkout data:", checkoutData.items);
            setCheckoutItems(checkoutData.items);
            setCheckoutSource('direct');
        } else if (userCart && userCart.length > 0) {
            console.log("Using cart data:", userCart);
            setCheckoutItems(userCart);
            setCheckoutSource('cart');
        } else {
            console.log("No items found for checkout");
            setCheckoutItems([]);
            setCheckoutSource('empty');
        }
    }, [checkoutData, userCart]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.phone || !formData.paymentMethod || !formData.address) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (checkoutItems.length === 0) {
            toast.error('No items found for checkout.');
            return;
        }

        try {
            setIsLoading(true); 

            const response = await axios.post(
                'http://localhost/loop_backend/orders/checkout_from_session.php',
                { formData, checkoutItems },
                { withCredentials: true }
            );

            console.log("Response from server:", response);

            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(false); 
                    navigate('/products/checkout/orderconfirmationpage', {
                        state: {
                            formData,
                            checkoutItems,
                            checkoutSource
                        }
                    });
                }, 3000);
            } else {
                toast.error('Failed to place order.');
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error('Something went wrong during checkout.');
            setIsLoading(false);
        }
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
        checkoutItems.forEach(item => {
            const price = parseFloat(item.product_price) || 0;
            const quantity = parseInt(item.product_quantity) || 1;
            subtotal += price * quantity;
        });
        return subtotal;
    }

    function calculateShipping() {
        return 30; 
    }

    function calculateTotal() {
        return calculateSubtotal() + calculateShipping();
    }

    // Function to get checkout type display text
    const getCheckoutTypeText = () => {
        switch(checkoutSource) {
            case 'direct':
                return 'Direct Checkout';
            case 'cart':
                return 'Cart Checkout';
            default:
                return 'Checkout';
        }
    };

    return (
        <>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex flex-col items-center justify-center">
                    <p className="mb-4 text-lg font-medium text-gray-700">Finalizing purchase...</p>
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
                            {/* Show checkout type indicator */}
                            <div className="mt-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    checkoutSource === 'direct' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : checkoutSource === 'cart'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {getCheckoutTypeText()}
                                    {checkoutSource === 'direct' && ' (1 item)'}
                                    {checkoutSource === 'cart' && ` (${checkoutItems.length} items)`}
                                </span>
                            </div>
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
                                                        placeholder="Manila"
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
                                                        placeholder="Metro Manila"
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
                                                        placeholder="1000"
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
                                        {!checkoutItems || checkoutItems.length === 0 ? (
                                            <div className="text-center py-8">
                                                <div className="text-gray-400 mb-4">
                                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                                                        🛒
                                                    </div>
                                                </div>
                                                <p className="text-gray-500 mb-4">No items to checkout</p>
                                                <button 
                                                    onClick={() => navigate("/products")}
                                                    className="text-[#885b56] hover:underline font-medium"
                                                >
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        ) : (
                                            checkoutItems.map((item, index) => (
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
                                                        <p className="text-sm text-gray-500">Qty: {item.product_quantity || 1}</p>
                                                        {checkoutSource === 'direct' && (
                                                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                                                                Direct Purchase
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">₱{item.product_price}</p>
                                                        {item.product_quantity > 1 && (
                                                            <p className="text-xs text-gray-500">
                                                                ₱{item.product_price} × {item.product_quantity}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {checkoutItems && checkoutItems.length > 0 && (
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
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Items ({checkoutItems.length})</span>
                                                    <span className="text-gray-900">
                                                        {checkoutSource === 'direct' ? 'Single Item' : 'Multiple Items'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                                    <span className="text-gray-900">Total</span>
                                                    <span className="text-[#885b56]">₱{calculateTotal().toFixed(2)}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Checkout Type:</span>
                                                    <span className={`font-medium ${
                                                        checkoutSource === 'direct' ? 'text-blue-600' : 'text-green-600'
                                                    }`}>
                                                        {checkoutSource === 'direct' ? 'Direct Purchase' : 'From Cart'}
                                                    </span>
                                                </div>
                                                {checkoutSource === 'direct' && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        This item will not be added to your cart
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type='submit'
                                                onClick={handleSubmit}
                                                className="w-full mt-6 bg-[#885b56] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#69413D] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#885b56] focus:ring-offset-2"
                                            >
                                                {checkoutSource === 'direct' ? 'Place Order (Direct)' : 'Place Order (Cart)'}
                                            </button>

                                            <div className="mt-4 space-y-2">
                                                {checkoutSource === 'direct' && (
                                                    <button
                                                        onClick={() => navigate(-1)}
                                                        className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                    >
                                                        ← Back to Product
                                                    </button>
                                                )}
                                                {checkoutSource === 'cart' && (
                                                    <button
                                                        onClick={() => navigate('/cart')}
                                                        className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                    >
                                                        ← Back to Cart
                                                    </button>
                                                )}
                                            </div>
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