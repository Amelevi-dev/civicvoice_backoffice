import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth.service';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuth = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    toast.error("Accès non autorisé pour votre rôle");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;