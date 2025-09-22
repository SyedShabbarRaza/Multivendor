import message_model from '../models/messages.js'
import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { isSeller } from "../middleware/isLoggedIn.js";
import upload from '../multer.js';

const router = express.Router();

// create new message
router.post(
  "/createNewMessage",upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;

    //   if (req.body.images) {
    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
    //       folder: "messages",
    //     });
    //     messageData.images = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.url,
    //     };
    //   }

if(req.body.images){

    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    messageData.images=imageUrls;
}

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new message_model({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// get all messages with conversation id
router.get(
  "/getAllMessages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await message_model.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);
export default router