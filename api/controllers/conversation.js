import conversation_model from '../models/conversation.js'
import express from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { isLoggedIn, isSeller } from "../middleware/isLoggedIn.js";

const router = express.Router();

// create a new conversation
router.post(
  "/createNewConversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExist = await conversation_model.findOne({ groupTitle });

      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await conversation_model.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  })
);

// get seller conversations
router.get(
  "/getAllConversationSeller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await conversation_model.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);


// get user conversations
router.get(
  "/getAllConversationUser/:id",
  isLoggedIn,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await conversation_model.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);

// update the last message
router.put(
  "/updateLastMessage/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await conversation_model.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);

export default router