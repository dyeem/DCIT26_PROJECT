import avatar from '../Assets/avatar.jpg'

export default function NavBar({NavLink}) {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <NavLink to="/" className="text-lg">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="sales" className="text-lg">Shop Now</NavLink>
                        </li>
                        <li>
                            <NavLink to="reviews" className="text-lg">Reviews</NavLink>
                        </li>
                        <li>
                            <a to="" className="text-lg">More</a>
                            <ul className="p-2">
                                <li>
                                    <NavLink to="aboutus" className="text-lg">About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="contactus" className="text-lg">Contact Us</NavLink>
                                </li>
                            </ul>
                        </li>
                       
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-2xl">Crochet</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/" className="text-lg">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Sales" className="text-lg">Shop Now</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Reviews" className="text-lg">Reviews</NavLink>
                    </li>
                    <li>
                        <details>
                            <summary className="text-lg">More</summary>
                            <ul className="p-3 w-36">
                                <li>
                                    <NavLink to="/AboutUs" className="text-lg">About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/ContactUs" className="text-lg">Contact Us</NavLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                   
                </ul>
            </div>
            <div className=" navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1">
                        <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                        <span className="text-lg font-bold">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
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
                            <NavLink to="Login">Login</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}