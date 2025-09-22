import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
// import upload from "../multer.js";
// import shop_model from "../models/shop_model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
// import product_model from "../models/product_model.js";
import { isSeller } from "../middleware/isLoggedIn.js";
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

    // delete product of a shop
    router.delete(
          "/delete-shop-coupoun/:id",
          isSeller,
          catchAsyncErrors(async (req, res, next) => {
                try {
                    console.log(res)
      const coupounId = req.params.id;

      const eventData = await coupounCode_model.findById(coupounId);

    //   eventData.images.forEach((imageUrl) => {
    //         const filename = imageUrl;
    //         const filePath = `backend/public/images/${filename}`;
    
    //         fs.unlink(filePath, (err) => {
    //       if (err) {
    //             console.log(err);
    //           }
    //         });
    //       });
    
          const coupoun = await coupounCode_model.findByIdAndDelete(coupounId);
    
          if (!coupoun) {
                return next(new ErrorHandler("coupoun not found with this id!", 500));
      }

      res.status(201).json({
            success: true,
        message: "coupoun Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/getCouponValue/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await coupounCode_model.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

export default router;