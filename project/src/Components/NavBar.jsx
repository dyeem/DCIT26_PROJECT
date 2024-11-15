import avatar from '../Assets/avatar.jpg'
import logo from '../Assets/logo.png'


export default function NavBar({NavLink}) {
    return (
        <>
            <div className="navbar bg-white sticky">
                <div className="navbar-center">
                    <div className="drawer lg:hidden bg-tranparent ">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button lg:hidden">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#885b56"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                            </svg>
                        </label>

                        <div className="drawer-side">
                            <label htmlFor="my-drawer" className="drawer-overlay "></label>
                            <ul className="menu bg-white text-base-content min-h-full w-52 p-4 pt-5">
                            <li>
                                <NavLink to="/" className='text-black text-xl'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="sales" className='text-black text-xl'> Shop Now</NavLink>
                            </li>
                            <li>
                                <NavLink to="reviews" className='text-black text-xl'>Reviews</NavLink>
                            </li>
                            <li>
                                <a className='text-black text-xl'>More</a>
                                <ul className="p-2">
                                    <li>
                                    <NavLink to="contactus" className="text-black text-xl">Contact Us</NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="faq" className="text-black text-xl">FAQ</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to="aboutus" className='text-black text-xl'>About Us</NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="navbar-start hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li>
                            <NavLink to="/" className='btn btn-ghost text-black text-xl  hover:bg-transparent focus:bg-transparent active:bg-transparent font-normal'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="aboutus" className='btn btn-ghost text-black text-xl  hover:bg-transparent focus:bg-transparent active:bg-transparent font-normal'>About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="contactus" className='btn btn-ghost text-black text-xl  hover:bg-transparent focus:bg-transparent active:bg-transparent font-normal'>Contact Us</NavLink>
                        </li>
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost lg:text-2xl xsm:text-xl sm:text-xl md:text-2xl hover:bg-transparent text-black lg:font-bold">LOOP</NavLink>
                <div className="navbar-end ">
                    <ul className="menu menu-horizontal px-1 hidden lg:flex">
                        <li>
                            <NavLink to="sales" className=' btn btn-ghost text-black text-xl  hover:bg-transparent font-normal'>Shop Now</NavLink>
                        </li>
                        <li>
                            <NavLink to="reviews" className=' btn btn-ghost text-black text-xl  hover:bg-transparent font-normal'>Reviews</NavLink>
                        </li>
                    </ul>
                    <div className='flex ipad:justify-end'>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#150016">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item #150016">0</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-[#150016] z-[1] mt-3 xsm:w-36 lg:w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn #150016 btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end ">
                            <div tabIndex={0} role="button" className="btn bg-[#150016] btn-circle avatar">
                                <div className="w-11 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={avatar} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-[#150016] rounded-box z-[1] mt-3 lg:w-60 xsm:w-40 p-2 shadow">
                                <li>
                                    <a className="justify-between text-base">
                                        Shehanna
                                    </a>
                                </li>
                                <li>
                                    <a className="justify-between text-base">
                                       She.02
                                    </a>
                                </li>
                                <hr />
                                <li>
                                    <a className="justify-between text-base">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className='text-base'>Settings</a>
                                </li>
                                <li>
                                    <NavLink to="login" className='text-base'>Logout</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}