"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantsSchema = new mongoose_1.Schema({
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
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "quantity must be required"],
        maxLength: [2, "type can not be more than 20 characters"],
    },
    inStock: {
        type: Boolean,
    },
});
// product schema
const ProductSchema = new mongoose_1.Schema({
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
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
