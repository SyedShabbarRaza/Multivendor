import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import server from "../../server";
import styles from "../../styles/styles.js";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";
import { deleteUserAddress, updateUser, updatUserAddress } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { getAllOrdersOfUser } from "../../redux/actions/order.js";
function ProfileContent({ active }) {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");//""
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({
        type: "clearMessages",
      });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(email, name, password, phoneNumber));
  };

  const handleImage = async (e) => {
    // const reader = new FileReader();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/api/auth/updateAvatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        // dispatch(loadUser());
        window.location.reload();
        // toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });

    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAvatar(reader.result);
    // axios
    //   .put(
    //     `${server}/api/auth/updateAvatar`,
    //     { avatar: reader.result },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     dispatch(loadUser());
    //     toast.success("avatar updated successfully!");
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   });
    //   }
    // };

    // reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full mt-5">
            <div className="relative">
              {/* <img src={`${server}/${user.avatar}`} className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-green-300" alt="profilepic" /> */}
              <img
                src={
                  user&&user.avatar.url}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-green-300"
                alt="profilepic"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center absolute bottom-[0px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="w-[30px] h-[30px] rounded-full hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="w-full px-10 md:px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full flex flex-col md:flex-row pb-3">
                <div className="w-full md:w-[50%]">
                  <label className="block p-2">Full Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    required
                    className="w-full border p-1 rounded-[5px]"
                  />
                </div>
                <div className="w-full md:w-[50%] md:ml-2">
                  <label className="block p-2">Email Address</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    required
                    className="w-full border p-1 rounded-[5px]"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row pb-3">
                <div className="w-full md:w-[50%]">
                  <label className="block p-2">Phone Number</label>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    type="text"
                    required
                    className="w-full border p-1 rounded-[5px]"
                  />
                </div>
                <div className="w-full md:w-[50%] md:ml-2">
                  <label className="block p-2">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                    className="w-full border p-1 rounded-[5px]"
                  />
                </div>
              </div>
              <input
                type="submit"
                className="w-[250px] h-[40px] border border-blue-700 text-center text-blue-700 rounded-lg mt-8 cursor-pointer"
                required
                value="Update"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}

      {active === 3 && (
        <div className="">
          <RefundOrders />
        </div>
      )}

      {active === 5 && (
        <div className="">
          <TrackOrder />
        </div>
      )}

      {active === 6 && (
        <div className="">
          <ChangePassword />
        </div>
      )}

      {active === 7 && (
        <div className="">
          <AddressBook />
        </div>
      )}
    </div>
  );
}

const RefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund" || item.status === "Refund Success");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // Params will give details of cell like id etc
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-10">
      <DataGrid
        rows={row}
        columns={columns}
        checkboxSelection
        // pageSize={5}
        // autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const AllOrders = () => {
   const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // Params will give details of cell like id etc
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-10">
      <DataGrid
        rows={row}
        columns={columns}
        checkboxSelection
        // pageSize={5}
        // autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
     const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // Params will give details of cell like id etc
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-10">
      <DataGrid
        rows={row}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        // pageSize={5}
        // autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/api/auth/updateUserPassword`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const AddressBook = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user)
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];
const handleDelete=(item)=>{
  dispatch(deleteUserAddress(item._id));
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  return (
    <div className="px-5 mt-10">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[85%] md:w-[55%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your State</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your State
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    <div className="items-center flex justify-between">
        <h1 className="text-2xl font-bold pb-2">Address Book</h1>
        <div
          onClick={() => setOpen(true)}
          className="w-[150px] bg-black cursor-pointer h-[50px] my-3 flex items-center justify-center rounded-xl"
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />

      
      {
        user.addresses&&user.addresses.map((item,index)=>(

      <div key={index} className="bg-white h-[70px] mt-5 rounded-sm flex items-center justify-between pr-10 shadow-2xl shadow-green-200">
        <div className="flex items-center">
          <h5 className="font-bold ml-5">{item.addressType}</h5>
        </div>

        <div className="pl-8 flex items-center">
          <h5 className="pl-6">
          {item.address1} {item.address2}
          </h5>
        </div>

        <div className="pl-8 flex items-center">
          <h5 className="pl-6">{user.phoneNumber}</h5>
        </div>

        <div className="min-w-[10%] pl-8 items-center flex justify-between cursor-pointer">
          <AiOutlineDelete size={25} onClick={()=>handleDelete(item)}/>
        </div>
      </div>

        ))
      }
      
      {
        user&&user.addresses.length===0&&(
          <h5>There is no address here, try adding new address</h5>
        )
      }


    </div>
  );
};

export default ProfileContent;
