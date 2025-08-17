import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const increment = () => {
    setCount(count + 1); //count++ does not worked
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1); //count-- does not worked
  };

  const handleMessageSubmit = (e) => {};

  return (
    <div className="">
      {data ? (
        <div className="mx-auto w-[90%]">
          <div className=" py-5">
            <div className=" block md:flex">
              <div className=" md:w-[50%]">
                <img
                  src={data?.image_Url[select].url}
                  alt="image"
                  className="w-xs md:sm mx-auto"
                  onClick={() => setSelect(0)}
                />

                <div className="w-[90%] pt-10 ">
                  <div className="w-full flex justify-center items-center">
                    <div
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[0].url}
                        alt="image"
                        className="h-64 w-64 md:h-md md:w-md"
                        onClick={() => setSelect(0)}
                      />
                    </div>

                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[1].url}
                        alt="image"
                        className="h-64 w-64 md:h-md md:w-md"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[50%]">
                <h1 className="text-2xl font-medium font-roboto text-gray-900">
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className="text-xl font-medium font-roboto text-gray-900">
                    {data.discount_price}$
                  </h4>

                  <h3 className="ml-2 line-through text-md font-medium font-roboto text-red-500">
                    {data.price && data.price + "$"}
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
                    Add to cart{" "}
                    <AiOutlineShoppingCart size={20} className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="image"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />

                  <div className="pr-8">
                    <h3 className="pt-3 text-[15px] text-blue-400">
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      {data.shop.ratings}Ratings
                    </h5>
                  </div>

                  <div
                    className="w-[140px] bg-[#6443d1] h-[50px] my-2 flex items-center justify-center rounded-2xl cursor-pointer mt-4 h=8"
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message
                      <AiOutlineMessage size={20} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-gray-300 w-full min-h-[40vh]">
      <div className="flex justify-between pt-5 pb-3 mx-5 border-b">
        <div>
          <h5
            onClick={() => setActive(1)}
            className="text-black cursor-pointer text-xs md:text-xl px-2"
          >
            Product Detail
          </h5>
          {active === 1 && (
            <div className=" bg-[crimson] pt-1 rounded-xl"></div>
          )}
        </div>
        <div>
          <h5
            onClick={() => setActive(2)}
            className="text-black cursor-pointer text-xs md:text-xl px-2"
          >
            Product Reviews
          </h5>
          {active === 2 && <div className="bg-red-500  pt-1 rounded-xl"></div>}
        </div>
        <div>
          <h5
            onClick={() => setActive(3)}
            className="text-black cursor-pointer text-xs md:text-xl px-2"
          >
            Seller Info
          </h5>
          {active === 3 && <div className="bg-red-500 pt-1 rounded-xl"></div>}
        </div>
      </div>

      {active === 1 && (
        <div className="px-5">
          <p className="text-lg leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            minima accusantium quasi perspiciatis ullam deserunt eveniet
            commodi, delectus alias nesciunt, molestiae quas exercitationem
            quidem aut quisquam necessitatibus ab. Ab!
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            minima accusantium quasi perspiciatis ullam deserunt eveniet
            commodi, delectus alias nesciunt, molestiae quas exercitationem
            quidem aut quisquam necessitatibus ab. Ab!
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            minima accusantium quasi perspiciatis ullam deserunt eveniet
            commodi, delectus alias nesciunt, molestiae quas exercitationem
            quidem aut quisquam necessitatibus ab. Ab!
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            minima accusantium quasi perspiciatis ullam deserunt eveniet
            commodi, delectus alias nesciunt, molestiae quas exercitationem
            quidem aut quisquam necessitatibus ab. Ab!
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            minima accusantium quasi perspiciatis ullam deserunt eveniet
            commodi, delectus alias nesciunt, molestiae quas exercitationem
            quidem aut quisquam necessitatibus ab. Ab!
          </p>
        </div>
      )}
      {
        active ===2 &&(
          <h1 className="w-full min-h-[40vh] items-center flex justify-center">
            No Reviews Yet
          </h1>
        )
      }

      {active === 3 && (
        <div className="w-full block md:flex p-5">
          <div className="w-full md:w-[50%]">

              <div className="flex items-center">
                <img
                  src={`${data.shop.shop_avatar.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    (4.5) Ratings
                  </h5>
                </div>
              </div>
            
            <p className="pt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias minima quibusdam suscipit harum voluptatibus tenetur voluptate hic quos quod? Saepe tenetur sit in debitis aliquid, laboriosam consequuntur perspiciatis eaque suscipit.</p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  22 July 2024
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  499
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{5}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default ProductDetails;
