

import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendMail from "../utils/sendMail.js";
import { isLoggedIn, isSeller,isAdmin } from "../middleware/isLoggedIn.js";
import withdraw_model from "../models/withdraw.js";
import shop_model from "../models/shop_model.js";
const router = express.Router();

// create withdraw request --- only for seller
router.post(
  "/createWithdrawRequest",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

    //   try {
    //     await sendMail({
    //       email: req.seller.email,
    //       subject: "Withdraw Request",
    //       message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
    //     });
    //     res.status(201).json({
    //       success: true,
    //     });
    //   } catch (error) {
    //     console.log("error:",error)
    //     return next(new ErrorHandler(error.message, 500));
    //   }

      const withdraw = await withdraw_model.create(data);

      const shop = await shop_model.findById(req.seller._id);
      console.log(shop.availableBalance);
    //   console.log(shop);
      shop.availableBalance = shop.availableBalance - amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraws --- admnin

router.get(
  "/getAllWithdrawRequest",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await withdraw_model.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request ---- admin
router.put(
  "/updateWithdrawRequest/:id",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await withdraw_model.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await shop_model.findById(sellerId);

      const transection = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transections = [...seller.transections, transection];

      await seller.save();

    //   try {
    //     await sendMail({
    //       email: seller.email,
    //       subject: "Payment confirmation",
    //       message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
    //     });
    //   } catch (error) {
    //     return next(new ErrorHandler(error.message, 500));
    //   }
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router