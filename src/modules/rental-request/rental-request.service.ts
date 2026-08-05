import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { UserJwtPayload } from "../../utils/jwt";
import { RentalRequestStatus } from "../../../prisma/generated/prisma/enums";
import type {
  CreateRentalRequestInput,
  UpdateRentalRequestInput,
} from "./rental-request.validation";

export const createRentalRequest = async (
  payload: CreateRentalRequestInput,
  renterId: string,
) => {
  const property = await prisma.property.findUnique({
    where: { id: payload.propertyId },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  if (!property.available) {
    throw new AppError(400, "Property is unavailable");
  }

  return prisma.rentalRequest.create({
    data: {
      ...(payload as any),
      renterId,
    },
    include: {
      property: true,
    },
  });
};

export const getMyRentalRequests = async (user: UserJwtPayload) => {
  if (user.role === "TENANT") {
    return prisma.rentalRequest.findMany({
      where: {
        renterId: user.id,
      },
      include: {
        property: true,
        payment: true,
      },
    });
  }

  if (user.role === "LANDLORD") {
    return prisma.rentalRequest.findMany({
      where: {
        property: {
          ownerId: user.id,
        },
      },
      include: {
        renter: {
          omit: {
            password: true,
          },
        },
        property: true,
      },
    });
  }

  return prisma.rentalRequest.findMany({
    include: {
      renter: true,
      property: true,
      payment: true,
    },
  });
};

export const getRentalRequestById = async (
  id: string,
  user: UserJwtPayload,
) => {
  const request = await prisma.rentalRequest.findUnique({
    where: { id },
    include: {
      property: true,
      renter: {
        omit: {
          password: true,
        },
      },
      payment: true,
    },
  });

  if (!request) {
    throw new AppError(404, "Rental request not found");
  }

  return request;
};

export const updateRentalRequestStatus = async (
  id: string,
  payload: UpdateRentalRequestInput,
  user: UserJwtPayload,
) => {
  const request = await prisma.rentalRequest.findUnique({
    where: { id },
    include: {
      property: true,
    },
  });

  if (!request) {
    throw new AppError(404, "Rental request not found");
  }

  if (request.property.ownerId !== user.id) {
    throw new AppError(403, "Forbidden");
  }

  return prisma.rentalRequest.update({
    where: { id },
    data: {
      status: payload.status,
    },
  });
};
