import { z } from "zod";
import { Role } from "../../../prisma/generated/prisma/enums";

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "name is required").optional(),

  email: z.email("invalid email").optional(),

  role: z.enum(Role).optional(),
});

export const userIdParamSchema = z.object({
  id: z.uuid("invalid user id"),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdParamInput = z.infer<typeof userIdParamSchema>;
