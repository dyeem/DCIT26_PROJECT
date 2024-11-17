import { 
    Route, 
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

//pages
import MainContent from "../Components/MainContent.jsx";
import AboutUs from "../Components/AboutUs.jsx";
import CheckOut from "../Components/CheckOut.jsx";
import ContactUs from "../Components/ContactUs.jsx";
import Login from "../Components/Login.jsx";
import Reviews from "../Components/Reviews.jsx";
import Sales from "../Components/Sales.jsx";
import Signup from "../Components/Signup.jsx";
import OurTeam from "../Components/OurTeam.jsx";

//Root Layout
import RootLayout from '../Layouts/RootLayout.jsx'


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
    <Route path="ourteam" element={<OurTeam />} />
  </Route>
))

export default router;