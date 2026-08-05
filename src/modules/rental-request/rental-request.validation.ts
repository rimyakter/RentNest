import { z } from "zod";
import { RentalRequestStatus } from "../../../prisma/generated/prisma/enums";

export const createRentalRequestSchema = z.object({
  propertyId: z.string().uuid("Invalid property id"),

  moveInDate: z.coerce.date(),

  duration: z.number().int().positive().optional(),

  message: z.string().trim().optional(),
});

export const updateRentalRequestSchema = z.object({
  status: z.enum(RentalRequestStatus),
});

export type CreateRentalRequestInput = z.infer<
  typeof createRentalRequestSchema
>;

export type UpdateRentalRequestInput = z.infer<
  typeof updateRentalRequestSchema
>;