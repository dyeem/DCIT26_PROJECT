import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { AuthProvider } from './Components/Auth/AuthContext.jsx';
import { AdminAuthProvider } from './Components/Admin/AdminAuth/AdminAuthContext.jsx';

const root = document.getElementById('root');

// Detect whether we’re on the admin side
const isAdminRoute = window.location.pathname.startsWith('/admin');

const RootApp = () => {
  if (isAdminRoute) {
    return (
      <StrictMode>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </StrictMode>
    );
  } else {
    return (
      <StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StrictMode>
    );
  }
};

createRoot(root).render(<RootApp />);
