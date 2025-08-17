import React, { useState } from "react";
import { useSelector } from "react-redux";
import server from "../../server";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";
function ProfileContent({ active }) {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                }
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-green-300"
                alt="profilepic"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[0px] right-[5px]">
                <AiOutlineCamera />
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
                  <label className="block p-2">Zip Code</label>
                  <input
                    onChange={(e) => setZipCode(e.target.value)}
                    value={zipCode}
                    type="text"
                    required
                    className="w-full border p-1 rounded-[5px]"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row pb-3">
                <div className="w-full md:w-[50%]">
                  <label className="block p-2">Address1</label>
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    type="address"
                    required
                    className="w-full border p-1 rounded-[5px]"
                  />
                </div>
                <div className="w-full md:w-[50%] md:ml-2">
                  <label className="block p-2">Address2</label>
                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    type="address"
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
          <PaymentMethod />
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
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItem: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

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
        itemsQty: item.orderItem.length,
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
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItem: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

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
        itemsQty: item.orderItem.length,
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

const TrackOrder = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItem: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

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
        itemsQty: item.orderItem.length,
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

const PaymentMethod = () => {
  return (
    <div className="px-5 mt-10">
      <div className="items-center flex justify-between">
        <h1 className="text-2xl font-bold pb-2">Payment Methods</h1>
        <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />

      <div className="bg-white h-[70px] rounded-sm flex items-center justify-between pr-10 shadow-2xl shadow-green-200">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="font-bold ml-5">Sayyed Shabbar Raza</h5>
        </div>

        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2022</h5>
        </div>

        <div className="min-w-[10%] pl-8 items-center flex justify-between">
          <AiOutlineDelete size={25}/>
        </div>

      </div>
    </div>
  );
};


const AddressBook = () => {
  return (
    <div className="px-5 mt-10">
      <div className="items-center flex justify-between">
        <h1 className="text-2xl font-bold pb-2">Address Book</h1>
        <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />

      <div className="bg-white h-[70px] rounded-sm flex items-center justify-between pr-10 shadow-2xl shadow-green-200">
        <div className="flex items-center">
          <h5 className="font-bold ml-5">Default</h5>
        </div>

        <div className="pl-8 flex items-center">
          <h5 className="pl-6">House 1, Street#5 Taj Park Shalimar Town Lahore</h5>
        </div>

        <div className="pl-8 flex items-center">
          <h5 className="pl-6">03214509929</h5>
        </div>

        <div className="min-w-[10%] pl-8 items-center flex justify-between">
          <AiOutlineDelete size={25}/>
        </div>

      </div>
    </div>
  );
};


export default ProfileContent;
