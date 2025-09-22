import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import oppo from '../../assets/oppo.jpeg'
import { removeFromwishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
function Wishlist({ setOpenWishlist }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const dispatch=useDispatch();

const removeFromwishlistHandler=(data)=>{
  dispatch(removeFromwishlist(data))
  }

    const addToCartHandler = (data) => {
      const isItemExists = cart && cart.find((i) => i._id === data._id);
      if (isItemExists) {
        toast.error("Item already in cart!");
      } else {
          const cartData = { ...data, qty: 1 };
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
      }
    };
  
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
          <h5 className="pl-2 text-[20px] font-[500]">
            {wishlist.length} Items
          </h5>
        </div>
        <div className="w-full">
          {wishlist && wishlist.length > 0 ? (
            <div className="">
              <div className="w-full">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <SingleWishlist key={index} data={i} removeFromwishlistHandler={removeFromwishlistHandler} addToCartHandler={addToCartHandler}/>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full justify-center items-center text-2xl text-black text-center flex">
              Nothing in the wishlist...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SingleWishlist = ({ data,removeFromwishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);

  return (
    <div className= "mt-2 border-b-2 border-l-2 border-r-2  border-t-2 p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" size={30} onClick={()=>{removeFromwishlistHandler(data)}} />
        <img
          src={data.images[0]}
          alt="image"
          className="w-[25px] h-[25px] md:w-[70px] md:h-[60px] ml-2 md:ml-5"
          onError={(err) => {
            err.target.onerror = null;
            err.target.src = oppo;
          }}
        />

        <div className="pl-[5px] w-full items-center justify-center flex-col">
          <h1 className="font-[600px] text-[27px] w-full justify-center flex items-center font-sans">{data.name}</h1>
          <h1 className="font-[600px] text-[27px] w-full justify-center flex items-center text-red-600 font-sans">({data.discountPrice}$)</h1>
        </div>

        <BsCartPlus
          size={30}
          onClick={()=>addToCartHandler(data)}
          className="cursor-pointer "
          title="Add to wishlist"
        />
      </div>
    </div>
  );
};
export default Wishlist;
