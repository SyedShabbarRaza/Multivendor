import cloudinary from 'cloudinary';
import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../models/user_model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import {sendToken} from "../utils/sendToken.js";
import { isLoggedIn,isAdmin } from "../middleware/isLoggedIn.js";
import user_model from "../models/user_model.js";

const router = express.Router();

router.post("/createUser", upload.single("file"), async (req, res, next) => {
  //Starting Slash is very important for routes
  try {
    console.log("createUser");
    const { name, email, password} = req.body;
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

        
        // const filename = req.file.filename;
        // const filePath = `backend/public/images/${filename}`;
        const filePath = req.file.path;

        const myCloud = await cloudinary.v2.uploader.upload(filePath, {
      folder: "avatars",
    });

    //It's a new User
    // const filename = req.file.filename;
    // const fileUrl = path.join(filename);

    // const fileUrl = `backend/public/images/${filename}`; //Will add / or for Mac \ to the path to local system
    // const fileUrl=path.join(filename)
    const newUser = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    //Sending OTP Mail
    const activationToken = createActivationToken(newUser);
    const actionvationUrl = `https://multivendor-a326.vercel.app/activation/${activationToken}`;
    try {
      await sendMail({
        email: newUser.email,
        subject: "Activate your account",
        message: `Hello ${newUser.name}, please click on the link to activate your account: ${actionvationUrl}`,
      });

      console.log("email bhej diya")
      
      res.status(201).json({
        success: true,
        message: `please chech your email:-${newUser.email} to activate your account`,
      });
    } catch (err) {
      console.log("email ka masla")
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
router.get(
  "/getUser",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      //I this is Faltu
      if (!user) return next(new ErrorHandler("User doesn't exists.", 400));

      res.status(200).json({
        success: true,
        user,
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
      res.cookie("token", null, {
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

router.put(
  "/updateUser",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, phoneNumber } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Password is not correct...", 400));
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/updateAvatar",
  isLoggedIn,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      const existAvatarPath = `backend/public/images/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.delete(
  "/deleteUserAddress/:id",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await user_model.updateOne(
        { _id: req.user._id },
        { $pull: { addresses: { _id: req.params.id } } }
      );

      const user = await user_model.findById(req.user._id);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/updateUserAddresses",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("aaya");
      const user = await user_model.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/updateUserPassword",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await user_model.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save(); //This will save the password automatically by hasing it

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user infoormation with the userId
router.get(
  "/userInfo/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await user_model.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get(
  "/adminAllUsers",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/deleteUser/:id",
  isLoggedIn,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await user_model.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      const imageId = user.avatar.public_id;

      // await cloudinary.v2.uploader.destroy(imageId);

      await user_model.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
