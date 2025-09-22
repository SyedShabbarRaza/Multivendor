import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import oppo from "../../assets/oppo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromcart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

function ShoppingCart({ setOpenCart, data }) {
  const { cart } = useSelector((state) => state.cart);
  console.log("cart::",cart)
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromcart(data));
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0 //initialValue
  );
  
//   cart = [
//   { qty: 2, discountPrice: 500 }, // iPhone
//   { qty: 1, discountPrice: 300 }, // Samsung
// ]
// Execution:

// Start with acc = 0.

// First item: acc = 0 + (2 * 500) = 1000.

// Second item: acc = 1000 + (1 * 300) = 1300.

// ✅ Final totalPrice = 1300.

                      // Alternative of 
// let totalPrice = 0;
// for (let i of cart) {
//   totalPrice += i.qty * i.discountPrice;
// }

const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };


  return (
    <div className="fixed left-0 top-0 h-screen bg-[#00000030] z-40 flex items-center justify-center w-full">
      <div className="w-[90%] md:w-[70%] h-[90%] overflow-y-scroll bg-white rounded-md shadow-lg p-4">
        <div className="sticky top-0 z-50 flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={() => {
              setOpenCart(false);
            }}
          />
        </div>

        <div className="flex items-center p-4">
          <IoBagHandleOutline size={25} className="" />
          <h5 className="pl-2 text-[20px] font-[500]">{cart.length} Items</h5>
        </div>
        {cart && cart.length > 0 ? (
          <div className="">
            <div className="w-full">
              {cart &&
                cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>

            <div className="px-5 mt-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full h-full justify-center items-center text-2xl text-black text-center flex">
            Nothing in the Cart...
          </div>
        )}
      </div>
    </div>
  );
}

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      return toast.error("Stock is limited...");
    }
    setValue(value + 1);
    const updateCartData = { ...data, qty: value + 1 };
    quantityChangeHandler(updateCartData);
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="bg-[#e44343] border border-[#e43473] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={oppo}
          alt="image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = oppo;
          }}
          className="w-[25px] h-[25px] md:w-[50px] md:h-[50px] ml-2 md:ml-5"
        />
        <div className="pl-[5px] md:pl-[10px] w-full">
          <h1 className="w-full">{data.name}</h1>
          <h4 className="font-[400px] text-[15px] text-[#00000082]">
            {data.discountPrice ? data.discountPrice : data.originalPrice}*
            {value}
          </h4>
          <h4 className="font-[600px] text-[17px] pt-[3px] text-[#d02222] font-sans">
            {(data.discountPrice ? data.discountPrice : data.originalPrice) *
              value}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};
export default ShoppingCart;
