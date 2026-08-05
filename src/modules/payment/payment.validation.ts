import { z } from "zod";
import {
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
} from "../../../prisma/generated/prisma/enums";

export const createPaymentSchema = z.object({
  rentalRequestId: z.string().uuid("Invalid rental request id"),

  amount: z.number().positive("Amount must be greater than 0"),

  method: z.enum(PaymentMethod),

  provider: z.enum(PaymentProvider),
});

export const confirmPaymentSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),

  status: z.enum(PaymentStatus),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;