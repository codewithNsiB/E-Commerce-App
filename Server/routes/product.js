import express from "express";

import {
  sendProductsToDB,
  getProductByCondition,
  getAllProducts,
  getProductCategory,
  getOneProduct,
  searchProducts,
  likeProduct,
  dislikeProduct,
  getIsFeaturedProducts,
  getSavedProducts,
  deleteProduct,
  createNewProduct,
} from "../controllers/product.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//post request
router.post("/sendproducts", sendProductsToDB);

//get request
router.get("/condition", getProductByCondition);
router.get("/allproducts", getAllProducts);
router.get("/:categoryName", getProductCategory);
router.get("/title/:slugTitle", getOneProduct);
router.get("/search/product", searchProducts);
router.get("/featured/product", getIsFeaturedProducts);
router.get("/usersaved/:username", verifyToken, getSavedProducts);

//put request
router.put("/:productId/like", verifyToken, likeProduct);
router.put("/:productId/dislike", verifyToken, dislikeProduct);

//delete

router.delete("/delete/:id", verifyToken, deleteProduct);

//create
router.post("/create", verifyToken, createNewProduct);

export default router;
