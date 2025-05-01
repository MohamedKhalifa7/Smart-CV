import { Request, Response } from "express";
import { proPayment } from "../services/paymentService";

export const paymentController = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  const session = await proPayment(userId);
  res.json({ url: session.url });
};
