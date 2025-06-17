import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userCart, setUserCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);
    const [checkoutItems, setCheckoutItems] = useState([]);

    // First useEffect - Check user session
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const res = await axios.get('http://localhost/loop_backend/session_check_users.php', {
                    withCredentials: true,
                    timeout: 5000 // Add timeout
                });
                
                if (res.data.loggedIn) {
                    setIsLogin(true);
                    setUser(res.data.user);
                    console.log("User is logged in:", res.data.user);
                } else {
                    setIsLogin(false);
                    setUser(null);
                    setUserCart([]); // Clear cart if not logged in
                }
            } catch (err) {
                console.error("Session check failed:", err);
                setIsLogin(false);
                setUser(null);
                setUserCart([]);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, []);

    // Second useEffect - Fetch cart data only after user is confirmed
    useEffect(() => {
        const fetchCartData = async () => {
            // Only fetch cart if user is logged in
            if (!isLogin || !user) {
                setUserCart([]);
                return;
            }

            setCartLoading(true);
            try {
                console.log("Fetching cart data for user:", user.id);
                
                const response = await axios.get(
                    'http://localhost/loop_backend/checkout_session_based.php',
                    {
                        withCredentials: true,
                        timeout: 10000,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                console.log("Cart fetch response:", response.data);
                
                // Handle both success cases (with items and empty cart)
                if (response.data.success) {
                    const items = response.data.items || [];
                    setUserCart(items);
                    console.log("User cart updated:", items);
                } else {
                    console.log("Cart fetch failed:", response.data.message);
                    setUserCart([]);
                }
            } catch (error) {
                console.error("Error fetching checkout data:", error);
                
                if (error.code === 'ECONNABORTED') {
                    console.error("Cart fetch timeout - server may be slow");
                } else if (error.response?.status === 401) {
                    console.error("User not authenticated for cart");
                    setIsLogin(false);
                    setUser(null);
                } else if (error.response?.status === 404) {
                    console.error("Cart endpoint not found");
                } else if (error.response?.status === 500) {
                    console.error("Server error when fetching cart");
                }
                
                setUserCart([]);
            } finally {
                setCartLoading(false);
            }
        };

        // Add a small delay to ensure session is fully established
        if (!loading && isLogin) {
            const timeoutId = setTimeout(() => {
                fetchCartData();
            }, 100); // 100ms delay

            return () => clearTimeout(timeoutId);
        } else if (!loading && !isLogin) {
            setUserCart([]);
            setCartLoading(false);
        }
    }, [isLogin, user, loading]); // Depend on user login state

    // Function to manually refresh cart (useful after adding items)
    const refreshCart = async () => {
        if (!isLogin || !user) return;
        
        setCartLoading(true);
        try {
            const response = await axios.get(
                'http://localhost/loop_backend/checkout_session_based.php',
                {
                    withCredentials: true,
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.success && response.data.items) {
                setUserCart(response.data.items);
            } else {
                setUserCart([]);
            }
        } catch (error) {
            console.error("Error refreshing cart:", error);
        } finally {
            setCartLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            isLogin, 
            user, 
            loading, 
            userCart, 
            cartLoading,
            checkoutItems,
            setIsLogin, 
            setUser, 
            setUserCart,
            refreshCart,
            setCheckoutItems
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
