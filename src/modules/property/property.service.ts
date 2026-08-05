import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { UserJwtPayload } from "../../utils/jwt";
import type { CreatePropertyInput, UpdatePropertyInput } from "./property.validation";


export const createProperty = async (
  payload: CreatePropertyInput,
  ownerId: string,
) => {
  // Check category exists
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const property = await prisma.property.create({
    data: {
      ...payload,
      ownerId,
    },
    include: {
      owner: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  return property;
};

export const getAllProperties = async () => {
  return prisma.property.findMany({
    where: {
      available: true,
    },
    include: {
      owner: {
        omit: {
          password: true,
        },
      },
      category: true,
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPropertyById = async (id: string) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      owner: {
        omit: {
          password: true,
        },
      },
      category: true,
      reviews: {
        include: {
          renter: {
            omit: {
              password: true,
            },
          },
        },
      },
    },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  return property;
};

export const updateProperty = async (
  id: string,
  payload: UpdatePropertyInput,
  user: UserJwtPayload,
) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  // Only owner or admin can update
  if (user.role !== "ADMIN" && property.ownerId !== user.id) {
    throw new AppError(403, "Forbidden");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new AppError(404, "Category not found");
    }
  }

  return prisma.property.update({
    where: { id },
    data: payload as any,
    include: {
      owner: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });
};

export const deleteProperty = async (id: string, user: UserJwtPayload) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  // Only owner or admin can delete
  if (user.role !== "ADMIN" && property.ownerId !== user.id) {
    throw new AppError(403, "Forbidden");
  }

  await prisma.property.delete({
    where: { id },
  });

  return null;
};
