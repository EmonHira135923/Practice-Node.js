import express from "express";
import {
  paymentIntregationController,
  paymentSuccessController,
} from "../controllers/payment.intregation.controller.js";

const router = express.Router();

router.post("/create-checkout-session", paymentIntregationController);
router.get("/payment-success", paymentSuccessController);

export default router;
