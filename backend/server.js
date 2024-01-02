import express from "express";
import products from "./data/products.js";
import coonectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/productRouter.js";
dotenv.config();
const port = process.env.PORT || 5000;
coonectDB(); // connect to monoDB

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/api/products", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
