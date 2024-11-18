import phone from '../Assets/phone.png'
import mail from '../Assets/mail.png'
export default function ContactUs() {
    return (
        <>
            <div className="bg-white min-h-screen flex justify-center items-center">
                <div className="max-w-[90rem] rounded-2xl shadow-2xl">
                    <div className="grid lg:grid-cols-2 xsm:grid-cols-1 lg:p-10 xsm:p-5">
                        {/*left section of the grid*/}
                        <div className="flex flex-col items-left justify-center text-left">
                            <h1 className="lg:text-5xl xsm:text-3xl text-black font-serif leading-relaxed mb-4 relative group">Contact Us
                            <span 
                                className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </h1>
                            <p className="text-gray-600 leading-relaxed lg:text-base mb-4 xsm:text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores corrupti cumque quia provident fugit, deserunt ratione pariatur, veritatis aut eaque, qui non! Ullam incidunt vel quas nemo! Tempore, voluptatem.</p>
                            <div className="flex flex-col items-left gap-4 mb-4 text-center">
                                <div className="flex items-center gap-3">
                                    <img src={phone} alt="Phone" className="w-6 opacity-70" />
                                    <span className="text-gray-600 lg:text-base leading-relaxed xsm:text-sm">+63 123456789</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={mail} alt="Mail" className="w-6 opacity-70" />
                                    <span className="text-gray-600 lg:text-base leading-relaxed xsm:text-sm">Loop.ecommerce@test.gmail</span>
                                </div>
                            </div>
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d241.6015573664122!2d120.85018461743844!3d14.333206646692709!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd80655363e335%3A0x485feee6e1048a1b!2sCavite%20State%20University%20-%20Tanza%20Campus!5e0!3m2!1sen!2sph!4v1731948107778!5m2!1sen!2sph"
                                    width="600"
                                    height="450"
                                    style={{ border: '0' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                        {/*right section of the grid*/}
                        <div className="">
                            <form className="mx-auto max-w-xl">
                                <div className="">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                                        First name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#885b56] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                                        Last name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="last-name"
                                                name="last-name"
                                                type="text"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#885b56] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
                                        Company
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="company"
                                                name="company"
                                                type="text"
                                                autoComplete="organization"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#885b56] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                                        Email
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#885b56] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                                        Phone number
                                        </label>
                                        <div className="relative mt-2.5">
                                            <div className="absolute inset-y-0 left-0 flex items-center">
                                                <label htmlFor="country" className="sr-only">
                                                    Country
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm"
                                                    >
                                                    <option>PH</option>
                                                    <option>US</option>
                                                    <option>EU</option>
                                                </select>
                                            
                                            </div>
                                            <input
                                                id="phone-number"
                                                name="phone-number"
                                                type="tel"
                                                autoComplete="tel"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                                        Message
                                        </label>
                                        <div className="mt-2.5">
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#885b56] sm:text-sm/6"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        className="block w-full rounded-md bg-[#885b56] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#724641] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#885b56]"
                                    >
                                        Let's talk
                                    </button>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}