import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import avatar from '../Assets/avatar.jpg'
import Cart from './Cart'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from './RTK/user/userSlice';

export default function NavBar() {

    const [isCartOpen, setIsCartOpen] = useState(false);

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser)

    return (
        <>
            <div className="navbar bg-white sticky top-0 z-50 ">
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
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" className="drawer-overlay "></label>
                            <ul className="menu bg-white min-h-full w-52 p-4 pt-5">
                            <li>
                                <NavLink to="/" className='text-black text-xl font-serif'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="sales" className='text-black text-xl font-serif'> Shop Now</NavLink>
                            </li>
                            <li>
                                <NavLink to="reviews" className='text-black text-xl font-serif'>Reviews</NavLink>
                            </li>
                            <li>
                                <a className='text-black text-xl font-serif'>More</a>
                                <ul className="p-2">
                                    <li>
                                    <NavLink to="contactus" className="text-black text-xl font-serif">Contact Us</NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="faqpage" className="text-black text-xl font-serif">FAQ</NavLink>
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
                        <li>
                            <NavLink to="contactus" className='btn btn-ghost text-black text-xl relative group hover:bg-transparent focus:bg-transparent active:bg-transparent font-normal'>Contact Us
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="navbar-center">
                    <NavLink to="/" className="btn btn-ghost lg:text-4xl xsm:text-2xl xsm:font-normal sm:text-xl md:text-2xl relative group hover:bg-transparent text-black lg:font-medium font-serif text-center">LOOP
                        <span
                            className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                        />
                    </NavLink>
                </div>

                <div className='navbar-end'>
                    <ul className="menu menu-horizontal px-1 hidden lg:flex">
                        <li>
                            <NavLink to="sales" className='relative group btn btn-ghost text-black text-xl  hover:bg-transparent font-normal'>Shop Now
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
                                <span className="badge badge-sm indicator-item #150016">0</span>
                            </div>
                        </div>
                        {/* <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-[#150016] z-[1] mt-3 xsm:w-36 lg:w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <NavLink to="checkout" className="btn #150016 btn-block">View cart</NavLink>
                                </div>
                            </div>
                        </div> */}
                    
                    </div>
                    <div className="dropdown dropdown-end ">
                        <div tabIndex={0} role="button" className="">
                            <div className="w-11 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[#150016] rounded-box z-[1] mt-3 lg:w-60 xsm:w-40 p-2 shadow">
                            <li>
                                <a className="justify-between text-base">
                                    {currentUser ? currentUser.email : "Sign in!"}
                                </a>
                            </li>
                            <li>
                                <a className="justify-between text-base">
                                    {currentUser ? currentUser.firstname : "User"}
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
                                {currentUser ?  
                                    <a onClick={() => dispatch(userActions.logoutUser())} className='text-base'>
                                        Log out
                                    </a>
                                :
                                    <Link to="/login" className='text-base'>
                                        Sign in
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <Cart open={isCartOpen} setOpen={setIsCartOpen} NavLink={NavLink} />
            </div>
        </>
    );
}