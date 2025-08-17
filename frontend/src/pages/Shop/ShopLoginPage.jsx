import React, { useEffect } from 'react'
import ShopLogin from '../../components/Shop/ShopLogin.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ShopLoginPage() {
  const navigate=useNavigate();
    const {isLoading,isSeller}=useSelector((state)=>state.seller);
  
    useEffect(()=>{
      if(isSeller===true)navigate("/dashboard")
    },[isLoading,isSeller])

  return (
    <ShopLogin/>
  )
}

export default ShopLoginPage;