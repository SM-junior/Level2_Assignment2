import { TOrders } from "./order.interface";
import { Order } from "./order.model";

const createOrderToDb = async (payload: TOrders) => {
    const result = await Order.create(payload);
    return result
}

const getAllOrderFromDb = async (email: string) => {
    if (email) {
        const result = await Order.find({
            $or: [
                { email: { $regex: email, $options: 'i' } }
            ],
        })
        return result
    }
    else {
        const result = await Order.find()
        return result
    }
}

export const OrderServices = {
    createOrderToDb,
    getAllOrderFromDb,
}