// const { isSeller } = require("../middleware/auth");
// const fs = require("fs");

import cloudinary from 'cloudinary';
import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import upload from "../multer.js";
import shop_model from "../models/shop_model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import product_model from "../models/product_model.js";
import { isAdmin, isLoggedIn, isSeller } from "../middleware/isLoggedIn.js";
import fs from "fs";
import order_model from "../models/order_model.js";

const router = express.Router();
// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await shop_model.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        // const files = req.files;
        // const imageUrls = files.map((file) => `${file.filename}`);
        // const productData = req.body;
        // productData.images = imageUrls;
        // productData.shop = shop;

         // Upload images to Cloudinary
      
         const uploadedImages=[];

            for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const myCloud = cloudinary.v2.uploader.upload_stream(
            {
              folder: "products",
            },
            (error, myCloud) => {
              if (error) reject(error);
              else resolve(myCloud);
            }
          );

          myCloud.end(file.buffer);
        });
      uploadedImages.push({
        public_id: result.public_id,
          url: result.secure_url
      })
      }
      // Build product data
      const productData = {
        ...req.body,
        shop,
        images: uploadedImages,
      };

        const products = await product_model.create(productData);

        res.status(201).json({
          success: true,
          products,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await product_model.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
      console.log("products of a shop", products);
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await product_model.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `backend/public/images/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await product_model.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allProducts = await product_model.find();

      res.status(201).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/createNewReview",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await product_model.findById(productId);
      //pehly product dhoond lein kis ka review krna hai
      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );
      //then us product mein yeh wala banda dhoond lein pehly to review nahi diya huwa?

      if (isReviewed) {
        //Aggar pehly sy review diya hai
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review); //Aggar pehly sy nahi diya review to new add kr do
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;
      // average=Sum/Total Number of ..
      await product.save({ validateBeforeSave: false });

      await order_model.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } }, //new key enter kr rahy hain =>isReviewed ki
        { arrayFilters: [{ "elem._id": productId }], new: true }
        // This tells MongoDB which element in the array to update.
        // Here, "elem._id": productId → update only the cart item whose _id equals productId.
        // new: true: Return the updated document instead of the old one.
//         {
//   _id: "order123",
//   cart: [
//     { _id: "p1", name: "Shirt", qty: 2 },
//     { _id: "p2", name: "Shoes", qty: 1 }
//   ]
// }
// If you run:

// js
// Copy code
// await order_model.findByIdAndUpdate(
//   "order123",
//   { $set: { "cart.$[elem].isReviewed": true } },
//   { arrayFilters: [{ "elem._id": "p2" }], new: true }
// );

);

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/adminAllProducts",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await product_model.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;  
