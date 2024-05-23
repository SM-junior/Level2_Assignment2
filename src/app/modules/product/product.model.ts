import { model, Schema } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantsSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, "type must be required"],
    maxLength: [20, "type can not be more than 20 characters"],
  },
  value: {
    type: String,
    required: [true, "value must be required"],
    maxLength: [20, "type can not be more than 20 characters"],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "quantity must be required"],
    maxLength: [2, "type can not be more than 20 characters"],
  },
  inStock: {
    type: Boolean,
    required: true
  },
});

// product schema
const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantsSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});

export const Product = model<TProduct>("Product", ProductSchema);
