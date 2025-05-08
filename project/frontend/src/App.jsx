import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import LoadingEffect from "./Components/LoadingEffect.jsx";
import router from "./Layouts/router.jsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8000'; // Set to your backend
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  // Add XSRF token to headers
  const xsrfToken = Cookies.get('XSRF-TOKEN');
  if (xsrfToken) {
      axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
      const timer = setTimeout(() => {
      setFadeOut(true);
      }, 2500); 

      const hideLoadingTimer = setTimeout(() => {
      setIsLoading(false);
      }, 3000); 

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
