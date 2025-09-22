import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated,user } = useSelector((state) => state.user);
  if (isLoading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    } else if(user.role !== "Admin"){
        return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default AdminProtectedRoute;