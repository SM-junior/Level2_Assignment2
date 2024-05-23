import express from "express";
import { ProductController } from "./product.controller";
import { Product } from "./product.model";
const router = express.Router();

// product
router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:productId", ProductController.getSingleProduct);
router.delete("/:productId", ProductController.deleteProduct);

router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
});

export const ProductRoutes = router;
