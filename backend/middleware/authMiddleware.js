import jwt from "jsonwebtoken";
import asyncHadler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHadler(async (req, res, next) => {
  let token;

  //read jwt token from cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized ,token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized ,token not found");
  }
});

//admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
};

export { protect, admin };
