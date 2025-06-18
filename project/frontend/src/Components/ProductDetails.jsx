import { Link, useLoaderData, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from './Auth/AuthContext';
import axios from "axios";

export default function ProductDetails() {
    const navigate = useNavigate();
    const { user, refreshCart, cartLoading} = useAuth();
    const product = useLoaderData()
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        product_id: product?.product_id || '',
        product_name: product?.product_name || '',
        product_category: product?.product_category || '',
        product_price: product?.product_price || '',
        product_image: '',
        product_quantity: 1,
        product_size: '',
        product_color: '',
        user_id: user?.id || ''
    });

    useEffect(() => {
        document.title = `Loop | ${product.product_name} | ${product.product_category}`;
        
        // Update form data when product or user changes
        setFormData(prev => ({
            ...prev,
            product_id: product?.product_id || '',
            product_name: product?.product_name || '',
            product_category: product?.product_category || '',
            product_price: product?.product_price || '',
            user_id: user?.id || ''
        }));
    }, [product, user]);

    const [mainImage, setMainImage] = useState(
        Array.isArray(product.product_image) && product.product_image.length > 0 
            ? product.product_image[0] 
            : (product.product_image || '')
    );

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image click
    function handleClickImage(img) {
        setMainImage(img);
        setFormData(prev => ({
            ...prev,
            product_image: img
        }));
    }

    // Handle Add to Cart form submission
    const handleAddToCartSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error("Please login to add items to cart");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        } 

        // Validation
        if (!formData.product_size) {
            toast.error("Please select a size");
            return;
        }

        if (!formData.product_color) {
            toast.error("Please select a color");
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare cart item data
            const cartItem = {
                items: [{
                    product_id: formData.product_id,
                    product_name: formData.product_name,
                    product_category: formData.product_category,
                    product_price: parseFloat(formData.product_price),
                    product_image: mainImage,
                    product_quantity: parseInt(formData.product_quantity),
                    product_size: formData.product_size,
                    product_color: formData.product_color,
                    user_id: formData.user_id,
                    added_at: new Date().toISOString()
                }]
            };

            console.log("Adding to cart:", cartItem);

            // Submit to session-based cart backend
            const response = await axios.post(
                'http://localhost/loop_backend/session_cart.php',
                cartItem,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            );

            console.log("Add to cart response:", response.data);

            if (response.data.success) {
                toast.success('Successfully added to Cart!');
                
                // Refresh cart data immediately
                await refreshCart();
                
                // Reset form selections
                setFormData(prev => ({
                    ...prev,
                    product_size: '',
                    product_color: '',
                    product_quantity: 1
                }));
                
            } else {
                toast.error(response.data.message || "Failed to add item to cart");
            }

        } catch (error) {
            console.error("Error adding to cart:", error);
            
            if (error.code === 'ECONNABORTED') {
                toast.error("Request timeout. Please try again.");
            } else if (error.response?.status === 401) {
                toast.error("Please login to continue");
                navigate('/login');
            } else {
                toast.error("Failed to add item to cart. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Checkout Now form submission
    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error("Please login to continue");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        if (!formData.product_size) {
            toast.error("Please select a size");
            return;
        }

        if (!formData.product_color) {
            toast.error("Please select a color");
            return;
        }

        setIsSubmitting(true);

        try {
            const checkoutData = {
                items: [{
                    product_id: formData.product_id,
                    product_name: formData.product_name,
                    product_category: formData.product_category,
                    product_price: parseFloat(formData.product_price),
                    product_image: mainImage,
                    product_quantity: parseInt(formData.product_quantity),
                    product_size: formData.product_size,
                    product_color: formData.product_color,
                    user_id: formData.user_id
                }]
            };

            console.log("Direct checkout:", checkoutData.items);
            navigate('/products/checkout', { state: { checkoutData } });

        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("Failed to proceed to checkout. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="w-full bg-white text-gray-900 py-4">
                <div className="max-w-7xl mx-auto shadow-xl rounded-xl p-3">
                    {product ? (
                        <div className="space-y-8 py-12">
                            <div className="px-7 flex justify-between items-center text-base font-noto font-medium text-gray-700">
                                <p className="flex flex-wrap items-center gap-1">
                                    <Link to={'/'}>Home</Link> {'>'} 
                                    <Link to={'/products'}>Products</Link> {'>'} 
                                    <Link to={`/products#${product.product_category}`}>{product.product_category}</Link> {">"} 
                                    <p className="underline">{product.product_name}</p>
                                </p>
                                <Link to='/products' className="font-noto">{"<"} Back to Product Page</Link>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center px-5">
                                <div className="">
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={`/Assets/Products/${product.product_category}/${mainImage}`}
                                            alt={product.product_name}
                                            className="xl:size-96 xsm:size-32 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-x-3 mt-3 flex-wrap">
                                        {product.product_image && Array.isArray(product.product_image) ? (
                                            product.product_image.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={`/Assets/Products/${product.product_category}/${img}`}
                                                    alt={`${product.product_name} ${index + 1}`}
                                                    className={`w-32 cursor-pointer hover:scale-110 transition-transform duration-100 rounded-md ${
                                                        mainImage === img ? 'ring-2 ring-[#885B56]' : ''
                                                    }`}
                                                    title={`${product.product_name} - Image ${index + 1}`}
                                                    onClick={() => handleClickImage(img)}
                                                />
                                            ))
                                        ) : (
                                            product.product_image && (
                                                <img
                                                    src={`/Assets/Products/${product.product_category}/${product.product_image}`}
                                                    alt={product.product_name}
                                                    className="w-32 cursor-pointer hover:scale-110 transition-transform duration-100 rounded-md bg-gray-100 p-3"
                                                    title={product.product_name}
                                                    onClick={() => handleClickImage(product.product_image)}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-3 flex flex-col xl:gap-y-2 xsm:gap-y-2">
                                    <div className="flex flex-col xl:gap-y-4 xsm:gap-y-2 mb-5">
                                        <p className="font-noto text-gray-500">Loop | {product.product_category}</p>
                                        <p className="xl:text-5xl xsm:text-2xl font-noto font-semibold">{product.product_name}</p>
                                        <div className="flex flex-row justify-between items-center">
                                            <p className="font-noto font-semibold text-3xl">₱{product.product_price}</p>
                                            <div className="flex flex-wrap gap-x-1 text-3xl">
                                                <p className="text-yellow-400">⭐</p>
                                                <p>{product.product_rating}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="xl:w-full xsm:w-full xl:mb-4 xsm:mb-2" />

                                    <div className="mb-5">
                                        <p className="text-3xl font-noto font-semibold mb-2">Description:</p>
                                        <p className="xl:text-base xsm:text-sm text-gray-500 text-justify">{product.product_description}</p>
                                    </div>

                                    <hr className="xl:w-full xsm:w-full xl:mb-4 xsm:mb-2" />

                                    {/* Product Selection Form */}
                                    <form className="space-y-4">
                                        <div className="flex flex-row gap-x-4">
                                            <div className="w-full">
                                                <label htmlFor="product_size" className="font-semibold text-gray-500">Sizes:</label>
                                                <select 
                                                    name="product_size" 
                                                    value={formData.product_size}
                                                    onChange={handleInputChange}
                                                    required 
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#885B56] focus:border-transparent"
                                                >
                                                    <option value="" disabled className="xl:text-base xsm:text-sm">
                                                        Select a size
                                                    </option>
                                                    {product.product_size && Array.isArray(product.product_size) ? (
                                                        product.product_size.map((size, index) => (
                                                            <option key={index} value={size}>
                                                                {size}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No sizes available</option>
                                                    )}
                                                </select>
                                            </div>
                                            
                                            <div className="w-full">
                                                <label htmlFor="product_color" className="font-semibold text-gray-500">Colors:</label>
                                                <select 
                                                    name="product_color" 
                                                    value={formData.product_color}
                                                    onChange={handleInputChange}
                                                    required 
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#885B56] focus:border-transparent"
                                                >
                                                    <option value="" disabled className="xl:text-base xsm:text-sm">
                                                        Select a color
                                                    </option>
                                                    {product.product_color && Array.isArray(product.product_color) ? (
                                                        product.product_color.map((color, index) => (
                                                            <option key={index} value={color}>
                                                                {color}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No colors available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="product_quantity" className="font-semibold text-gray-500">Quantity:</label>
                                            <input
                                                type="number"
                                                name="product_quantity"
                                                value={formData.product_quantity}
                                                onChange={handleInputChange}
                                                min="1"
                                                max={product.product_quantity || 10}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#885B56] focus:border-transparent"
                                            />
                                        </div>
                                        
                                        <div className="flex flex-row justify-between mt-8 gap-x-2">
                                            <button
                                                type="button"
                                                onClick={handleAddToCartSubmit}
                                                disabled={isSubmitting || cartLoading}
                                                className="w-full bg-[#885B56] text-white px-2 py-3 font-semibold font-noto rounded-md hover:bg-[#69413D] transition-colors duration-300"
                                            >
                                                Add To Cart
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCheckoutSubmit}
                                                disabled={isSubmitting || cartLoading}
                                                className="w-full  text-black px-2 py-3 font-noto rounded-md hover:bg-[#69413D] hover:text-white border border-gray-400 transition-colors duration-300"
                                            >
                                                Checkout Now
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>  
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            /> 
        </>
    )
}