import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import store from "./Components/RTK/store.js";
import LoadingEffect from "./Components/LoadingEffect.jsx";
import router from "./Layouts/router.jsx";




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
    <Provider store={store}>
      {isLoading ? ( <LoadingEffect fadeOut={fadeOut} />) : (
        <RouterProvider router={router}/>
      )}
    </Provider>

    </>
  )
}
export default App;
