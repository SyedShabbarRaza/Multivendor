import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProducts from '../components/Products/SuggestedProducts';
import {useSelector} from 'react-redux';

// ✅ useParams
//  works with path parameters (:id, :slug, etc.).

// Search Params
// Refers to the query string in the URL (the part after ?).

function ProductDetailsPage() {
  const {id}=useParams(); //for fetching parameters from url
  const [searchParam]=useSearchParams();//for fetching query data after ?
  const eventData=searchParam.get("isEvent");
  const [data,setData]=useState()
  // const name=id.replace(/-/g," ");
  const {allProducts}=useSelector((state)=>state.products);
  const { allEvents } = useSelector((state) => state.events);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
    window.scrollTo(0,0)
  }, [allProducts, allEvents]);

    return (
    <div>
        <Header/>
        {data&&(<ProductDetails data={data}/>)}     
        {
          !eventData && (
            <>
            {data && <SuggestedProducts data={data} />}
            </>
          )
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage