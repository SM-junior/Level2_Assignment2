import { ProductServices } from "./product.service";
import { Request, Response } from "express";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData)
    const result = await ProductServices.createProductIntoDb(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDb(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDb(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Item not found",
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getAllProductsFromDb(searchTerm);
    const message = searchTerm ?
      `Products matching search term ${searchTerm} fetched successfully!`
      : `Products fetched successfully!`;
    res.status(200).json({
      success: true,
      message: message,
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Item not found",
      error: error
    });
  }
}

export const ProductController = {
  createProduct,
  getSingleProduct,
  deleteProduct,
  getAllProducts,

}
