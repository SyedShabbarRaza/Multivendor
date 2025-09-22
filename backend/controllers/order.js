import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import {isLoggedIn, isSeller, isAdmin} from "../middleware/isLoggedIn.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import order_model from "../models/order_model.js";
import product_model from "../models/product_model.js";
import shop_model from "../models/shop_model.js";
const router = express.Router();
// create new order
router.post(
  "/createOrder",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      //       shopItemsMap = {
//    "shop1": [item1, item2],
//    "shop2": [item3, item4],
//    "shop3": [item5]
// }
    
// create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {//Fetching a shop through shopId and all it's items through items =>Make in dataBase and Repeat
        const order = await order_model.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/getAllOrders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await order_model.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/getSellerAllOrders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await order_model.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/updateOrderStatus/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await order_model.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        for (const o of order.cart) {
    await updateOrder(o._id, o.qty);
  }
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        // const serviceCharge = order.totalPrice * .10;
        // await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });
      
      async function updateOrder(id, qty) {
        const product = await product_model.findById(id);
        console.log(product)
        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }
      
      res.status(200).json({
        success: true,
        order,
      });
      // async function updateSellerInfo(amount) {
      //   const seller = await shop_model.findById(req.seller.id);
        
      //   seller.availableBalance = amount;

      //   await seller.save();
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/orderRefund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await order_model.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/orderRefundSuccess/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await order_model.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

       if (req.body.status === "Refund Success") {
        for (const o of order.cart) {
    await updateOrder(o._id, o.qty);
  }
      }

      async function updateOrder(id, qty) {
        const product = await product_model.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/adminAllOrders",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await order_model.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;