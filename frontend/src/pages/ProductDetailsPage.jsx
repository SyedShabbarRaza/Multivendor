import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProducts from '../components/Products/SuggestedProducts';

function ProductDetailsPage() {
  const {productName}=useParams();
  const [data,setData]=useState(null);
  const name=productName.replace(/-/g," ");

  useEffect(()=>{
    const data=productData.find((i)=>i.name===name);
    setData(data);
  },[])

  
    return (
    <div>
        <Header/>
        <ProductDetails data={data}/>     
        {
          data&&(
            <SuggestedProducts data={data}/>
          )
        } 
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage