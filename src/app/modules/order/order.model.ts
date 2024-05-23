import { model, Schema } from "mongoose";
import { TOrders } from "./order.interface";

//orders schema
const OrderSchema = new Schema<TOrders>({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

export const Order = model<TOrders>("Order", OrderSchema);
