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

    // Combined useEffect - Check user session and fetch cart simultaneously
    useEffect(() => {
        const initializeUserData = async () => {
            try {
                setLoading(true);
                
                // Check user session
                const sessionResponse = await axios.get('http://localhost/loop_backend/session_check_users.php', {
                    withCredentials: true,
                    timeout: 5000
                });
                
                if (sessionResponse.data.loggedIn) {
                    setIsLogin(true);
                    setUser(sessionResponse.data.user);
                    console.log("User is logged in:", sessionResponse.data.user);
                    
                    // Immediately fetch cart data without delay
                    await fetchCartData();
                } else {
                    setIsLogin(false);
                    setUser(null);
                    setUserCart([]);
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

        initializeUserData();
    }, []);

    // Separate cart fetching function
    const fetchCartData = async () => {
        setCartLoading(true);
        try {
            console.log("Fetching cart data...");
            
            const response = await axios.get(
                'http://localhost/loop_backend/session_cart.php',
                {
                    withCredentials: true,
                    timeout: 5000, // Reduced timeout
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log("Cart fetch response:", response.data);
            
            if (response.data.success) {
                const items = response.data.cart ?? response.data.items ?? [];
                setUserCart(items);
                console.log("User cart updated:", items);
            } else {
                console.log("Cart fetch failed:", response.data.message);
                setUserCart([]);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
            
            if (error.code === 'ECONNABORTED') {
                console.error("Cart fetch timeout - server may be slow");
            } else if (error.response?.status === 401) {
                console.error("User not authenticated for cart");
                setIsLogin(false);
                setUser(null);
            }
            
            setUserCart([]);
        } finally {
            setCartLoading(false);
        }
    };

    // Function to manually refresh cart (useful after adding items)
    const refreshCart = async () => {
        if (!isLogin || !user) return;
        await fetchCartData();
    };

    // Optimistic cart update function
    const updateCartOptimistically = (newItem) => {
        setUserCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.product_id === newItem.product_id && 
                        item.product_size === newItem.product_size && 
                        item.product_color === newItem.product_color
            );

            if (existingItemIndex >= 0) {
                // Update existing item quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].product_quantity += newItem.product_quantity;
                return updatedCart;
            } else {
                // Add new item
                return [...prevCart, newItem];
            }
        });
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
            updateCartOptimistically,
            setCheckoutItems
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
