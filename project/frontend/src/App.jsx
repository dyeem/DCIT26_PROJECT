import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import axios from "axios";

import LoadingEffect from "./Components/LoadingEffect.jsx";
import router from "./Layouts/router.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users', {
      withCredentials: true
    }).then(res => {
      setUser(res.data.user); // User is logged in
      console.log(res.data.user);
    }).catch(() => {
      setUser(null); // No session / not logged in
    });
  }, []);

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
