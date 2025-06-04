import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import LoadingEffect from "./Components/LoadingEffect.jsx";
import router from "./Layouts/router.jsx";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
        <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
export default App;
