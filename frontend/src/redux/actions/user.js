import axios from "axios";
import server from "../../server";

//Load User
export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest",
        });
        const {data}=await axios.get(`${server}/api/auth/getUser`,{withCredentials:true});
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user,
        })
        
    }catch(error){
        dispatch({
            type:"LoadUserFail",
            payload:error.response.data.message,
        });
    }
}

export const updateUser=(email,name,password,phoneNumber)=>async(dispatch)=>{
    
    try{
        dispatch({
            type:"UpdateUserRequest",
        });
        const {data}=await axios.put(`${server}/api/auth/updateUser`,{email,name,password,phoneNumber},{withCredentials:true});
        dispatch({
            type:"UpdateUserSuccess",
            payload:data.user,
        })
        
    }catch(error){
        dispatch({
            type:"UpdateUserFail",
            payload:error.response.data.message,
        });
    }

}


//Load Seller
export const loadSeller=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LoadSellerRequest",
        });
        const {data}=await axios.get(`${server}/api/shop/getSeller`,{withCredentials:true});
        dispatch({
            type:"LoadSellerSuccess",
            payload:data.seller,
        })
        
    }catch(error){
        dispatch({
            type:"LoadSellerFail",
            payload:error.response.data.message,
        });
    }
}

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/api/auth/updateUserAddresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.user,
        },
      });

    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/api/auth/deleteUserAddress/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload:"User deleted successfully!", 
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/api/auth/adminAllUsers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};