import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

function ProductDetailsCard({ setOpen, data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);
  const handleMessageSubmit = (e) => {};

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
    <div className="fixed left-0 top-0 h-screen bg-[#00000030] z-40 flex items-center justify-center">
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
              src={data.image_Url[0].url}
              alt="productImage"
              className="md:h-[50%]"
            />

            {/* product Info */}
            <div className="justify-between flex">
              <div className="flex">
                <img
                  src={data.shop.shop_avatar.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="">
                  <h3 className="pt-2 text-[15px] text-blue-400 pb-3">
                    {data.shop.name}
                  </h3>{" "}
                  <h5 className="pb-3 text-[15px]">
                    ({data.shop.ratings})Ratings
                  </h5>
                </div>
              </div>
              <div className="ml-2">
                <h3 className="text-[12px] text-red-400 mt-1">
                  ({data.total_sell}) Sold out
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
                {data.discount_price}$
              </h4>
              <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                {data.price ? data.price + "$" : null}
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

              <div className="">
                {click ? (
                  <AiFillHeart
                    size={22}
                    // className="cursor-pointer absolute right-2 top-5"
                    onClick={() => setClick(!click)}
                    color={click ? "red" : "#333"}
                    title="Remove from the wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={22}
                    // className="cursor-pointer absolute right-2 top-5"
                    onClick={() => setClick(!click)}
                    color={click ? "red" : "#333"}
                    title="Remove from the wishlist"
                  />
                )}
              </div>
            </div>

            <div
                  className="w-[140px] bg-black h-[50px] my-2 flex items-center justify-center rounded-sm cursor-pointer mt-4 h=8"
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart size={20} className="ml-1"/>
                    
                  </span>
                </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
