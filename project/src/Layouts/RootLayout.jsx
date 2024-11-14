import { NavLink, Outlet} from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function RootLayout() {
    
    return (
        <div className="root-layout">
            <header>
                <nav >
                    <NavBar NavLink={NavLink}/>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer className="bg-white dark:bg-gray-900">
                <Footer/>
            </footer>
        </div>
    );
}