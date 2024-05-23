"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
//schema for variants
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().max(20),
    value: zod_1.z.string().max(20),
});
//schema for inventory
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().max(99), // Assuming max quantity is 99
    inStock: zod_1.z.boolean().optional(),
});
//schema for product
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
