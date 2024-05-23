"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const product_model_1 = require("../product/product.model");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    try {
        const existProduct = yield product_model_1.Product.findById(productId);
        if (!existProduct) {
            return res.status(400).json({ message: "Order not found" });
        }
        if (existProduct.inventory.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient quantity available in inventory' });
        }
        existProduct.inventory.quantity -= quantity;
        if (existProduct.inventory.quantity === 0) {
            existProduct.inventory.inStock = false;
        }
        else {
            existProduct.inventory.inStock = true;
        }
        existProduct.save();
        const orderData = req.body;
        const result = yield order_services_1.OrderServices.createOrderToDb(orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not found",
            error: error,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_services_1.OrderServices.getAllOrderFromDb(email);
        const message = email ?
            `Orders fetched successfully for user ${email}!`
            : `Order fetched successfully!`;
        res.status(200).json({
            success: true,
            message: message,
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Item not found",
            error: error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
};
