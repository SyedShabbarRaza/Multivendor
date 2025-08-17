import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from "@mui/x-data-grid";
import { deleteEvent, getAllEventsShop } from '../../redux/actions/event';

function AllEvents() {
   const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  console.log("products::",events);
  console.log("seller::",seller);
  const dispatch = useDispatch();

  const handleDelete=(id)=>{
    dispatch(deleteEvent(id))
    window.location.reload() // Delete hony ky baad bhi show hoti rhy gi aggar refresh na kiya to...
  }

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d=params.row.name;
        const productName=d.replace(/\s+/g,"-");
        return (
          <>
            <Link to={`/product/${productName}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}> 
              {/* params are not from url it's from row parameter */}
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

    const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            // pageSize={10}
            autoHeight
            disableSelectionOnClick
          />
        </div>
      )}
    </>
  );
}

export default AllEvents