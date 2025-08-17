import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../models/user_model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/sendToken.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const router = express.Router();

router.post("/createUser", upload.single("file"), async (req, res, next) => {
  //Starting Slash is very important for routes
  try {
    console.log("createUser");
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const filename = req.file.filename;
      const filePath = `backend/public/images/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status.json({ message: "Error deleting file" });
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
      name,
      email,
      password,
      avatar: fileUrl,
    };

    //Sending OTP Mail
    const activationToken = createActivationToken(newUser);
    const actionvationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: newUser.email,
        subject: "Activate your account",
        message: `Hello ${newUser.name}, please click on the link to activate your account: ${actionvationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please chech your email:-${newUser.email} to activate your account`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (err) {
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
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      console.log("activation mein");
      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      const user = await User.findOne({ email });
      if (user) return next(new ErrorHandler("User already exists", 400));

      const createdUser = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(newUser, 201, res);
      res.status(201).json({
        success: true,
        createdUser,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  })
);

router.post(
  "/loginUser",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) return next(new ErrorHandler("User does not exists", 400));

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return next(new ErrorHandler("Please provide correct info.", 400));
    
    sendToken(user, 201, res);
} catch (err) {
    return next(new ErrorHandler("Something went wrong.", 400));
}
  })
);

//after logIn loading the User 
router.get("/getUser",isLoggedIn,catchAsyncErrors(async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        //I this is Faltu
        if(!user) return next(new ErrorHandler("User doesn't exists.", 400));
        
        res.status(200).json({
            success:true,
            user,
        })

    }catch(err){
        return next(new ErrorHandler("Please provide correct info.", 400));
    }
}))

router.get("/logout",isLoggedIn,catchAsyncErrors(async(req,res,next)=>{
  try{
    res.cookie("token",null,{
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
