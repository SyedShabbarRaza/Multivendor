import React, { useState } from "react";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowRoundForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";
import oppo from '../../assets/oppo.jpeg'
import shop from '../../assets/pngegg.png'
function Header({ activeHeading }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const {allProducts}=useSelector((state)=>state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
  setSearchTerm(term);

  if (term.trim() === "") {
    setSearchData([]); // clear results when input is empty
    return;
  }

  const filteredProducts =
    allProducts &&
    allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

  setSearchData(filteredProducts);
  };
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="w-full mx-auto bg-gray-100">
        <div className="hidden mx-2 md:flex md:h-[50px] md:my-[10px] items-center justify-between bg-gray-100">
          <div className="w-[50px] md:w-[90px] flex items-center">
            <Link to="/">
              <img
                src={shop}
                alt=""
                className="w-12"
              />
            </Link>
<div className="w-1 flex"><h1 className="font-bold text-md mr-1">Raza</h1>
<h1 className="font-bold text-md">Mart</h1>
</div>
          </div>

          <div className=" w-[35%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-green-600 border-[2px] rounded-lg"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length > 0 ? (
              <div className="absolute bg-gray-300 rounded-2xl shadow-sm-2 z-[9] p-3 w-full">
                {searchData &&
                  searchData.map((i, index) => {
                    // const d = i.name;
                    // const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={`${i.images[0]["url"]}`}
                            alt=""
                            onError={(e)=>{
                              e.target.onerror=null;
                              e.target.src=oppo
                            }}
                            className="w-[40px] h-[40px] mr-[10px] rounded-lg"
                          />
                          <h1 className="text-center items-center text-2xl font-bold">{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="w-40 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer 
  bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold shadow-lg hover:opacity-90 transition">
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                {isSeller?"Go to Dashboard":"Become Seller"} <IoIosArrowRoundForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
        <div
          className={`${
            active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } hidden transition md:flex items-center justify-between w-full bg-green-600 h-[70px]`}
        >
          <div
            className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
          >
            <div className="" onClick={() => setDropDown(!dropDown)}>
              <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`cursor-pointer h-[100%] w-full flex justify-center items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                >
                  {" "}
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                />
                {dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>
            {/* NavItems */}
            <div className="flex items-center">
              <Navbar active={activeHeading} />
            </div>

            <div className="flex">
              <div className="flex items-center">
                <div onClick={() => setOpenWishlist(true)} className="relative cursor-pointer mr-[15px]">
                  <AiOutlineHeart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <div onClick={() => setOpenCart(true)} className="relative cursor-pointer mr-[15px]">
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart&&cart.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      {/* <img src={`${server}/${user.avatar}`} className="w-[35px] h-[35px] rounded-full" alt="profilepic" /> */}
                      <img
                        src={user&&user.avatar.url}
                        className="w-[40px] h-[40px] rounded-full"
                        alt="profilepic"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )}
                </div>
              </div>
              {openCart ? <ShoppingCart setOpenCart={setOpenCart} data={cart}/> : null}
              {openWishlist ? (
                <Wishlist setOpenWishlist={setOpenWishlist} />
              ) : null}
            </div>
          </div>
        </div>

        <div className="md:hidden shadow-2xl p-2 mx-2 flex items-center justify-between">
          <div
            className="cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <BiMenuAltLeft size={30} className="" />
          </div>

          <div className="flex items-center justify-center">
            <Link to="/">
              <img
                src={shop}
                alt=""
                className="w-12"
              />
            </Link>
            <div className="w-1 flex"><h1 className="font-bold text-md mr-1">Raza</h1>
<h1 className="font-bold text-md">Mart</h1>
</div>
          </div>

          <div className="flex items-center">
            <div className="relative cursor-pointer mr-[15px]">
              <AiOutlineShoppingCart
                size={30}
                onClick={() => setOpenCart(true)}
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart&&cart.length}
              </span>
            </div>
          </div>
        </div>
      </div>




{/* Mobile Screen */}
      {open && (
        <div className="bg-[#0000005f] h-full w-full fixed z-10 top-0">
          <div className="w-[40%] bg-gray-100 h-full overflow-y-scroll">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineHeart
                    size={30}
                    onClick={() => setOpenWishlist(true)}
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    0
                  </span>
                </div>
              </div>

              <div className="sticky top-0 z-50 flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </div>
            </div>

            <div className="p-2 flex items-center justify-center">
              <div className=" w-full relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-green-50 shadow-sm-2 z-[9] p-3">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;
                        const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${Product_name}`} key={index}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={`${i.images[0]}`}
                                alt=""
                                onError={(e)=>{
                                  e.target.onerror=null;
                                  e.target.src=oppo;
                                }}
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
            </div>

          <Navbar active={activeHeading} />
            <div className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer ml-[12%]`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center justify-center">
                {isSeller?"Go to Dashboard":"Become Selledddr"}
                 <IoIosArrowRoundForward className="ml-1" />
              </h1>
            </Link>
          </div>

          <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      {/* <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      /> */}

                      <img
                src={
                  user&&user.avatar.url
                }
                className="w-[100px] h-[100px] rounded-full object-cover border-[3px] border-green-300"
                alt="profilepic"
              />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>


          </div>
        </div>
      )}
    </>
  );
}

export default Header;
