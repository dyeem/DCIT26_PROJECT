import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAdminAuth } from '../AdminAuth/AdminAuthContext';
import logo from '../../../Assets/logo.png';

//SVG
import menusvg from './SVG/menu.svg';
import productsvg from './SVG/products.svg';
import usersvg from './SVG/users.svg';
import ordersvg from './SVG/orders.svg';
import logoutsvg from './SVG/logout.svg';

export default function Navbar() {
    const navigate = useNavigate();
    const { setIsAdminLogin, setAdmin } = useAdminAuth();
    function handleLogout() {
        axios.get('http://localhost/loop_backend/admin/admin_logout.php', {
            withCredentials: true
        })
        .then(res => {
            if (res.data.success) {
                setIsAdminLogin(false);
                setAdmin(null);
                console.log("Admin logged out successfully.");
                navigate('/admin/login');
            } else {
                console.error("Logout failed:", res.data.message);
            }
        })
        .catch(err => {
            console.error("Logout error:", err);
        });
    }
    const navItems = [
        { path: '/admin/dashboard', label: 'Overview', icon: menusvg },
        { path: '/admin/manage-product', label: 'Products', icon: productsvg },
        { path: '/admin/manage-user', label: 'Users', icon: usersvg},
        { path: '/admin/orders', label: 'Orders', icon: ordersvg },
    ];

  return (
    <nav className="z-50 w-60 fixed h-screen p-10 bg-[#7E62FF] font-semibold ">
      <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items gap-y-5">
                <img src={logo} alt="" className='h-auto w-52 mb-14'/>
                {navItems.map(({ path, label, icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            ` flex items-center gap-x-2 px-3 py-1 rounded-md transition-colors duration-200
                            ${isActive ? 'text-[#FAF9F9] bg-[#6f52ee] font-bold' : 'text-white hover:bg-[#6f52ee]'} 
                            `
                        }
                    >
                        <img src={icon} alt="" />
                        <span>{label}</span>
                    </NavLink>
                ))}
          </div>
        <button onClick={handleLogout} className="flex items-center gap-x-2 text-[#FAF9F9] transition hover:bg-white hover:text-red-500 rounded-md p-2">
            <img src={logoutsvg} alt="" />
            <span>Logout</span>
        </button>
      </div>
    </nav>
  )
}
