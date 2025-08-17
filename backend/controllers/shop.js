import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import upload from "../multer.js";
import shop_model from "../models/shop_model.js";
import sendToken from "../utils/sendToken.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import path from "path";
import fs from "fs";
import sendShopToken from "../utils/shopToken.js";
import { isLoggedIn, isSeller } from "../middleware/isLoggedIn.js";
// import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    console.log("req.body",req.body);

    const {email } = req.body;
    const shopEmail = await shop_model.findOne({ email });

    if (shopEmail) {
      const filename = req.file.filename;
      const filePath = `backend/public/images/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
         return res.status.json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    //It's a new User
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    // const fileUrl = `backend/public/images/${filename}`; //Will add / or for Mac \ to the path to local system
    // const fileUrl=path.join(filename)
    const newUser = {
      name:req.body.name,
      email:email,
      password:req.body.password,
      avatar: fileUrl,
            address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(newUser);
    const actionvationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
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
  } catch (err) {
    console.log("Main Catch Mein:",err)
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
      console.log("error::",error)
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
router.get("/getSeller",isSeller,catchAsyncErrors(async(req,res,next)=>{
    try{
        const seller=await shop_model.findById(req.seller._id);
        //I this is Faltu
        if(!seller) return next(new ErrorHandler("Shop doesn't exists.", 400));
        
        res.status(200).json({
            success:true,
            seller,
        })

    }catch(err){
        return next(new ErrorHandler("Please provide correct info.", 400));
    }
}))


router.get("/logout",isLoggedIn,catchAsyncErrors(async(req,res,next)=>{
  try{
    res.cookie("seller_token",null,{
      expires:new Date(Date.now()),
      httpOnly:true,
    });

    res.status(201).json({
      success:true,
      message:"Log out successful!"
    });
  }catch(error){
    return next(new ErrorHandler(error.message,500));
  }
}))


export default router;
