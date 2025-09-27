import React from "react";
import CountDown from "./CountDown";
import infinix from "../../assets/Infinix-Hot-8.jpg"
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
function EventCard({active,data}) {
  const {cart}=useSelector((state)=>state.cart);
  const dispatch=useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  return (
    <div className={`w-full blcok bg-white rounded-lg ${active?"unset":"mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[40%] m-auto">
        <img src={data.images[0]["url"]} alt="" onError={(e)=>{
          e.target.onerror=null;
          e.target.src=infinix;
        }} />
      </div>
      <div className="w-full lg:w-[60%] m-auto flex flex-col justify-center">
        <h2 className="text-[25px] font-[600] font-Roboto text-[#333]">
          {data.name}
        </h2>
        <p>
{data.description}        </p>
        <div className="flex justify-between">
          <div className="flex pt-3">
            <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h4>
            <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {data.originalPrice}$
            </h3>
          </div>

          <h3 className="text-[16px] text-green-400 mt-1">{data.sold_out} Sold</h3>
        </div>

        <CountDown data={data}/>

 <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
      </div>
  );
}

export default EventCard;




// import React from "react";
// import styles from "../../styles/styles";
// import CountDown from "./CountDown";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart } from "../../redux/actions/cart";
// import { toast } from "react-toastify";

// const EventCard = ({ active, data }) => {
//   const { cart } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const addToCartHandler = (data) => {
//     const isItemExists = cart && cart.find((i) => i._id === data._id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   }
//   return (
//     <div
//       className={`w-full block bg-white rounded-lg ${
//         active ? "unset" : "mb-12"
//       } lg:flex p-2`}
//     >
//       <div className="w-full lg:-w[50%] m-auto">
//         <img src={`${data.images[0]?.url}`} alt="" />
//       </div>
//       <div className="w-full lg:[w-50%] flex flex-col justify-center">
//         <h2 className={`${styles.productTitle}`}>{data.name}</h2>
//         <p>{data.description}</p>
//         <div className="flex py-2 justify-between">
//           <div className="flex">
//             <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
//               {data.originalPrice}$
//             </h5>
//             <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
//               {data.discountPrice}$
//             </h5>
//           </div>
//           <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
//             {data.sold_out} sold
//           </span>
//         </div>
//         <CountDown data={data} />
//         <br />
//         <div className="flex items-center">
//           <Link to={`/product/${data._id}?isEvent=true`}>
//             <div className={`${styles.button} text-[#fff]`}>See Details</div>
//           </Link>
//           <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
