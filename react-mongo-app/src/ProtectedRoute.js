import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (token) {
        return children;  // if authenticated, render children
    } else {
        // if not authenticated, redirect to login
        return <Navigate to={{ pathname: '/login', state: { from: location } }} replace />;
    }
}

export default ProtectedRoute;
