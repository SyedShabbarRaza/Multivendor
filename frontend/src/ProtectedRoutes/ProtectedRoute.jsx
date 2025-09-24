import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";


const ProtectedRoute=({children})=>{
    const { isLoading, isAuthenticated } = useSelector((state) => state.user);
    
    // if(isLoading===true){
    //         return <Loader/>
    //     }else{
    //                 if(!isAuthenticated){
    //             return <Navigate to="/login" replace/>
    //         }
    //         return children;
    //     }

    if (isLoading) {
  return <Loader />;
}

if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

return children;

}
export default ProtectedRoute;