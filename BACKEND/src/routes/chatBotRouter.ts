import { Router } from "express";
import {
  chatBotController,
  createChatController,
  getChatHistoryController,
} from "../controllers/chatBotController";
import { authenticateToken } from "../middleware/validateJWTMiddleware";

const router = Router();

router.post("/", authenticateToken, chatBotController);
router.post("/create", authenticateToken, createChatController);
router.get("/history", authenticateToken, getChatHistoryController);

export default router;
