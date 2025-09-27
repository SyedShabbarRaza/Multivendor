import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import shop from "../../../assets/pngegg.png";

function DashboardHeader() {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[60px] bg-white shadow sticky top-0 left-0 z-25 flex items-center justify-between px-4">
      <div className="w-[50px] md:w-[90px] flex items-center">
        <Link to="/">
          <img src={shop} alt="" className="w-12" />
        </Link>
        <div className="w-1 flex">
          <h1 className="font-bold text-md mr-1">Raza</h1>
          <h1 className="font-bold text-md">Mart</h1>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="md:block hidden">
            <AiOutlineGift
              color="#555"
              size={25}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={25}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#555"
              size={25}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="md:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={25}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={seller.avatar["url"]}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
