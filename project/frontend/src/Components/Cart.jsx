import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import  emptyCartPic from '../Assets/empty-cart-pic.png'

//redux
import { useNavigate } from 'react-router-dom';

export default function Cart({open, setOpen, NavLink}) {

    const navigate = useNavigate()

    function handleRemoveCart(id) {
       
    }
    
    function handleCheckout () {
        setOpen(false)
        navigate("products/checkout")
    }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-700/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <DialogPanel transition className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <DialogTitle className="text-xl font-medium text-gray-900 leading-relaxed">Shopping cart</DialogTitle>
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
                                        {/* <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                                            {
                                                !userCart || userCart.length === 0 ? 
                                                    <div className="text-center flex flex-col justify-center items-center">
                                                        <img src={emptyCartPic} alt={emptyCartPic} className="xl:size-auto xsm:w-56" /> 
                                                        <p className='p-3 text-gray-800 font-bold text-3xl'>Your cart is feeling lonely!</p>
                                                        <p className='p-1 text-gray-500'>Add your favorite crochet products now and bring it to life!</p>
                                                    </div>
                                                : 
                                                <div className="">
                                                    {userCart.map((cart) => (
                                                        <li key={cart.cartId} className="flex py-6">
                                                            <div className="lg:size-24 xsm:size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img alt={cart.img} src={Array.isArray(cart.img) ? cart.img[0] : cart.img} className="lg:size-full object-cover xsm:size-20"/>
                                                            </div>
                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between lg:text-base font-medium text-gray-900 xsm:text-sm">
                                                                        <h3>
                                                                            <a > {cart.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4"> {cart ? `₱ ${cart.price}` : ""}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{cart.category}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">color: {cart.color}</p>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="mt-1 text-sm text-gray-500">size: {cart.size}</p>
                                                                        <div className="flex">
                                                                            <button 
                                                                                type="button" 
                                                                                className="font-medium text-[#885b56] hover:text-[#c78d87]"
                                                                                onClick={() => handleRemoveCart(cart.cartId)}>
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </div>
                                            }
                                        </ul> */}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 xsm:px-6 leading-relaxed">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    {/* <p>&#8369; {userCart.reduce((total, cart) => cart.price ? total + cart.price : total, 0)}</p> */}
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    {/* {userCart.length === 0 ? '' :
                                        <div className="">
                                            <p
                                                className="flex items-center justify-center rounded-md border border-transparent bg-[#885b56] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#c78d87]"
                                                onClick={() => handleCheckout(false)}
                                                >
                                                Checkout
                                            </p>
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
                                    } */}
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
