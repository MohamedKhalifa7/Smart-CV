import { Router } from "express";
import {
  chatBotController,
  createChatController,
  getChatHistoryController,
} from "../controllers/chatBotController";
import { authenticateToken } from "../middleware/validateJWTMiddleware";
import { requireProUser } from "../middleware/roleMiddleware";

const router = Router();

router.post("/", authenticateToken, requireProUser,chatBotController);
router.post("/create", authenticateToken,requireProUser, createChatController);
router.get("/history", authenticateToken, requireProUser,getChatHistoryController);

export default router;
