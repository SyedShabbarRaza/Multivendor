import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
import server from "../../server.js";
import styles from "../../styles/styles.js";
import Loader from "../Layout/Loader.jsx";

const ShopInfo = ({ isOwner }) => {
  const [data,setData] = useState({});
  const [isLoading,setIsLoading] = useState(false);

  const {id} = useParams();
//   useEffect(() => {
//     setIsLoading(true);
//     axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
//      setData(res.data.shop);
//      setIsLoading(false);
//     }).catch((error) => {
//       console.log(error);
//       setIsLoading(false);
//     })
//   }, [])
  

  const logoutHandler = async () => {
   await axios.get(`${server}/api/shop/logout`,{
      withCredentials: true,
    });
    window.location.reload();
  };


  return (
   <>
   {
    isLoading  ? (
      <Loader />
    ) : (
      <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          {/* <img
            src={`${backend_url}${data.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          /> */}

                                <img
                        src={`https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png`}
                        className="w-[35px] h-[35px] rounded-full"
                        alt="profilepic"
                      />

        </div>
        <h3 className="text-center py-2 text-[20px]">{data.name}Shop Name</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data.description} Shop Description
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data.address}address</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data.phoneNumber}phNumber</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{data?.createdAt?.slice(0, 10)}june10,2022</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <div className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !w-full !h-[42px] !rounded-[5px]`}>
            <span className="text-white">Edit Shop</span>
          </div>
          <div className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !w-full !h-[42px] !rounded-[5px]`}
          onClick={()=>logoutHandler()}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
    )
   }
   </>
  );
};

export default ShopInfo;