import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost/loop_backend/admin/session_check_admin.php', {
            withCredentials: true,
        })
        .then(res => {
            if (res.data.loggedIn) {
                setIsAdminLogin(true);
                setAdmin(res.data.admin);
                console.log("Admin is logged in:", res.data.admin);
            } else {
                setIsAdminLogin(false);
                setAdmin(null);
                console.log("Admin is not logged in.");
            }
        })
        .catch(err => console.error("Admin session check failed:", err))
        .finally(() => setAdminLoading(false));
    }, []);

    return (
        <AdminAuthContext.Provider value={{ isAdminLogin, admin, adminLoading, setIsAdminLogin, setAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}
