import { Request, Response } from "express";
import { captureOrder, createOrder, proPayment } from "../services/paymentService";
import { upgradeToPro } from "./authController";

export const paymentController = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  const session = await proPayment(userId);
  res.json({ url: session.url });
};

export const createPaypalOrder = async(req:Request,res:Response)=>{

  try {
      const order = await createOrder()
      res.json({id:order.id})
  } catch (error) {
    res.status(500).json({error:"failed to create paypal order"})
  }

}

export const capturePaypalOrder = async (req:Request,res:Response)=>{

  try {
    const {orderId,userId}= req.body
    const captureResult = await captureOrder(orderId)
    if(captureResult.status==="COMPLETED"){
      await upgradeToPro({body:{userId}} as Request,res)
    }
    else{
      res.status(400).json({message:"payment not completed"})
    }
  } catch (error) {
    res.status(500).json({error:"failed to create paypal order"})

  }

}
