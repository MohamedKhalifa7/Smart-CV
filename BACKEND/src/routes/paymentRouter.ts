import { Router } from "express";
import { validateLoginInput } from "../middleware/validationMiddleware";
import { paymentController } from "../controllers/paymentController";

const router = Router()

router.post("/create-checkout-session",validateLoginInput,paymentController)

export default router;