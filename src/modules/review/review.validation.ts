import { z } from "zod";

export const createReviewSchema = z.object({
  propertyId: z.string().uuid("Invalid property id"),

  rating: z
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),

  comment: z.string().trim().min(1, "Comment is required"),
});

export const updateReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),

  comment: z.string().trim().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;