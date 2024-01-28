import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrederToPaid,
  updateOrederToDelivered,
  getOrders,
} from "../controller/orderController.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrederToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrederToDelivered);

export default router;
