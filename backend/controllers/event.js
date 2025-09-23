// const { isSeller } = require("../middleware/auth");
// const fs = require("fs");
import cloudinary from 'cloudinary'
import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import upload from "../multer.js";
import shop_model from "../models/shop_model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
// import product_model from "../models/product_model.js";
import { isAdmin, isLoggedIn, isSeller } from "../middleware/isLoggedIn.js";
import event_model from "../models/event_model.js";
import fs from 'fs';

const router = express.Router();
// create product
router.post(
  "/create-event",
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

                 // Upload images to Cloudinary
              const files = req.files; // multer files
              const uploadedImages = await Promise.all(
                files.map((file) =>
                  cloudinary.v2.uploader.upload(file.path, {
                    folder: "events",
                  })
                )
              );

              // Build product data
      const eventData = {
        ...req.body,
        shop,
        images: uploadedImages.map((img) => ({
          public_id: img.public_id,
          url: img.secure_url,
        })),
      };

        // const eventData = req.body;
        // eventData.images = imageUrls;
        // eventData.shop = shop;

        const events = await event_model.create(eventData);

        res.status(201).json({
          success: true,
          events,
        });
    }
} catch (error) {
    return next(new ErrorHandler(error, 400));
}
})
);


// get all events of a shop
router.get(
      "/get-all-events-shop/:id",
      catchAsyncErrors(async (req, res, next) => {
    try {
          const events = await event_model.find({ shopId: req.params.id });
    
          res.status(201).json({
                success: true,
        events,
      });
    } catch (error) {
          return next(new ErrorHandler(error, 400));
        }
      })
    );

    
    // delete product of a shop
    router.delete(
          "/delete-shop-coupoun/:id",
          isSeller,
          catchAsyncErrors(async (req, res, next) => {
                try {
      const eventId = req.params.id;

      const eventData = await event_model.findById(eventId);

      eventData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `backend/public/images/${filename}`;
    
            fs.unlink(filePath, (err) => {
          if (err) {
                console.log(err);
              }
            });
          });
    
          const event = await event_model.findByIdAndDelete(eventId);
    
          if (!event) {
                return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
            success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
          const allEvents = await event_model.find();
    
          res.status(201).json({
        success: true,
        allEvents,
      });
    } catch (error) {
          return next(new ErrorHandler(error, 400));
        }
  })
);

// all events --- for admin
router.get(
  "/adminAllEvents",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await event_model.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


export default router;