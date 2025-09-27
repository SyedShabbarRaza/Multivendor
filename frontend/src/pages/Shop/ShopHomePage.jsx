import React, { useEffect, useState } from 'react'
import ShopInfo from '../../components/Shop/ShopInfo'
import ShopProfileData from '../../components/Shop/ShopProfileData'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ShopHomePage () {
const {seller}=useSelector((state)=>state.seller);
const {id}=useParams();
const [myShop,setMyShop]=useState(false);

useEffect(()=>{
  if(id===seller._id){
  setMyShop(true);
}else{
  setMyShop(false);
}
},[myShop])
  return (
    <div className={`w-[90%] p-4 mx-auto bg-[#f5f5f5]`}>
         <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
            <ShopInfo isOwner={myShop} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={myShop} />
          </div>
         </div>
    </div>
  )
}


export default ShopHomePage