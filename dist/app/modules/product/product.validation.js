"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const zod_1 = require("zod");
// const VariantsSchema = z.object({
//   type: z.string(),
//   value: z.string(),
// });
// const InventorySchema = z.object({
//   quantity: z.number(),
//   inStock: z.boolean(),
// });
// const ProductSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   price: z.number(),
//   category: z.string(),
//   tags: z.array(z.string()),
//   variants: VariantsSchema,
//   inventory: InventorySchema,
// });
// export default ProductSchema;
const VariantsSchema = zod_1.z.object({
    type: zod_1.z.string().max(20),
    value: zod_1.z.string().max(20),
});
const InventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    inStock: zod_1.z.boolean(),
});
const ProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(20),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().min(1),
    // tags: z.array(z.string().min(1)),
    tags: zod_1.z.string(),
    variants: VariantsSchema,
    inventory: InventorySchema,
});
exports.ProductSchema = ProductSchema;
