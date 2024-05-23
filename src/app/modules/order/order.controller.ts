import { Request, Response } from "express";
import { Product, ProductSchema } from "../product/product.model";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;

    try {
        const existProduct = await Product.findById(productId)

        if (!existProduct) {
            return res.status(400).json({ message: "Order not found" })
        }
        if (existProduct.inventory.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient quantity available in inventory' });
        }

        existProduct.inventory.quantity -= quantity;
        if (existProduct.inventory.quantity === 0) {
            existProduct.inventory.inStock = false;
        } else {
            existProduct.inventory.inStock = true;
        }
        existProduct.save()

        // ProductSchema.pre('save', function (next) {
        //     if (existProduct.inventory.quantity === 0) {
        //         existProduct.inventory.inStock = false;
        //     } else {
        //         existProduct.inventory.inStock = true;
        //     }
        //     next();
        // });

        const orderData = req.body
        const result = await OrderServices.createOrderToDb(orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not found",
            error: error,
        });
    }
}

const getAllOrder = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        const result = await OrderServices.getAllOrderFromDb(email);
        const message = email ?
            `Orders fetched successfully for user ${email}!`
            : `Order fetched successfully!`;
        res.status(200).json({
            success: true,
            message: message,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Item not found",
            error: error,
        });
    }
}

export const OrderController = {
    createOrder,
    getAllOrder,
}