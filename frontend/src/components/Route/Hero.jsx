import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    //80vh from mobile screen
    <div
      className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat flex items-center rounded-md`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="w-2xl mx-auto w-[90%] md:w-[60%]">
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#000000ba]">
          Welcome to our premium e-commerce platform, your one-stop destination for everything you need. <br/> 
  We bring you a seamless shopping experience with a wide variety of products ranging from fashion,<br/> 
  electronics, home essentials, beauty, lifestyle, and much more. Our goal is to make online shopping 
  simple, <br/>convenient, and enjoyable for everyone. <br />
        </p>
      <Link to="/products">
      <div className='mt-5 w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold shadow-lg hover:opacity-90 transition'>
        <span className="text-[#fff] font-[Poppins] text-[18px]">Shop Now</span>
      </div>
      </Link>
      </div>
    </div>
  );
}

export default Hero;
