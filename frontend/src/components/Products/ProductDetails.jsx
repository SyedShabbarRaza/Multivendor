import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import oppo from "../../assets/oppo.jpeg";
import infinix from "../../assets/Infinix-Hot-8.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import {
  addTowishlist,
  removeFromwishlist,
} from "../../redux/actions/wishlist";
import Ratings from "./Ratings";
import axios from "axios";
import server from "../../server";
function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data.shopId));
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromwishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addTowishlist(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/api/conversation/createNewConversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="">
      {data ? (
        <div className="mx-auto w-[90%]">
          <div className=" py-5">
            <div className=" block md:flex">
              <div className=" md:w-[50%]">
                <img
                  src={data.images[select]["url"]}
                  alt="image"
                  className="w-[80%] rounded-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = oppo;
                  }}
                />

                <div className="w-[90%] pt-10 ">
                  <div className="w-full flex justify-center items-center">
                    {data.images.map((img, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer ${
                          select === index ? "border-2 border-black" : ""
                        }`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={img["url"]}
                          alt={`thumbnail-${index}`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = oppo; // fallback image
                          }}
                          className="h-[200px] overflow-hidden m-2 rounded-2xl items-center justify-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 
                    <div
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={data.images[select]}
                        alt="image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = oppo;
                        }}
                        className=" md:h md:w-md"
                        onClick={() => setSelect(0)}
                      />
                    </div>

                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={data.images[1]}
                        alt="imagesss"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = infinix;
                        }}
                        className=" md:h-md md:w-md"
                        onClick={() => setSelect(1)}
                      />
                    </div> */}

              <div className="w-full md:w-[50%]">
                <h1 className="text-2xl font-medium font-roboto text-gray-900">
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className="text-xl font-medium font-roboto text-gray-900">
                    {data.discountPrice}$
                  </h4>

                  <h3 className="ml-2 line-through text-md font-medium font-roboto text-red-500">
                    {data.originalPrice && data.originalPrice + "$"}
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
                        color="#333"
                        title="Remove from the wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className="w-[140px] bg-black h-[50px] my-2 flex items-center justify-center rounded-sm cursor-pointer mt-4 h=8"
                  onClick={() => addToCartHandler(data)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart{" "}
                    <AiOutlineShoppingCart size={20} className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  <Link to={`/shop/${data.shopId}`}>
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
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/${data.shopId}`}>
                      <h3 className="pt-3 text-[15px] text-blue-400">
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      {totalRatings}/5 Ratings
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
          <ProductDetailsInfo
            data={data}
            products={products}
            totalRatings={totalRatings}
            totalReviewsLength={totalReviewsLength}
          />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({
  data,
  products,
  totalRatings,
  totalReviewsLength,
}) => {
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
          <p className="text-lg leading-8">{data.description}</p>
        </div>
      )}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = oppo;
                  }}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block md:flex p-5">
          <div className="w-full md:w-[50%]">
            <div className="flex items-center">
              <Link to={`/shop/${data.shopId}`}>
                <img
                  src={`${data.shop.avtar}`}
                  onError={(error) => {
                    error.target.onerror = null;
                    error.target.src =
                      "https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/5cad/cf09/c31f/019f/8cbc/eaca/4d10/181a/d89b/e095/e095.jpg";
                  }}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
              </Link>
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">{totalRatings}/5 Ratings</h5>
              </div>
            </div>

            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">{products.length}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop${data.shopId}`}>
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
