import { Router } from "express";
import { validateLoginInput } from "../middleware/validationMiddleware";
import { capturePaypalOrder, createPaypalOrder, paymentController } from "../controllers/paymentController";
import { upgradeToPro } from "../controllers/authController";
import { authenticateToken } from "../middleware/validateJWTMiddleware";

const router = Router()

router.post("/create-checkout-session",authenticateToken,paymentController)
router.post("/payment-success",authenticateToken,upgradeToPro);
router.post("/create-order", createPaypalOrder);
router.post("/capture-order", capturePaypalOrder);


export default router;