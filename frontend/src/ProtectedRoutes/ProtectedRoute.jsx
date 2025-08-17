import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";


const ProtectedRoute=({children})=>{
    const { isLoading, isAuthenticated } = useSelector((state) => state.user);
    
    // if(loading===false){
    //     if(!isAuthenticated){
    //     return <Navigate to="/login" replace/>
    // }
    // return children;
    // }
    if(isLoading===true){
            return <Loader/>
        }else{
                    if(!isAuthenticated){
                return <Navigate to="/login" replace/>
            }
            return children;
        }
}
export default ProtectedRoute;