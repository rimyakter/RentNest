import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { PaymentStatus } from "../../../prisma/generated/prisma/enums";
import type {
  ConfirmPaymentInput,
  CreatePaymentInput,
} from "./payment.validation";

export const createPaymentService = async (
  payload: CreatePaymentInput,
  renterId: string
) => {
  const request = await prisma.rentalRequest.findUnique({
    where: {
      id: payload.rentalRequestId,
    },
  });

  if (!request) {
    throw new AppError(404, "Rental request not found");
  }

  if (request.status !== "APPROVED") {
    throw new AppError(400, "Rental request is not approved");
  }

  const payment = await prisma.payment.create({
    data: {
      rentalRequestId: payload.rentalRequestId,
      renterId,
      amount: payload.amount,
      method: payload.method,
      provider: payload.provider,
      transactionId: crypto.randomUUID(),
    },
  });

  return payment;
};

export const confirmPaymentService = async (
  payload: ConfirmPaymentInput
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: payload.transactionId,
    },
  });

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  const updatedPayment = await prisma.payment.update({
    where: {
      transactionId: payload.transactionId,
    },
    data: {
      status: payload.status,
      paidAt:
        payload.status === PaymentStatus.COMPLETED
          ? new Date()
          : null,
    },
  });

  if (payload.status === PaymentStatus.COMPLETED) {
    await prisma.rentalRequest.update({
      where: {
        id: payment.rentalRequestId,
      },
      data: {
        status: "ACTIVE",
      },
    });
  }

  return updatedPayment;
};

export const getPaymentsByUser = async (renterId: string) => {
  return prisma.payment.findMany({
    where: {
      renterId,
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPaymentById = async (
  id: string,
  renterId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id,
      renterId,
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
  });

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  return payment;
};