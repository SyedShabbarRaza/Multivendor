import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";
import dotenv from 'dotenv'
import db from "./db/mongo-connection.js"

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
        path: "backend/config/.env"
    });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http//localhost:${process.env.PORT}`);
  // console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY?.slice(0, 10)); 

});


process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
});


//unhandeled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
