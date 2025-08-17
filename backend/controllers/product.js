// const { isSeller } = require("../middleware/auth");
// const fs = require("fs");
import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import upload from "../multer.js";
import shop_model from "../models/shop_model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import product_model from "../models/product_model.js";
import { isSeller } from "../middleware/isLoggedIn.js";
import fs from 'fs';

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
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

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

// // get all products
// router.get(
//   "/get-all-products",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
    //       const products = await Product.find();
    
    //       res.status(201).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
    //       return next(new ErrorHandler(error, 400));
    //     }
//   })
// );

export default router;