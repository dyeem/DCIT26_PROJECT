import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Custom hook to get auth status

const AdminRoute = ({ children }) => {
    const { user } = useAuth(); // Assuming useAuth provides user info

    // Check if user is authenticated and is an admin
    if (!user || !user.isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children; // Render the children if authenticated and admin
};

export default AdminRoute;