import { 
  Route, 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import RootLayout from './Layouts/RootLayout.jsx'
import { useState, useEffect } from "react";


//pages
import LoadingEffect from "./Components/LoadingEffect.jsx";
import MainContent from "./Components/MainContent.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import CheckOut from "./Components/CheckOut.jsx";
import ContactUs from "./Components/ContactUs.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Components/Login.jsx";
import Reviews from "./Components/Reviews.jsx";
import Sales from "./Components/Sales.jsx";
import Signup from "./Components/Signup.jsx";
import NavBar from "./Components/NavBar.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<MainContent />} />
    <Route path="aboutus" element={<AboutUs />} />
    <Route path="checkout" element={<CheckOut />} />
    <Route path="contactus" element={<ContactUs />} />
    <Route path="login" element={<Login />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="sales" element={<Sales />} />
    <Route path="signup" element={<Signup />} />
  </Route>
))

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => {
      setFadeOut(true);
      }, 2500); // Start fade-out 2.5s after loading screen shows

      const hideLoadingTimer = setTimeout(() => {
      setIsLoading(false);
      }, 3000); // Hide loading screen after 3s

      return () => {
      clearTimeout(timer);
      clearTimeout(hideLoadingTimer);
      };
  }, []);

  return (
    <>
      {isLoading ? ( <LoadingEffect fadeOut={fadeOut} />) : (
            <RouterProvider router={router}/>
      )}
    </>
  )
}
export default App;
