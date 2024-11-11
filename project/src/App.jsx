import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useState, useEffect} from 'react'

import LoadingEffect from "./Components/LoadingEffect.jsx"
import MainContent from "./Components/MainContent.jsx";


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start the fade-out effect just before hiding the loading screen
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // Start fade-out 0.5 seconds before the loading screen disappears

    // Hide loading screen completely after the fade-out animation
    const hideLoadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup timers
    return () => {
      clearTimeout(timer);
      clearTimeout(hideLoadingTimer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingEffect fadeOut={fadeOut} />
      ) : (
        <div>
          {/* Main app content */}
          <MainContent/>
        </div>
      )}
    </>
  );
}

export default App
