const express = require("express");

const router = express.Router();

//controller in USER
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

//controller in PROFILE
const {
  addProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controller/profile");

//controller in PRODUCT
const {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
  getUserProduct,
} = require("../controller/product");

//controller in TRANSACTION
const {
  getTransactions,
  addTransaction,
} = require("../controller/transactions");

//controller in AUTH
const { register, login } = require("../controller/auth");

//Middleware Auth
const { auth } = require("../middlewares/auth");

//Middleware Auth
const { uploadFile } = require("../middlewares/uploadFile");

//Middleware
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

router.post("/user", auth, addUser);
router.get("/users", getUsers);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", auth, deleteUser);

router.post("/product", auth, uploadFile("image_product"), addProduct);
router.get("/products", getProducts);
router.get("/product/:id/:product_name", getProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/user-products", getUserProduct);

router.post("/register", register);
router.get("/login", login);

router.post("/transaction", addTransaction);
router.get("/transactions", getTransactions);

router.post("/category", addCategory);
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

router.post("/profile", uploadFile("image_profile"), addProfile);

module.exports = router;
