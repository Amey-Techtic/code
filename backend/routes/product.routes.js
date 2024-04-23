const express = require("express");
const controller = require ("../controllers/product.controller");
const auth = require("../middlewares/auth");
const router = new express.Router();

router.get("/get-products", controller.getProducts);

router.post("/add-product",  controller.addProducts);
router.use(auth);

router.get("/checkout", controller.productCheckout);

module.exports = router;