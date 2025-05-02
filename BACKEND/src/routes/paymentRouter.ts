import { Router } from "express";
import { validateLoginInput } from "../middleware/validationMiddleware";
import { paymentController } from "../controllers/paymentController";
import { upgradeToPro } from "../controllers/authController";
import { authenticateToken } from "../middleware/validateJWTMiddleware";

const router = Router()

router.post("/create-checkout-session",authenticateToken,paymentController)
router.post("/payment-success",authenticateToken,upgradeToPro);


export default router;