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
import Cart from "../Components/Cart.jsx";


//Root Layout
import RootLayout from '../Layouts/RootLayout.jsx'
import SalesLayout from "./SalesLayout.jsx";
import CheckoutLayout from "./CheckoutLayout.jsx";
import HelpLayout from "./HelpLayout.jsx";


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout/>}>
      <Route path="login" element={<Login />} />
      <Route index element={<MainContent />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="reviews" element={<Reviews />} />

      {/* <Route path="sales" element={<Sales />} loader={productsLoader} /> */}
      <Route path="products" element={<SalesLayout />}>
        <Route index element={<Sales />} />
        <Route path="checkout" element={<CheckoutLayout />}>
          <Route index element={<CheckOut />} />
          <Route path="orderconfirmationpage" element={<OCPage />} />
        </Route>
      </Route>

      <Route path="help" element={<HelpLayout/>}>
        <Route path="contactus" element={<ContactUs />} />
        <Route path="faqpage" element={<FaqPage />}/>
      </Route>

      <Route path="ourteam" element={<OurTeam />} />
    </Route>
  </>
))

export default router;