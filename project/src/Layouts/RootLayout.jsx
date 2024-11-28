import { NavLink, Outlet} from "react-router-dom";
import { useState } from 'react';
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Banner from '../Components/Banner';


export default function RootLayout() {
    const [cartItems, setCartItems] = useState([]);
    
    return (
        <div className="root-layout">
            <header>
                <nav >
                    <NavBar NavLink={NavLink} cartItems={cartItems} setCartItems={setCartItems} />
                </nav>
            </header>
            <main>
                <Banner />
                <Outlet/>
            </main>
            <footer className="bg-white dark:bg-gray-900">
                <Footer/>
            </footer>
        </div>
    );
}