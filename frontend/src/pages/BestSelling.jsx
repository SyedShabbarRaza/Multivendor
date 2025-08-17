import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import ProductCard from '../components/Route/ProductCard/ProductCard.jsx'
import { productData } from '../static/data.jsx';

function BestSelling() {
  const [data,setData]=useState([]);
  
  useEffect(()=>{
    const d=productData&&productData.sort((a,b)=>b.total_sell-a.total_sell);
    setData(d);
    window.scrollTo(0,0);
},[]);
  return (
    <div>
        <Header activeHeading={2}/>
        <br />
        <br />
        <div className="w-11/12 mx-auto">

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] mb-12">
        {
          data&&data.map((i,index)=><ProductCard data={i} key={index}/>)
        }
          </div>
        {
          data&& data.length===0?(
            <h1 className='text-center justify-center items-center w-full text-[20px] pb-[100px]'>No Product Found!</h1>
          ):null
        }
        </div>
    </div>
  )
}

export default BestSelling