import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Route/ProductCard/ProductCard.jsx'
import { useDispatch, useSelector } from 'react-redux';

function ProductsPage() {
  const [searchParams]=useSearchParams();
  const categoryData=searchParams.get("category");
  const {allProducts}=useSelector((state)=>state.products);
  const [data,setData]=useState([]);
  
  useEffect(()=>{
    // setData(allProducts);
    const allProd=allProducts?[...allProducts]:[];
    if(categoryData===null){
      const d=allProd&&allProd.sort((a,b)=>a.sold_out-b.sold_out);//Lowest sales to highest sales
      setData(d);
    }else{
      const d=allProd&&allProd.filter((i)=>i.category===categoryData)
      setData(d);
    }
    window.scrollTo(0,0);
  },[allProducts]);
  return (
    <div>
        <Header activeHeading={3}/>
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

export default ProductsPage