import avatar from '../Assets/avatar.jpg'
import logo from '../Assets/logo.png'


export default function NavBar({NavLink}) {
    return (
        <>
            <div className="navbar bg-white sticky">
                <div className="navbar-center">
                    <div className="drawer lg:hidden bg-white">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button lg:hidden">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#150016"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                            </svg>
                        </label>

                        <div className="drawer-side   ">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <ul className="menu bg-[#845162] text-base-content min-h-full w-52 p-4">
                            <li>
                                <a className='text-white text-xl'>Home</a>
                            </li>
                            <li>
                                <a className='text-[#150016] text-xl'> Shop Now</a>
                            </li>
                            <li>
                                <a className='text-[#150016] text-xl'>Reviews</a>
                            </li>
                            <li>
                                <a className='text-[#150016] text-xl'>More</a>
                                <ul className="p-2">
                                    <li>
                                    <a className="text-[#150016] text-xl">Contact Us</a>
                                    </li>
                                    <li>
                                    <a className="text-[#150016] text-xl">FAQ</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className='text-[#150016] text-xl'>About Us</a>
                            </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="navbar-start hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a className='text-[#150016] text-xl'>Home</a>
                        </li>
                        <li>
                            <a className='text-[#150016] text-xl'>About Us</a>
                        </li>
                        <li>
                            <a className='text-[#150016] text-xl'>Contact Us</a>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl text-[#150016]">LOOP</a>
                <div className="navbar-end ">
                    <ul className="menu menu-horizontal px-1 hidden lg:flex">
                        <li>
                            <a className='text-[#150016] text-xl'>Shop Now</a>
                        </li>
                        <li>
                            <a className='text-[#150016] text-xl'>Review</a>
                        </li>
                    </ul>
                    <div className='flex ipad:justify-end'>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 sm:h-6 sm:w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#150016">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item #150016">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
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
                            <div tabIndex={0} role="button" className="btn #150016 btn-circle avatar">
                                <div className="w-11 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={avatar} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}