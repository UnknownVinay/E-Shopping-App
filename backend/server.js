import express from "express";
import coonectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddlerware.js";
dotenv.config();
const port = process.env.PORT || 5000;
coonectDB(); // connect to monoDB

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
