import React, { useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard.jsx'
import styles from '../../../styles/styles.js'
import { productData } from '../../../static/data.jsx'
import { useSelector } from 'react-redux';

function FeaturedProducts() {
  const {allProducts,isLoading}=useSelector((state)=>state.products);
  //  const [data,setData]=useState([]);
  // useEffect(()=>{
  //   setData(products);
  //   // const [data, setData] = useState([]);
  //   //   useEffect(() => {
  //   //     const d=productData&&productData.sort((a,b)=>b.total_sell-a.total_sell);
  //   //     const firstFive = d.slice(0,5);
  //   //     setData(firstFive);

  // },[products]);
  return (
     <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
           {
            allProducts&&allProducts.map((i,index)=>(
              <ProductCard data={i} key={index}/>
            ))
            
           }
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts