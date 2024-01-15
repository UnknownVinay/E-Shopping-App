import express from "express";
import coonectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 5000;
coonectDB(); // connect to monoDB

const app = express();

//body parser middlerware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middlerware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
