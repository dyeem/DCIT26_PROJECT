import { useEffect, useState, } from 'react';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import Cart from './Cart'

export default function NavBar() {
    
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const {isLogin, loading, user, setIsLogin, setUser, userCart, cartLoading, setUserCart } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);

    console.log('userCart: ', userCart)
    console.log('cartLoading: ', cartLoading)

    function handleLogout() {
        setLoggingOut(true);
        axios.post('http://localhost/loop_backend/logout.php', {}, {
            withCredentials: true,
        })
        .then(res => {
            if (res.data.success) {
                // Clear all user-related state
                setIsLogin(false);
                setUser(null);
                setUserCart([]); // Clear cart state
                navigate('/login');
            } else {
                console.error("Logout failed:", res.data.message);
            }
        })
        .catch(err => console.error("Logout failed:", err))
        .finally(() => setLoggingOut(false));
    }

    return (
        <>
            <div className="navbar bg-white fixed top-0 z-20 ">
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
                        {/* PHONE */}
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" className="drawer-overlay "></label>
                            <ul className="menu bg-white min-h-full w-52 p-4 pt-5">
                            <li>
                                <NavLink to="/" className='text-black text-xl font-serif'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="products" className='text-black text-xl font-serif'> Shop Now</NavLink>
                            </li>
                            <li>
                                <NavLink to="reviews" className='text-black text-xl font-serif'>Reviews</NavLink>
                            </li>
                            <li>
                                <a className='text-black text-xl font-serif'>More</a>
                                <ul className="p-2">
                                    <li>
                                    <NavLink to="/help/contactus" className="text-black text-xl font-serif">Contact Us</NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/help/faqpage" className="text-black text-xl font-serif">FAQ</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to="aboutus" className='text-black text-xl font-serif relative group' >About Us
                                    <span
                                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                    />
                                </NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-start hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li>
                            <NavLink
                                to="/"
                                className="btn btn-ghost text-black text-xl font-normal relative group hover:bg-transparent focus:bg-transparent active:bg-transparent"
                                >
                                Home
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="aboutus" className='btn btn-ghost text-black text-xl relative group hover:bg-transparent focus:bg-transparent active:bg-transparent font-normal'>About Us
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </NavLink>
                        </li>
                        <div className="relative group">
                            <button className="btn btn-ghost text-black text-xl relative hover:bg-transparent focus:bg-transparent active:bg-transparent font-normal">
                                Help
                                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                            </button>
                            
                            {/* Dropdown menu */}
                            <div className="absolute left-0 top-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                                <Link
                                to="/help/faqpage"
                                className="block px-4 py-4 text-black hover:bg-gray-100 text-base"
                                >
                                FAQ
                                </Link>
                                <Link
                                to="/help/contactus"
                                className="block px-4 py-4 text-black hover:bg-gray-100 text-base"
                                >
                                Contact Us
                                </Link>
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="navbar-center">
                    <NavLink to="/" className="btn btn-ghost lg:text-4xl xsm:text-2xl xsm:font-normal sm:text-xl md:text-2xl relative group hover:bg-transparent text-black lg:font-medium font-serif text-center lg:ml-20 xsm:ml-12">LOOPS
                        <span
                            className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                        />
                    </NavLink>
                </div>

                <div className='navbar-end'>
                    <ul className="menu menu-horizontal px-1 hidden lg:flex">
                        <li>
                            <NavLink to="products" className='relative group btn btn-ghost text-black text-xl  hover:bg-transparent font-normal'>Shop Now
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="reviews" className='relative group btn btn-ghost text-black text-xl  hover:bg-transparent font-normal'>Reviews
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setIsCartOpen(true)}>
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
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="dropdown dropdown-end ">
                        <div tabIndex={0} role="button" className="">
                            <div className="w-11 rounded-full">
                                {isLogin ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="black"
                                        className="size-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path d="M8.90039 7.56023C9.21039 3.96023 11.0604 2.49023 15.1104 2.49023H15.2404C19.7104 2.49023 21.5004 4.28023 21.5004 8.75023V15.2702C21.5004 19.7402 19.7104 21.5302 15.2404 21.5302H15.1104C11.0904 21.5302 9.24039 20.0802 8.91039 16.5402" stroke="#292D32" strokeWidth="0.8879999999999999" strokeLinecap="round" strokeLinejoin="round"></path> 
                                            <g opacity="0.4"> 
                                                <path d="M2 12H14.88" stroke="#292D32" strokeWidth="0.8879999999999999" strokeLinecap="round" strokeLinejoin="round"></path> 
                                                <path d="M12.6504 8.65039L16.0004 12.0004L12.6504 15.3504" stroke="#292D32" strokeWidth="0.8879999999999999" strokeLinecap="round" strokeLinejoin="round"></path> 
                                            </g> 
                                        </g>
                                    </svg>
                                )}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[#885b56] text-gray-100 rounded-box z-[1] mt-3 lg:w-64 xsm:w-44 p-2 shadow">
                            {loading ? (
                                <li><span className="text-base">Loading...</span></li>
                            ) : isLogin && user ? (
                                <>
                                    <li>
                                        <a className="justify-between text-base">
                                            {user.email}
                                        </a>
                                    </li>
                                    <li>
                                        <a className="justify-between text-base">
                                            {user.first_name} 
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/orders" className="justify-between text-base">
                                            Orders 
                                        </Link>
                                    </li>
                                    <hr />
                                    <li>
                                        {loggingOut ? (
                                            <span className="text-base">Logging out...</span>
                                        ) : (
                                            <a onClick={handleLogout} className="text-base">Logout</a>
                                        )}
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className="text-base">Sign in</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <Cart open={isCartOpen} setOpen={setIsCartOpen} NavLink={NavLink} />
            </div>
        </>
    );
}
