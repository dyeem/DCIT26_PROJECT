import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//assets
import carticon from '../Assets/cart.png'
import BreadCrumbs from './BreadCrumbs';

export default function CheckOut() {
    const navigate = useNavigate()

    const userCart = useSelector((state) => {
        const currentUserEmail = state.user.currentUser?.email; 
        const user = state.user.usersList.find(user => user.email === currentUserEmail); 
        return user?.cart || []; 
    });

    const userCartlength = userCart.length;

    return(
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-white">
                
                <div className="w-full container p-4 flex flex-row justify-between">
                    <BreadCrumbs/>
                    <p onClick={() => navigate("/products")} className='text-gray-800 cursor-pointer px-2 py-2 font-semibold'>{"<"} Back to Products</p>
                </div>
                <div className="max-w-[90rem] w-full m-5 rounded-2xl shadow-xl bg-white">
                    {/*grid container */}
                    <div className="grid lg:grid-cols-2 xsm:grid-cols-1 lg:grid-flow-col xsm:grid-flow-row">
                        {/*left side */}
                        <div className="lg:order-1 xsm:order-2 lg:p-10 xsm:p-10">
                                {/*Payment details */}
                            <p className="text-balance xl:text-[2rem] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">Contact Information</p>
                            <form className="max-w-lg mx-auto">
                                <div className="mt-[2rem]">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="floating_email" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                            placeholder=" " 
                                            required 
                                        />
                                    
                                        <label 
                                            for="floating_email" 
                                            class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                            Email Address
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input 
                                            type="tel" 
                                            name="tel" 
                                            id="floating_email" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                            placeholder=" " 
                                            required 
                                        />
                                    
                                        <label 
                                            for="floating_email" 
                                            class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                            Phone Number
                                        </label>
                                    </div>
                                </div>
                                {/*Payment details */}
                                <div className="mt-[3rem]">
                                    <div className="mb-[2rem]">
                                        <p className="text-balance lg:text-[1.5rem] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">Payment Details</p>
                                    </div>
                                    <fieldset className="mt-4">
                                        <legend className="block text-left text-sm/6 font-semibold text-gray-600">Select Payment Method</legend>
                                        <div className="mt-2.5 space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    id="cash"
                                                    name="payment-method"
                                                    type="radio"
                                                    value="cash"
                                                    className="h-4 w-4 border-gray-300 text-[#885b56] focus:ring-[#885b56]"
                                                />
                                                <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="gcash"
                                                    name="payment-method"
                                                    type="radio"
                                                    value="gcash"
                                                    className="h-4 w-4 border-gray-300 text-[#885b56] focus:ring-[#885b56]"
                                                />
                                                <label htmlFor="gcash" className="ml-3 block text-sm font-medium text-gray-700">
                                                    GCash
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="credit-card"
                                                    name="payment-method"
                                                    type="radio"
                                                    value="credit-card"
                                                    className="h-4 w-4 border-gray-300 text-[#885b56] focus:ring-[#885b56]"
                                                />
                                                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                                                    Credit Card
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="mt-[2rem]">
                                    <div className="mb-[2rem]">
                                        <p className="text-balance lg:text-[1.5rem] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">
                                            Shipping Address
                                        </p>
                                    </div>
                                    {/* Address */}
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input 
                                            type="address" 
                                            name="address" 
                                            id="floating_email" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                            placeholder=" " 
                                            required 
                                        />
                                    
                                        <label 
                                            for="floating_email" 
                                            class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                            Address
                                        </label>
                                    </div>

                                    {/* Street */}
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input 
                                            type="address" 
                                            name="street" 
                                            id="street" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                            placeholder=" " 
                                            required 
                                        />
                                    
                                        <label 
                                            for="street" 
                                            class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                            Street, Address, Etc.
                                        </label>
                                    </div>

                                    {/* City, Province, Postal Code */}
                                    <div className="mt-4 flex xms:flex-wrap gap-2">
                                        {/* City */}
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input 
                                                type="address" 
                                                name="city" 
                                                id="city" 
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                                placeholder=" " 
                                                required 
                                            />
                                        
                                            <label 
                                                for="city" 
                                                class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                City
                                            </label>
                                        </div>

                                        {/* Province */}
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input 
                                                type="address" 
                                                name="province" 
                                                id="province" 
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                                placeholder=" " 
                                                required 
                                            />
                                        
                                            <label 
                                                for="province" 
                                                class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                            Province
                                            </label>
                                        </div>

                                        {/* Postal Code */}
                                        <div class="relative z-0 w-full mb-5 group">
                                            <input 
                                                type="address" 
                                                name="postal-code" 
                                                id="postal-code" 
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#885b56] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#885b56] peer" 
                                                placeholder=" " 
                                                required 
                                            />
                                        
                                            <label 
                                                for="postal-code" 
                                                class="peer-focus:font-medium text-left absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#885b56] peer-focus:dark:text-[#885b56] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                Postal Code
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-[2rem]">
                                    <div className="mb-[2rem]">
                                        <p className="text-balance lg:text-[1.5rem] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">Billing Information</p>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="save-billing-info"
                                            name="billing-info"
                                            type="checkbox"
                                            value="save-billing-info"
                                            className="h-4 w-4 border-gray-300 text-[#885b56] focus:ring-[#885b56] rounded-xl"
                                        />
                                        <label htmlFor="save-billing-info" className="ml-2 block text-sm font-medium text-gray-700">
                                            Save as billing information
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-[2rem]">
                                    <hr className="my-6 border-t-2 border-[#885b56]" />
                                </div>
                                <div className="mt-[2rem] flex justify-center items-center">
                                    <button onClick={() => navigate("/products/checkout/orderconfirmationpage")} className="bg-[#885b56] text-lg text-white px-3 py-2 font-noto">Checkout</button>
                                </div>
                            </form>
                        </div>
                        {/*right side */}
                        <div className="lg:order-2 xsm:order-1 lg:p-10 xsm:p-10 bg-gray-100 rounded-2xl shadow-xl">
                            <p className="text-balance xl:text-[2] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">Order Summary</p>
                            <hr className="my-4 border-t-2 border-[#885b56]" />
                            <div className="flex flex-wrap items-center">
                                <img src={carticon} alt="" className="w-8"/>
                                <p className='text-gray-800 font-semibold text-base'>{userCartlength} item(s) in cart</p>
                            </div>
                            <div className="mt-5">
                                <div className="divide-y divide-[#885b56]">
                                    {!userCart || userCart.length === 0 ? 
                                        navigate("/login")
                                    :
                                        userCart.map((cart) => (
                                            <div key={cart.id} className="flex items-center py-4">
                                                <img
                                                    src={Array.isArray(cart.img) ? cart.img[0] : cart.img}
                                                    alt={cart.name}
                                                    className="lg:h-20 lg:w-20 xsm:h-14 xsm:w-14 object-cover rounded-md"/>
                                                <div className="ml-4 flex-grow text-left">
                                                        <p className="lg:text-lg xsm:text-base font-semibold text-gray-900">{cart.name}</p>
                                                        <p className="lg:text-sm xsm:text-sm text-gray-500">{cart.category}</p>
                                                        <p className="lg:text-sm xsm:text-sm text-gray-500">{cart.size}</p>
                                                        <p className="lg:text-sm xsm:text-sm text-gray-500">{cart.color}</p>
                                                </div>
                                                <p className="lg:text-lg xsm:text-base font-medium text-gray-900">₱{cart.price.toFixed(2)}</p>
                                            </div>
                                            
                                        ))
                                    }
                                    <div className="py-3">
                                        <div className="flex justify-between text-base text-gray-800">
                                            <p className='font-semibold'>Subtotal: </p>
                                            <p>₱{userCart.reduce((total, cart) => cart.price ? total + cart.price : total, 0)}.00</p>
                                        </div>
                                        <div className="flex justify-between text-base text-gray-800">
                                            <p className='font-semibold'>Shipping: </p>
                                            <p>₱36.00</p>
                                        </div>
                                    </div>
                                    <div className="pt-2 flex justify-between text-lg font-semibold text-gray-900">
                                        <p>Total:</p>
                                        <p>₱{userCart.reduce((total, cart) => cart.price ? total + cart.price : total, 0) +36}.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}