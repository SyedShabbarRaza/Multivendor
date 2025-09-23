import express from "express";
import Stripe from "stripe";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
        path: "config/.env"
    });
}
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "Becodemy",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
catchAsyncErrors (async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);


export default router;