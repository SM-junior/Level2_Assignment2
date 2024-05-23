import { string, z } from "zod";


const VariantsSchema = z.object({
  type: z.string().max(20),
  value: z.string().max(20),
});

const InventorySchema = z.object({
  quantity: z.number().int().positive(),
  inStock: z.boolean(),
});

const ProductSchema = z.object({
  name: z.string().min(1).max(20),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  // tags: z.array(z.string().min(1)),
  tags: z.string(),
  variants: VariantsSchema,
  inventory: InventorySchema,
});

export { ProductSchema };
