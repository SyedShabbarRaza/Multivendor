import React, { useState } from "react";
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
function ProductCard({ data }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  // \s = any space, tab, or new line     + = one or more of them   g = global (do it everywhere in the string, not just the first match)
  return (
    <>
      <div className="w-full h-[379w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link to={`/product/${product_name}`}>
          <img
            src={data.image_Url[0].url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to="/">
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
            {data.shop.name}
          </h5>
        </Link>

        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
            <AiOutlineStar
              size={20}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                {data.price ? data.price + " $" : null}$
              </h4>
            </div>

            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold
            </span>
          </div>
        </Link>

        {/*side options*/}
        <div className="">
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from the wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
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
              onClick={() => setOpen(!open)}
              color={ "#444"}
              title="Add to Cart"
            />
            {
                open?(
                    <ProductDetailsCard setOpen={setOpen} data={data}/>
                ):null
            }
        </div>
      </div>
    </>
  );
}

export default ProductCard;
