const schemaValidator = require("../utils/products.validators");
const services = require("../services/product.services");

// const upload = multer({dest: "../uploads/images/"});

exports.productCheckout = async (req, res) => {
  return res
    .status(200)
    .json({ status: true, message: "This is product checkout request" });
};

exports.addProducts = async (req, res) => {
  try {
    const { error } = schemaValidator.productSchema.validate(req.body, () => {
      abortEarly: false;
    });
    if (error) {
      return res.status(200).json({ message: error.message, success: false });
    }

    const productAdded = await services.addProducts(req.body);
    if (productAdded) {
      return res
        .status(200)
        .json({ message: "Product added successfully!", success: true });
    } else {
      return res
        .status(200)
        .json({
          message:
            "Unable to add product please enter the valid product details!",
          success: false,
        });
    }
  } catch (error) {
    console.log("Error inside product add controller -->", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const productData = await services.getProducts(req);
    if (productData) {
      res
        .status(200)
        .json({
          productData: productData?.productData,
          pagination: productData?.Pagination,
          success: true,
        });
    } else {
      res.status(200).json({ message: "No products found!", success: false });
    }
  } catch (error) {
    console.log("Error in get product controller -->", error);
    res.status(400).json({ message: "Something went wrong!", success: false });
  }
};
