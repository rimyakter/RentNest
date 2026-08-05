import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.validation";

export const createCategory = async (payload: CreateCategoryInput) => {
  const exists = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (exists) {
    throw new AppError(409, "Category already exists");
  }

  return prisma.category.create({
    data: payload as any,
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          properties: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  return category;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryInput,
) => {
  const exists = await prisma.category.findUnique({
    where: { id },
  });

  if (!exists) {
    throw new AppError(404, "Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: payload as any,
  });
};

export const deleteCategory = async (id: string) => {
  const exists = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          properties: true,
        },
      },
    },
  });

  if (!exists) {
    throw new AppError(404, "Category not found");
  }

  if (exists._count.properties > 0) {
    throw new AppError(
      400,
      "Cannot delete category because it has properties.",
    );
  }

  await prisma.category.delete({
    where: { id },
  });
};
