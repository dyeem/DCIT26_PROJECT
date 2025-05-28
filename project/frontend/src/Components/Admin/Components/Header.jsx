import { useLocation, useNavigate } from 'react-router-dom';
import merce from '../../../Assets/OurTeam/merce.jpg';
import { useEffect } from 'react';
import { useAdminAuth } from './../AdminAuth/AdminAuthContext';
//icons
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAdminLogin, admin } = useAdminAuth();

    useEffect(() => {
        if (!isAdminLogin) {
            navigate('/admin/login');
        }
    }, [isAdminLogin, navigate]);

    if (!admin) return null;

    const pageTitles = {
        '/admin/dashboard': {
            title: 'Dashboard',
            icon: <HomeIcon />
        },
        '/admin/manage-product': {
            title: 'Manage Products',
            icon: <InventoryIcon />
        },
        '/admin/orders': {
            title: 'Manage Orders',
            icon: <StorefrontIcon />
        },
        '/admin/manage-user': {
            title: 'Manage Customers',
            icon: <GroupIcon />
        },
        '/admin/profile': {
            title: 'Profile',
            icon: <PersonIcon />
        },
    };

    const currentPage = pageTitles[location.pathname];
    const currentTitle = currentPage ? currentPage.title : 'Admin Panel';
    const currentIcon = currentPage ? currentPage.icon : null;

    return (
        <div className="flex items-center bg-[#faf9f9] py-6 px-6 shadow-sm font-semibold font-roboto rounded-xl">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-x-2"> 
                    {currentIcon}                       
                    <p className="text-2xl font-semibold text-gray-700">{currentTitle}</p>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                    <p className="font-semibold text-gray-700">{admin.first_name}</p>
                    <div>
                        <img src={merce} alt="admin img" className="object-cover w-12 h-12 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}