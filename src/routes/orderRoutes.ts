import express from "express";
import upload from "../middleware/upload";
import { handleOrder } from "../controllers/orderController"

const router = express.Router();

router.post("/api/orders", upload.single("file"), handleOrder);

export default router;
