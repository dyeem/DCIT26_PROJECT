import avatar from '../Assets/avatar.jpg'
export default function CheckOut() {
        const items = [
          {
            id: 1,
            name: 'Micro Backpack',
            description: 'Moss',
            size: '5L',
            price: 70.0,
            image: avatar, // Replace with actual image URL
          },
          {
            id: 2,
            name: 'Small Stuff Satchel',
            description: 'Sand',
            size: '18L',
            price: 180.0,
            image: avatar, // Replace with actual image URL
          },
          {
            id: 3,
            name: 'Carry Clutch',
            description: 'White and Black',
            size: 'Small',
            price: 70.0,
            image: avatar, // Replace with actual image URL
          },
          {
            id: 3,
            name: 'Carry Clutch',
            description: 'White and Black',
            size: 'Small',
            price: 70.0,
            image: avatar, // Replace with actual image URL
          },
          {
            id: 3,
            name: 'Carry Clutch',
            description: 'White and Black',
            size: 'Small',
            price: 70.0,
            image: avatar, // Replace with actual image URL
          },
          {
            id: 3,
            name: 'Carry Clutch',
            description: 'White and Black',
            size: 'Small',
            price: 70.0,
            image: avatar, // Replace with actual image URL
          },
        ];
      
        const subtotal = items.reduce((sum, item) => sum + item.price, 0);
        const shipping = 15.0;
        const taxes = 26.8;
        const total = subtotal + shipping + taxes;
    return(
        <>
            <div className="min-h-screen flex justify-center items-center bg-white">
                <div className="max-w-[90rem] w-full m-5 rounded-2xl shadow-xl bg-gray-100">
                    {/*grid container */}
                    <div className="grid lg:grid-cols-2 xsm:grid-cols-1 lg:grid-flow-col xsm:grid-flow-row text-center">
                        {/*left side */}
                        <div className="lg:order-1 xsm:order-2 lg:p-10 xsm:p-10">
                                {/*Payment details */}
                            <p className="text-balance lg:text-[1.5rem] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">Contact Information</p>
                            <form>
                                <div className="mt-[2rem]">
                                    <div className="">
                                        <label htmlFor="first-name" className="block text-left text-sm/6 font-semibold text-gray-600">
                                            Email Address
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label htmlFor="phone-number" className="block text-left text-sm/6 font-semibold text-gray-600">
                                            Phone Number
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="phone-number"
                                                name="phone-number"
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
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
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                                    <div>
                                        <label htmlFor="address" className="block text-left text-sm/6 font-semibold text-gray-600">
                                            Address
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                autoComplete="address"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    {/* Street */}
                                    <div className="mt-4">
                                        <label htmlFor="street" className="block text-left text-sm/6 font-semibold text-gray-600">
                                            Street, Apartment, etc.
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="street"
                                                name="street"
                                                type="text"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    {/* City, Province, Postal Code */}
                                    <div className="mt-4 flex xms:flex-wrap gap-2">
                                        {/* City */}
                                        <div className="lg:w-[33%] xsm:w-full">
                                            <label htmlFor="city" className="block text-left text-sm/6 font-semibold text-gray-600">
                                                City
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        {/* Province */}
                                        <div className="lg:w-[33%] xsm:w-full">
                                            <label htmlFor="province" className="block text-left text-sm/6 font-semibold text-gray-600">
                                                Province
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    id="province"
                                                    name="province"
                                                    type="text"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        {/* Postal Code */}
                                        <div className="lg:w-[33%] xsm:w-full">
                                            <label htmlFor="postal-code" className="block text-left text-sm/6 font-semibold text-gray-600">
                                                Postal Code
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    id="postal-code"
                                                    name="postal-code"
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
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
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 rounded-xl"
                                        />
                                        <label htmlFor="save-billing-info" className="ml-2 block text-sm font-medium text-gray-700">
                                            Save as billing information
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-[2rem]">
                                    <hr className="my-6 border-t-2 border-gray-400" />
                                </div>
                                <div className="mt-[2rem] flex justify-between p-10">
                                    <p className="tracking-light text-gray-500 text-base">You wont be charged until the next step</p>
                                    <button className="btn ng-indigo-600">Next</button>
                                </div>
                            </form>
                        </div>
                        {/*right side */}
                        <div className="lg:order-2 xsm:order-1 lg:p-10 xsm:p-10 bg-gray-300 rounded-2xl shadow-xl">
                            <p className="text-balance lg:text-[1.5rem] font-normal tracking-tight text-gray-900 xsm:text-3xl text-left">Order Summary</p>
                            <div className="mt-5">
                                <div className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center py-4">
                                            <img
                                            src={item.image}
                                            alt={item.name}
                                            className="lg:h-20 lg:w-20 xsm:h-14 xsm:w-14 object-cover rounded-md"
                                            />
                                            <div className="ml-4 flex-grow text-left">
                                                    <p className="lg:text-lg xsm:text-base font-semibold text-gray-900">{item.name}</p>
                                                    <p className="lg:text-sm xsm:text-sm text-gray-500">{item.description}</p>
                                                    <p className="lg:text-sm xsm:text-sm text-gray-500">{item.size}</p>
                                            </div>
                                            <p className="lg:text-lg xsm:text-base font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                    <div className="py-4">
                                        <div className="flex justify-between text-base text-gray-600">
                                            <p>Subtotal</p>
                                            <p>${subtotal.toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between text-base text-gray-600">
                                            <p>Shipping</p>
                                            <p>${shipping.toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between text-base text-gray-600">
                                            <p>Taxes</p>
                                            <p>${taxes.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
                                        <p>Total</p>
                                        <p>${total.toFixed(2)}</p>
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