import cloudinary from "cloudinary";
import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import upload from "../multer.js";
import shop_model from "../models/shop_model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import path from "path";
import fs from "fs";
import sendShopToken from "../utils/shopToken.js";
import { isLoggedIn, isSeller, isAdmin } from "../middleware/isLoggedIn.js";
import user_model from "../models/user_model.js";
import frontend from "../utils/frontend.js";

const router = express.Router();

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    console.log("req.body", req.body);

    const { email } = req.body;
    const shopEmail = await shop_model.findOne({ email });

    if (shopEmail) {
      // const filename = req.file.filename;
      // const filePath = `backend/public/images/${filename}`;
      // fs.unlink(filePath, (err) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status.json({ message: "Error deleting file" });
      //   }
      // });
      return next(new ErrorHandler("User already exists", 400));
    }

    //It's a new User
    // const filename = req.file.filename;
    // const fileUrl = path.join(filename);

    const myCloud = await cloudinary.v2.uploader.upload_stream(
      { folder: "shopAvatars" },
      async (error, myCloud) => {
        if (error) return next(new ErrorHandler(error.message, 500));

        const newUser = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
        };


    // const fileUrl = `backend/public/images/${filename}`; //Will add / or for Mac \ to the path to local system
    // const fileUrl=path.join(filename)

    const activationToken = createActivationToken(newUser);
    const actionvationUrl = `${frontend}/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: newUser.email,
        subject: "Activate your shop",
        message: `Hello ${newUser.name}, please click on the link to activate your shop: ${actionvationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please chech your email:-${newUser.email} to activate your shop`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }

  });
      myCloud.end(req.file.buffer);
  } catch (err) {
    console.log("Main Catch Mein:", err);
    return next(new ErrorHandler(err.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

//activate the user who clicked on the mail link (Something is missing here like api/auth )
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await shop_model.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await shop_model.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.log("error::", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Login Shop
router.post(
  "/loginShop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await shop_model.findOne({ email }).select("+password");
      if (!user) return next(new ErrorHandler("User does not exists", 400));

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return next(new ErrorHandler("Please provide correct info.", 400));

      sendShopToken(user, 201, res);
    } catch (err) {
      return next(new ErrorHandler("Something went wrong.", 400));
    }
  })
);

//Loading the Shop
//after logIn loading the User
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await shop_model.findById(req.seller._id);
      //I this is Faltu
      if (!seller) return next(new ErrorHandler("Shop doesn't exists.", 400));

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (err) {
      return next(new ErrorHandler("Please provide correct info.", 400));
    }
  })
);

router.get(
  "/logout",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await shop_model.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/shopUpdateAvatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await shop_model.findById(req.seller.id);

      if (existsUser.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(existsUser.avatar.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload_stream(
        { folder: "shopAvatars" },
        async (error, myCloud) => {
          if (error) return next(new ErrorHandler(error.message, 500));
console.log("dffhadsaf")
          const user = await shop_model.findByIdAndUpdate(
            req.seller.id,
            {
              avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              },
            },
            { new: true }
          );
          res.status(201).json({
            success: true,
            message:"Image uploaded successfully",
          });
        }
      );
      myCloud.end(req.file.buffer);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/updateSellerInfo",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await shop_model.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/adminAllSellers",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await shop_model.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // delete seller ---admin
router.delete(
  "/deleteSeller/:id",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await shop_model.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await shop_model.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/updatePaymentMethods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await shop_model.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/deleteWithdrawMethod/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await shop_model.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
