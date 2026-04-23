import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children, allowedRoles}) => {
    const { isAuthenticated, userRole } = useAuth();

    // 1. If they aren't logged in at all, kick them to the login screen
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. If this route requires specific roles, and the user doesn't have one of the them
    if(allowedRoles && !allowedRoles.includes(userRole)) {
        // Kick them back to their appropriate dashboard, or home if unknown
        if(userRole === 'CITIZEN') return <Navigate to="/citizen" replace />;
        if(userRole === 'OFFICER') return <Navigate to="/officer" replace />;
        if(userRole === 'ADMIN') return <Navigate to="/admin" replace />;
        return <Navigate to="/" replace />;
    }

    // 3. If they pass the check, render the page they requested!
    return children;
};

export default ProtectedRoute;