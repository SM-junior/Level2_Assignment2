import { z } from "zod";

//schema for variants
const variantValidationSchema = z.object({
  type: z.string().max(20),
  value: z.string().max(20),
});

//schema for inventory
const inventoryValidationSchema = z.object({
  quantity: z.number().int().max(99), // Assuming max quantity is 99
  inStock: z.boolean().optional(),
});

//schema for product
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema