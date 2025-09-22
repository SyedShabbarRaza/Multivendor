import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import oppo from "../../../assets/oppo.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart";
import {toast} from "react-toastify"
import { addTowishlist, removeFromwishlist } from "../../../redux/actions/wishlist";
function ProductDetailsCard({ setOpen, data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const {cart}=useSelector((state)=>state.cart);
  const {wishlist}=useSelector((state)=>state.wishlist);
  const dispatch=useDispatch()
  const handleMessageSubmit = (e) => {};

    useEffect(()=>{
      if(wishlist&&wishlist.find((i)=>i._id===data._id)){
        setClick(true);
      }else{
        setClick(false);
      }
    },[wishlist]);

  const removeFromWishlistHandler=(data)=>{
  setClick(!click)
  dispatch(removeFromwishlist(data))  
}

const addToWishlistHandler=(data)=>{
  setClick(!click)
  dispatch(addTowishlist(data));
}


  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const increment = () => {
    setCount(count + 1); //count++ does not worked
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1); //count-- does not worked
  };

  return (
    //fixed ko left top right etc zaroor chahiye hoty hain
    //item center => center it vertically
    //justify center => center it horizontally
    //Use vh when You want something to take up a portion regardless of its parent.
    //Gradient Syntax in tailwind=>bg-gradient-to-r from-teal-400 to-teal-500
    <div className="fixed left-0 top-0 h-screen bg-[#00000030] z-40 flex items-center justify-center w-full">
      <div className="w-[90%] md:w-[80%] h-[90%] overflow-y-scroll md:h-[75%] bg-white rounded-md shadow-lg p-4">
        {/* Cross Icon */}
        <div className="sticky top-0 z-50 flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>

        <div className="block w-full md:flex">
          {/* Image and Info */}
          <div className="w-full md:w-[50%]">
            <img
              src={data.images[0]["url"]}
              alt="productImage"
              onError={(error) => {
                error.target.onError = null;
                error.target.src = oppo;
              }}
              className="md:h-[90%] mx-auto rounded-2xl mb-2"
            />

            {/* product Info */}
            <div className="justify-between flex">
              <Link to={`/shop/${data.shopId}`}>
              <div className="flex">
                <img
                  src={data.shop.avatar}
                  alt=""
                  onError={(error) => {
                    error.target.onerror = null;
                    error.target.src =
                      "https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/5cad/cf09/c31f/019f/8cbc/eaca/4d10/181a/d89b/e095/e095.jpg";
                  }}
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="">
                  <h3 className="pt-2 text-[15px] text-blue-400 pb-3">
                    {data.shop.name}
                  </h3>{" "}
                  <h5 className="pb-3 text-[15px]">
                    ({data.shop.ratings===null?0:4.5})Ratings
                  </h5>
                </div>
              </div>
              </Link>
              <div className="ml-2">
                <h3 className="text-[12px] text-red-400 mt-1">
                  ({data.sold_out}) Sold out
                </h3>

                <div
                  className="w-[100px] bg-black h-[40px] my-2 flex items-center justify-center rounded-xl cursor-pointer mt-2 h=8"
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Contact
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* right side */}

          <div className="w-full md:w-[50%] pt-5 pl-[5px] pr-[5px]">
            <h1 className="text-[25px] font-[600] font-Roboto text-[#333] ">
              {data.name}
            </h1>
            <p>{data.description}</p>
            <div className="flex pt-3">
              <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                {data.discountPrice}$
              </h4>
              <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                {data.originalPrice ? data.originalPrice + "$" : null}
              </h3>
            </div>

            <div className="flex items-center mt-12 justify-between pr-3">
              <div className="">
                <button
                  onClick={decrement}
                  className="cursor-pointer bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                >
                  -
                </button>
                <span className="rounded-lg bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                  {count}
                </span>
                <button
                  onClick={increment}
                  className="cursor-pointer bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                >
                  +
                </button>
              </div>

              <div className="cursor-pointer">
                {click ? (
                  <AiFillHeart
                    size={22}
                    // className="cursor-pointer absolute right-2 top-5"
                    onClick={() => removeFromWishlistHandler(data)}
                    color={click ? "red" : "#333"}
                    title="Remove from the wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={22}
                    // className="cursor-pointer absolute right-2 top-5"
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "red" : "#333"}
                    title="Remove from the wishlist"
                  />
                )}
              </div>
            </div>

            <div
              className="w-[140px] bg-black h-[50px] my-2 flex items-center justify-center rounded-sm cursor-pointer mt-4 h=8"
              onClick={()=>addToCartHandler(data._id)}
            >
              <span className="text-[#fff] flex items-center">
                Add to cart <AiOutlineShoppingCart size={20} className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
