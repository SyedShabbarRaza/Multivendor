import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
// import upload from "../multer.js";
// import shop_model from "../models/shop_model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
// import product_model from "../models/product_model.js";
import { isSeller } from "../middleware/isLoggedIn.js";
// import event_model from "../models/event_model.js";
// import fs from 'fs';
import coupounCode_model from "../models/coupounCode_model.js";

const router = express.Router();

// create coupoun code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await coupounCode_model.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exists!", 400));
      }

      const coupounCode = await coupounCode_model.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// get all events of a shop
router.get(
      "/get-all-coupouns-shop/:id",
      catchAsyncErrors(async (req, res, next) => {
    try {
          const coupouns = await coupounCode_model.find({ shopId: req.params.id });
    
          res.status(201).json({
                success: true,
        coupouns,
      });
    } catch (error) {
          return next(new ErrorHandler(error, 400));
        }
      })
    );

export default router;