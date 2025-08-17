import React, { useEffect } from 'react'
import ShopCreate from '../../components/Shop/ShopCreate'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ShopCreatePage() {
  const navigate=useNavigate();
    const {isSeller,seller}=useSelector((state)=>state.seller);
  
    useEffect(()=>{
      if(isSeller===true)navigate(`/dashboard`)
    },[])

  return (
    <ShopCreate/>
  )
}

export default ShopCreatePage