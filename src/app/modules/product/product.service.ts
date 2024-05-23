import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDb = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getSingleProductFromDb = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const deleteProductFromDb = async (id: string) => {
  const result = await Product.findOneAndDelete({ _id: id }, { new: true });
  return result;
};

const getAllProductsFromDb = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    })
    return result
  }
  else {
    const result = await Product.find()
    return result
  }
}


export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  deleteProductFromDb,

};
