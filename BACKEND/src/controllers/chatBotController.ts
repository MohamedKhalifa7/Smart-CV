import { Request, Response } from "express";
import { generateChatResponse } from "../services/chatBotService";
import Chat from "../models/chatModel";
import { CustomRequest } from "../middleware/validateJWTMiddleware";

const chatBotController = async (req: Request, res: Response) => {
  const { message, chatId } = req.body;
  const customReq = req as CustomRequest;

  if (!customReq.user?.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!message) {
    res.status(400).json({ message: "Message is required" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ message: "ChatId is required" });
    return;
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404).json({ message: "Chat not found" });
    return;
  }

  if (chat.userId.toString() !== customReq.user.userId) {
    res.status(403).json({ message: "Not authorized to access this chat" });
    return;
  }

  const response = await generateChatResponse(message, chatId);

  chat.messages.push(
    { type: "user", content: message },
    { type: "bot", content: response }
  );

  await chat.save();

  res.status(200).json({ response });
};

const createChatController = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  if (!customReq.user?.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const newChat = new Chat({
    userId: customReq.user.userId,
    messages: [],
  });

  const savedChat = await newChat.save();
  res.status(201).json(savedChat);
};

const getChatHistoryController = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  if (!customReq.user?.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const chats = await Chat.find({ userId: customReq.user.userId }).sort({ createdAt: -1 });
  res.status(200).json(chats);
};

export { chatBotController, createChatController ,getChatHistoryController };
