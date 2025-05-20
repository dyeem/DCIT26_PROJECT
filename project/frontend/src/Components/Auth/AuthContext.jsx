import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost/loop_backend/session_check.php', {
            withCredentials: true,
        })
        .then(res => {
            if (res.data.loggedIn) {
                setIsLogin(true);
                setUser(res.data.user);
                console.log("User is logged in:", res.data.user);
            } else {
                setIsLogin(false);
                setUser(null);
            }
        })
        .catch(err => console.error("Session check failed:", err))
        .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, user, loading, setIsLogin, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
