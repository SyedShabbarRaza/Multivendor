import React from "react";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

function Navbar({ active }) {
  return (
    <div className="flex md:flex-row flex-col items-center">
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={i.title}>
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "md:text-[#fff]"
              } font-[700] md:font-[500] px-6 cursor-pointer p-4 `}
            >{i.title}</Link>
            
          </div>
        ))}
    </div>
  );
}

export default Navbar;
