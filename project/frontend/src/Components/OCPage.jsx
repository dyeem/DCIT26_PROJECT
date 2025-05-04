import checkicon from '../Assets/check.png'
import housepin from '../Assets/housepin.png'
import tel from '../Assets/tel.png'

import barcode from '../Assets/barcode.png'

import { useNavigate } from 'react-router-dom'

import BreadCrumbs from './BreadCrumbs'

export default function OCPage() {

    const navigate = useNavigate()

    function handleClearUserCart() {
       
    }
    
    return (
        <>
            <div className='bg-white xsm:grid xsm:grid-cols-1 xl:flex flex-col justify-center items-center max-w-full leading-relaxed xl:space-y-10 xl:px-16 xsm:px-3 py-8'>
                <div className="self-start"><BreadCrumbs/></div>
                <div className="flex flex-row items-center justify-center gap-x-2 py-1">
                    <img src={checkicon} alt="" className='xl:w-10 xsm:w-12'/>
                    <p className='text-gray-900 xl:text-3xl xsm:text-lg font-bold'>Thanks for your Order!</p>
                </div>
                <div className="w-full">
                    <div className="xsm:grid xsm:grid-cols-1 xsm:space-y-8 xl:flex flex-row gap-x-4 px-5 divide-x-2 divide-gray-300">
                        <div className="w-full">
                            <div className="flex flex-row justify-between border-b border-gray-400 text-lg font-bold text-gray-900 pb-2">
                                <p>Order No.</p>
                                <p className='text-red-700'>123465</p>
                            </div>
                            <div className="px-1 py-3 text-gray-800 space-y-5">
                                <p>We've sent a confirmation email with your order details to <span className="font-bold">{currentUseremail}</span></p>
                                <p>For in-store order pickups, please be sure to bring the confirmation email and your photo ID.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi voluptates, mollitia delectus corporis quisquam consequatur quibusdam obcaecati at totam eos ratione. Dolores reprehenderit, beatae itaque vero suscipit architecto rem?</p>
                            </div>
                            <div className="space-y-3">
                                <p className='text-xl text-gray-900 font-bold'><span>Order</span> Details</p>
                                <div className="flex flex-wrap items-center gap-x-2 text-gray-900 font-bold">
                                    <img src={housepin} alt="" className="w-8"/>
                                    <p>Home Shipping</p>
                                </div>
                                <div className="text-gray-900">
                                    <p><span className='font-semibold'>Shipping to:</span> street, city, province, postal code</p>
                                    <p><span className='font-semibold'>Arrives in:</span> 3-4 Business Days</p>
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    {!userCart || userCart.length === 0 ? navigate("/products/sales") 
                                    :
                                        userCart.map((cart) => (
                                            <div className="flex flex-row gap-x-4" key={cart.id}>
                                                <img src={cart.img[0]} alt="" className='w-28 rounded-md'/>
                                                <div className="text-gray-900">
                                                    <p className='font-semibold'>Name: {cart.name}</p>
                                                    <p className='font-semibold'>Category: {cart.category}</p>
                                                    <p className='font-semibold'>Size: {cart.size}</p>
                                                    <p className='font-semibold'>Color: {cart.color}</p>
                                                    <p className='font-semibold'>Price: ₱{cart.price}</p>
                                                </div>
                                            </div>
                                        ))  
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <p className='text-gray-900 text-xl font-bold'>Order Summary</p>
                            <div className="divide-y-2 divide-gray-300 font-semibold">
                                <div className="flex flex-wrap justify-between py-4 text-gray-900">
                                    <p className='font-semibold'>Subtotal:</p>
                                    <p>₱{userCart.reduce((total, cart) => cart.price ? total + cart.price : total, 0)}</p>
                                </div>
                                <div className="flex flex-wrap justify-between py-4 text-gray-900">
                                    <p className='font-semibold'>Shipping:</p>
                                    <p>₱36.00</p>
                                </div>
                                <div className="flex flex-wrap justify-between py-4 text-gray-900">
                                    <p className='font-semibold'>Tax:</p>
                                    <p>None</p>
                                </div>
                                <div className="flex flex-wrap justify-between py-4 text-gray-900">
                                    <p className='font-semibold'>Order Total:</p>
                                    <p>₱{userCart.reduce((total, cart) => cart.price ? total + cart.price : total, 0) +36}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-y-3 items-center px-4">
                            <img src={barcode} alt="" />
                            <button className='font-semibold rounded-md border border-gray-600 text-black w-full py-4 text-lg font-noto'>Print Order Details</button>
                            <button onClick={() => navigate('/products')} className='font-semibold rounded-md border border-gray-600 text-black w-full py-4 text-lg font-noto'>Cancel Order</button>
                            <button className='font-semibold flex flex-row justify-center gap-x-1 items-center rounded-md border border-gray-600 text-black w-full py-4 text-lg font-noto'><img src={tel} alt="" className='w-5 '/> +63 13456798</button>
                            <button onClick={() => handleClearUserCart() } className='font-semibold rounded-md bg-[#885b56] text-white w-full py-4 text-lg font-noto'>Back to Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}