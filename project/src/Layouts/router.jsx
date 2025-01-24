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
import CustomizePage from "../Components/CustomizePage.jsx";
import ProductDetails from "../Components/ProductDetails.jsx";

// PRODUCT LOADER
import { ProductsLoader } from "../Components/Loader/ProductsLoader.js";
import { ProductDetailsLoader } from "../Components/Loader/ProductDetLoader.js";

//Root Layout
import RootLayout from '../Layouts/RootLayout.jsx'
import SalesLayout from "./SalesLayout.jsx";
import CheckoutLayout from "./CheckoutLayout.jsx";
import HelpLayout from "./HelpLayout.jsx";

//error page
import ErrorPage from '../Components/ErrorPage/PagenotFound.jsx'
import DatanotFound from "../Components/ErrorPage/DatanotFound.jsx";

// admin route
import AdminLayout from "./AdminLayout.jsx";
import AdminDashboard from "../Components/Admin/AdminDashBoard.jsx";
import ProductList from "../Components/Admin/ProductList.jsx";
import AdminRoute from "../Components/Admin/AdminRoute.jsx";
import EditProduct from "../Components/Admin/EditProduct.jsx";
import ProductsLayout from "./ProductsLayout.jsx";
import AddProduct from "../Components/Admin/AddProduct.jsx";
import UsersList from "../Components/Admin/UsersList.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<MainContent />} />
      <Route path="login" element={<Login />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="ourteam" element={<OurTeam />} />

      {/* PRODUCT ROUTE */}
      <Route path="products" element={<SalesLayout />} errorElement={<ErrorPage/>}>
        <Route index loader={ProductsLoader} element={<Sales />} />
        <Route path=":id" loader={ProductDetailsLoader} element={<ProductDetails/>} errorElement={<DatanotFound/>}/>
        <Route path="checkout" element={<CheckoutLayout />} errorElement={<ErrorPage/>}>
          {/* CHECKOUT ROUTE */}
          <Route index element={<CheckOut />} />
          <Route path="orderconfirmationpage" element={<OCPage />} />
          {/* Handle missing/mismatched page */}
          <Route path="*" element={<ErrorPage/>}/> 
        </Route>
        {/* Handle missing/mismatched page */}
        <Route path="*" element={<ErrorPage/>}/> 
      </Route>

      {/* HELP ROUTE */}
      <Route path="help" element={<HelpLayout/>} errorElement={<ErrorPage/>}>
        <Route path="contactus" element={<ContactUs />} />
        <Route path="faqpage" element={<FaqPage />}/>
        <Route path="customize-order" element={<CustomizePage/>}/>
        {/* Handle missing/mismatched page */}
        <Route path="*" element={<ErrorPage/>}/> 
      </Route>
    </Route>
    
    {/* Admin Route */}
    <Route path="admin" element={<AdminLayout />} errorElement={<ErrorPage/>}>
      <Route index element={<AdminDashboard />} />
      <Route path="manage-product" element={<ProductsLayout />}>
        <Route index element={<ProductList />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product" element={<EditProduct />} />
      </Route>
      {/* Additional admin routes */}
      <Route path="*" element={<ErrorPage />} />

      <Route path="manage-user" element={<UsersList/>}>
        <Route index element={<UsersList/>}/>
      </Route>
    </Route>
    
    {/* Handle missing/mismatched page */}
    <Route path="*" element={<ErrorPage/>}/> 
  </>
))

export default router;