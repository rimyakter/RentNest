import type { Request, Response } from "express";
import { z } from "zod";

import stripe from "../../lib/stripe";
import config from "../../config";
import prisma from "../../lib/prisma";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app-error";

import { createCheckoutSession, completePayment } from "./payment.service";

const rentalRequestSchema = z.object({
  rentalRequestId: z.uuid("Invalid rental request id"),
});

export const checkout = catchAsync(async (req: Request, res: Response) => {
  const { rentalRequestId } = rentalRequestSchema.parse(req.params);

  const result = await createCheckoutSession(req.user!.id, rentalRequestId);

  sendResponse(res, {
    message: "Checkout session created",
    data: result,
  });
});

export const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await prisma.payment.findMany({
    where: {
      renterId: req.user!.id,
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

  sendResponse(res, {
    message: "Payments retrieved successfully",
    data: {
      payments,
    },
  });
});

export const webhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    throw new AppError(400, "Missing stripe signature");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    throw new AppError(400, "Invalid webhook signature");
  }

  const session = event.data.object as {
    id: string;
    metadata?: {
      rentalRequestId?: string;
    };
  };

  const rentalRequestId = session.metadata?.rentalRequestId;

  if (rentalRequestId) {
    if (event.type === "checkout.session.completed") {
      await completePayment(rentalRequestId, session.id);
    }

    if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      await prisma.payment.updateMany({
        where: {
          rentalRequestId,
          status: "PENDING",
        },

        data: {
          status: "FAILED",
        },
      });
    }
  }

  res.json({
    received: true,
  });
});
