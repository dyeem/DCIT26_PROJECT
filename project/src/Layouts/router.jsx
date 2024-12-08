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
import OurTeam from "../Components/OurTeam.jsx";
import FaqPage from "../Components/FaqPage.jsx";

//Root Layout
import RootLayout from '../Layouts/RootLayout.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout/>}>
      <Route path="login" element={<Login />} />
      <Route index element={<MainContent />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="checkout" element={<CheckOut />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="reviews" element={<Reviews />} />
      {/* <Route path="sales" element={<Sales />} loader={productsLoader} /> */}
      <Route path="sales" element={<Sales />}/>
      <Route path="ourteam" element={<OurTeam />} />
      <Route path="checkout" element={<CheckOut />}/>
      <Route path="faqpage" element={<FaqPage />}/>
    </Route>
  </>
))

export default router;