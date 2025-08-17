import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { HiMinus, HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

function Wishlist({ setOpenWishlist }) {
  const cartData = [
    {
      name: "Iphone 14 pro max 256Gb ssd and 8GB ram silver colour",
      description: "test",
      price: 1020,
    },
    {
      name: "Iphone 14 pro max 256Gb ssd and 8GB ram silver colour",
      description: "test",
      price: 2020,
    },
    {
      name: "Iphone 14 pro max 256Gb ssd and 8GB ram silver colour",
      description: "test",
      price: 5020,
    },
  ];
  return (
<div className="fixed left-0 top-0 h-screen bg-[#00000030] z-40 flex items-center justify-center w-full">
      <div className="w-[90%] md:w-[70%] h-[90%] overflow-y-scroll bg-white rounded-md shadow-lg p-4">
        <div className="sticky top-0 z-50 flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenWishlist(false);
                    }}
                  />
                </div>
        <div className="flex items-center p-4">
          <AiFillHeart size={25} className="" />
          <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
        </div>
        <div className="w-full">
          {cartData &&
            cartData.map((i, index) => <SingleWishlist key={index} data={i} />)}
        </div>
      </div>
    </div>
  );
}

const SingleWishlist = ({ data }) => {
  const [value, setValue] = useState(1);

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" size={30} />
        <img
          src="data:image/png;base64,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"
          alt="image"
          className="w-[25px] h-[25px] md:w-[50px] md:h-[50px] ml-2 md:ml-5"
        />

        <div className="pl-[5px] w-full">
          <h1 className="w-full">{data.name}</h1>
          <h4 className="font-[600px] text-[17px] pt-[3px] text-[#d02222] font-sans">
            {data.price}
          </h4>
        </div>

          <BsCartPlus size={30} className="cursor-pointer " title="Add to cart" />
      </div>
    </div>
  );
};
export default Wishlist;
