import axios from "axios";
import server from "../../server";

//Load User
export const getAllSellers=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"getAllSellersRequest",
        });
        const {data}=await axios.get(`${server}/api/shop/adminAllSellers`,{withCredentials:true});
        dispatch({
            type:"getAllSellersSuccess",
            payload:data.sellers,
        })
        
    }catch(error){
        dispatch({
            type:"getAllSellerFailed",
            payload:error.response.data.message,
        });
    }
}