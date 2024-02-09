import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @dec Fetch All Products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @dec Fetch Product by Id
// @route Get /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @dec Create Products
// @route Post /api/products
// @access private/admin
const createProducts = asyncHandler(async (req, res) => {
  const products = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createProducts = await products.save();

  res.status(200).json(createProducts);
});

// @dec Edit product by id
// @route PUT /api/products/:id
// @access Private/Admin
const editProductById = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @dec Delete Product by Id
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProducts,
  editProductById,
  deleteProductById,
};
