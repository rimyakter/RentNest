import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  description: z.string().trim().min(1, "Description is required"),

  price: z.number().positive("Price must be greater than 0"),

  bedrooms: z.number().int().min(1, "Bedrooms must be at least 1"),

  bathrooms: z.number().int().min(1, "Bathrooms must be at least 1"),

  address: z.string().trim().min(1, "Address is required"),

  city: z.string().trim().min(1, "City is required"),

  image: z.string().url("Image must be a valid URL"),

  available: z.boolean().default(true),

  categoryId: z.string().uuid("Invalid category id"),
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
