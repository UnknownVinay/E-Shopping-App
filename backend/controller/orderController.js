import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @dec create new order
// @route Post /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No orders items found");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();

    res.status(200).json(createOrder);
  }
});

// @dec get logged in user orders
// @route Get /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @dec get order by id
// @route Get /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "name",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @dec update order to paid
// @route Put /api/orders/:id/pay
// @access Private
const updateOrederToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// @dec update order to delivered
// @route put /api/orders/:id/deliver
// @access Admin
const updateOrederToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @dec get all orders
// @route Get /api/orders
// @access Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrederToPaid,
  updateOrederToDelivered,
  getOrders,
};
