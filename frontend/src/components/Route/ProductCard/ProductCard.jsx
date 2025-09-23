import { useEffect, useState } from "react";
import oppo from '../../../assets/oppo.jpeg'
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { addTowishlist, removeFromwishlist } from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import Ratings from "../../Products/Ratings";
function ProductCard({ data ,isEvent}) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  // const d = data.name;
  // const data._id = d.replace(/\s+/g, "-");
  const {wishlist}=useSelector((state)=>state.wishlist)
  const {cart}=useSelector((state)=>state.cart)
  const dispatch=useDispatch();
  // \s = any space, tab, or new line     + = one or more of them   g = global (do it everywhere in the string, not just the first match)


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

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");


      // if (data.stock < count) {
      //   toast.error("Product stock limited!");
      // } else {
      //   const cartData = { ...data, qty: count };
      //   dispatch(addTocart(cartData));
      //   toast.success("Item added to cart successfully!");
      // }
    }
  };

  return (
    <>
      <div className="w-full h-[379px] bg-white rounded-lg shadow-sm p-3 relative transform transition duration-300 ease-in-out 
                hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500">
        <div className="flex justify-center">
          <Link to={isEvent?`/product/${data._id}?isEvent=true`:`/product/${data._id}`}>
          <img
            src={data.images[0]["url"]}
            alt=""
            onError={(e) => {
      e.target.onerror = null; // prevent infinite loop
      e.target.src = oppo;
    }}
            className="w-full h-[170px] object-fill rounded-2xl"
          />
        </Link>
        </div>

        <Link to={`/shop/${data.shopId}`}>
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
            {data.shop.name}
          </h5>
        </Link>

        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
                {data.discountPrice ? data.discountPrice : data.originalPrice}$
              </h5>
              <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>

            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.sold_out} sold
            </span>
          </div>
        </Link>

        {/*side options*/}
        <div className="">
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from the wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color="#333"
              title="Remove from the wishlist"
            />
          )}
          <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color={ "#333"}
              title="Quick view"
            />
          <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data)}
              color={ "#444"}
              title="Add to Cart"
            />
        </div>
      </div>
            {
                open?(
                    <ProductDetailsCard setOpen={setOpen} data={data}/>
                ):null
            }
    </>
  );
}

export default ProductCard;
