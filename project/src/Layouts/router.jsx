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
import OCPage from "../Components/OCPage.jsx";


//Root Layout
import RootLayout from '../Layouts/RootLayout.jsx'
import SalesLayout from "./SalesLayout.jsx";
import CheckoutLayout from "./CheckoutLayout.jsx";
import HelpLayout from "./HelpLayout.jsx";

//error page
import ErrorPage from '../Components/ErrorPage/PagenotFound.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout/>}>
      <Route path="login" element={<Login />} />
      <Route index element={<MainContent />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="products" element={<SalesLayout />}>
        <Route index element={<Sales />} />
        <Route path="checkout" element={<CheckoutLayout />}>
          <Route index element={<CheckOut />} />
          <Route path="orderconfirmationpage" element={<OCPage />} />
          {/* Handle missing/mismatched page */}
          <Route path="*" element={<ErrorPage/>}/> 
        </Route>
        {/* Handle missing/mismatched page */}
        <Route path="*" element={<ErrorPage/>}/> 
      </Route>
      <Route path="help" element={<HelpLayout/>}>
        <Route path="contactus" element={<ContactUs />} />
        <Route path="faqpage" element={<FaqPage />}/>
        {/* Handle missing/mismatched page */}
        <Route path="*" element={<ErrorPage/>}/> 
      </Route>
      <Route path="ourteam" element={<OurTeam />} />
      
      {/* Handle missing/mismatched page */}
      <Route path="*" element={<ErrorPage/>}/> 
    </Route>
  </>
))

export default router;