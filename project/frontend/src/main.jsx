import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//auth
import { AuthProvider } from './Components/Auth/AuthContext.jsx';
import { AdminAuthProvider } from './Components/Admin/AdminAuth/AdminAuthContext.jsx';  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </AuthProvider>
  </StrictMode>,
)
