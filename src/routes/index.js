const express = require("express");

const router = express.Router();

//controller in USER
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
} = require("../controller/user");

//controller in PRODUCT
const {
  getProduct,
  getUserProduct,
  addProduct,
} = require("../controller/product");

//controller in AUTH
const { register, login } = require("../controller/auth");

//Middleware
const { auth } = require("../middlewares/auth");

router.post("/user", auth, addUser);
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

router.get("/products", auth, getProduct);
router.get("/user-products", getUserProduct);
router.post("/product", addProduct);

router.get("/profile", getProfile);

router.post("/register", register);
router.get("/login", login);

module.exports = router;
