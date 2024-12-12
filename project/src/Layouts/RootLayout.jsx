import { NavLink, Outlet, useLocation } from "react-router-dom";

// pages
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Banner from '../Components/Banner';


export default function RootLayout() {

    const location = useLocation();
    const noBannerRoutes = ["/login"];
    
    return (
        <div className="root-layout">
            <header>
                <nav >
                    <NavBar NavLink={NavLink}/>
                </nav>
            </header>
            <main className="xl:mt-[5rem] xsm:mt-16">
                {!noBannerRoutes.includes(location.pathname) && <Banner />}
                <Outlet />
            </main>
            <footer className="bg-white dark:bg-gray-900">
                <Footer/>
            </footer>
        </div>
    );
}