import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProducts,
  editProductById,
  deleteProductById,
  createProductReview,
  getTopRatedProduct,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProducts);

router.route("/top").get(getTopRatedProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, editProductById)
  .delete(protect, admin, deleteProductById);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
