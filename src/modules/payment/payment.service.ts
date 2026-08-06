import prisma from "../../lib/prisma";
import stripe from "../../lib/stripe";
import config from "../../config";
import { AppError } from "../../utils/app-error";

const CURRENCY = "usd";

export async function createCheckoutSession(
  renterId: string,
  rentalRequestId: string,
) {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: rentalRequestId },
    include: {
      property: true,
      payment: true,
    },
  });

  if (!rentalRequest) {
    throw new AppError(404, "Rental request not found");
  }

  if (rentalRequest.renterId !== renterId) {
    throw new AppError(403, "Forbidden");
  }

  if (rentalRequest.status !== "APPROVED") {
    throw new AppError(
      400,
      "Payment is only allowed after the request is approved",
    );
  }

  if (rentalRequest.payment?.status === "COMPLETED") {
    throw new AppError(409, "This rental has already been paid");
  }

  const amount =
    rentalRequest.property.price * (rentalRequest.duration ?? 1);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    metadata: {
      rentalRequestId: rentalRequest.id,
    },

    success_url: `${config.CLIENT_URL}/payment/success`,
    cancel_url: `${config.CLIENT_URL}/payment/cancel`,

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: Math.round(amount * 100),

          product_data: {
            name: rentalRequest.property.title,
            description: rentalRequest.property.address,
          },
        },
      },
    ],
  });

  await prisma.payment.upsert({
    where: {
      rentalRequestId: rentalRequest.id,
    },

    create: {
      rentalRequestId: rentalRequest.id,
      renterId,
      amount,

      transactionId: session.id,

      provider: "STRIPE",
      method: "CARD",
    },

    update: {
      transactionId: session.id,
      amount,
      status: "PENDING",
    },
  });

  return {
    checkoutUrl: session.url,
  };
}

export async function completePayment(
  rentalRequestId: string,
  transactionId: string,
) {
  const payment = await prisma.payment.findUnique({
    where: {
      rentalRequestId,
    },
  });

  // Stripe may send the webhook multiple times
  if (!payment || payment.status === "COMPLETED") {
    return;
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: {
        rentalRequestId,
      },

      data: {
        status: "COMPLETED",
        transactionId,
        paidAt: new Date(),
      },
    }),

    prisma.rentalRequest.update({
      where: {
        id: rentalRequestId,
      },

      data: {
        status: "ACTIVE",
      },
    }),
  ]);
}