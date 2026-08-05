import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { UserJwtPayload } from "../../utils/jwt";
import type {
  CreateReviewInput,
  UpdateReviewInput,
} from "./review.validation";

export const createReview = async (
  payload: CreateReviewInput,
  renterId: string
) => {
  const completedRental = await prisma.rentalRequest.findFirst({
    where: {
      renterId,
      propertyId: payload.propertyId,
      status: "COMPLETED",
    },
  });

  if (!completedRental) {
    throw new AppError(
      403,
      "You can only review properties after completing a rental."
    );
  }

  const exists = await prisma.review.findUnique({
    where: {
      propertyId_renterId: {
        propertyId: payload.propertyId,
        renterId,
      },
    },
  });

  if (exists) {
    throw new AppError(409, "You already reviewed this property.");
  }

  return prisma.review.create({
    data: {
      ...payload,
      renterId,
    },
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    include: {
      renter: {
        omit: {
          password: true,
        },
      },
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      renter: {
        omit: {
          password: true,
        },
      },
      property: true,
    },
  });

  if (!review) {
    throw new AppError(404, "Review not found");
  }

  return review;
};

export const updateReview = async (
  id: string,
  payload: UpdateReviewInput,
  user: UserJwtPayload
) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new AppError(404, "Review not found");
  }

  if (review.renterId !== user.id) {
    throw new AppError(403, "Forbidden");
  }

  return prisma.review.update({
    where: { id },
    data: payload as any,
  });
};

export const deleteReview = async (
  id: string,
  user: UserJwtPayload
) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new AppError(404, "Review not found");
  }

  if (
    review.renterId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(403, "Forbidden");
  }

  await prisma.review.delete({
    where: { id },
  });

  return null;
};