import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import emptyCartPic from '../Assets/empty-cart-pic.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './Auth/AuthContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

export default function Cart({open, setOpen, NavLink}) {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)

    // Fetch cart items when cart opens
    useEffect(() => {
        if (open && user) {
            fetchCartItems()
        }
    }, [open, user])

    const fetchCartItems = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost/loop_backend/session_cart.php', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.success) {
                setCartItems(response.data.cart || [])
            } else {
                console.error('Failed to fetch cart items:', response.data.message)
                setCartItems([])
            }
        } catch (error) {
            console.error('Error fetching cart items:', error)
            setCartItems([])
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveCart = async (productId, size, color) => {
        try {
            const response = await axios.delete('http://localhost/loop_backend/session_cart.php', {
                data: {
                    product_id: productId,
                    product_size: size,
                    product_color: color
                },
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.success) {
                toast.success('Item removed from cart')
                // Update local cart state
                setCartItems(response.data.cart || [])
            } else {
                toast.error(response.data.message || 'Failed to remove item')
            }
        } catch (error) {
            console.error('Error removing item from cart:', error)
            toast.error('Failed to remove item from cart')
        }
    }

    const handleUpdateQuantity = async (productId, size, color, newQuantity) => {
        if (newQuantity < 1) return

        try {
            const response = await axios.put('http://localhost/loop_backend/session_cart.php', {
                product_id: productId,
                product_size: size,
                product_color: color,
                quantity: newQuantity
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.success) {
                setCartItems(response.data.cart || [])
                toast.success('Cart updated')
            } else {
                toast.error(response.data.message || 'Failed to update cart')
            }
        } catch (error) {
            console.error('Error updating cart:', error)
            toast.error('Failed to update cart')
        }
    }
    
    function handleCheckout() {
        if (cartItems.length === 0) {
            toast.error('Your cart is empty')
            return
        }
        
        setOpen(false)
        navigate("products/checkout")
    }

    // Calculate total
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.product_price) * parseInt(item.product_quantity))
        }, 0)
    }

    // Get first image from comma-separated string
    const getFirstImage = (imageString) => {
        if (!imageString) return null
        const images = imageString.split(',')
        return images[0].trim()
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-700/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel transition className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-xl font-medium text-gray-900 leading-relaxed">
                                            Shopping cart ({cartItems.length})
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            {loading ? (
                                                <div className="text-center py-8">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#885b56] mx-auto"></div>
                                                    <p className="mt-2 text-gray-500">Loading cart...</p>
                                                </div>
                                            ) : (
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {!cartItems || cartItems.length === 0 ? (
                                                        <div className="text-center flex flex-col justify-center items-center">
                                                            <img src={emptyCartPic} alt="Empty cart" className="xl:size-auto xsm:w-56" /> 
                                                            <p className='p-3 text-gray-800 font-bold text-3xl'>Your cart is feeling lonely!</p>
                                                            <p className='p-1 text-gray-500'>Add your favorite crochet products now and bring it to life!</p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {cartItems.map((cart, index) => (
                                                                <li key={`${cart.product_id}_${cart.product_size}_${cart.product_color}_${index}`} className="flex py-6">
                                                                    <div className="lg:size-24 xsm:size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            alt={cart.product_name}
                                                                            src={`/Assets/Products/${cart.product_category}/${getFirstImage(cart.product_image)}`}
                                                                            className="lg:size-full object-cover xsm:size-20"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between lg:text-base font-medium text-gray-900 xsm:text-sm">
                                                                                <h3>
                                                                                    <span>{cart.product_name}</span>
                                                                                </h3>
                                                                                <p className="ml-4">₱{cart.product_price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{cart.product_category}</p>
                                                                            <p className="mt-1 text-sm text-gray-500">Color: {cart.product_color}</p>
                                                                            <p className="mt-1 text-sm text-gray-500">Size: {cart.product_size}</p>
                                                                            
                                                                            <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                                                                <div className="flex items-center gap-2">
                                                                                    <label className="text-gray-500">Qty:</label>
                                                                                    <div className="flex items-center gap-1">
                                                                                        <button
                                                                                            onClick={() => handleUpdateQuantity(
                                                                                                cart.product_id,
                                                                                                cart.product_size,
                                                                                                cart.product_color,
                                                                                                parseInt(cart.product_quantity) - 1
                                                                                            )}
                                                                                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                                                                                            disabled={cart.product_quantity <= 1}
                                                                                        >
                                                                                            -
                                                                                        </button>
                                                                                        <span className="w-8 text-center">{cart.product_quantity}</span>
                                                                                        <button
                                                                                            onClick={() => handleUpdateQuantity(
                                                                                                cart.product_id,
                                                                                                cart.product_size,
                                                                                                cart.product_color,
                                                                                                parseInt(cart.product_quantity) + 1
                                                                                            )}
                                                                                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                                                                                        >
                                                                                            +
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex">
                                                                                    <button 
                                                                                        type="button" 
                                                                                        className="font-medium text-[#885b56] hover:text-[#c78d87]"
                                                                                        onClick={() => handleRemoveCart(
                                                                                            cart.product_id,
                                                                                            cart.product_size,
                                                                                            cart.product_color
                                                                                        )}
                                                                                    >
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </div>
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 xsm:px-6 leading-relaxed">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>₱{calculateTotal().toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        {cartItems.length === 0 ? '' : (
                                            <div>
                                                <button
                                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#885b56] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#c78d87] transition-colors"
                                                    onClick={handleCheckout}
                                                >
                                                    Checkout
                                                </button>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            onClick={() => setOpen(false)}
                                                            className="font-medium text-[#885b56] hover:text-[#c78d87]"
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
