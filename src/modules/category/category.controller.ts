import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";

import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.validation";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "./category.service";

export const addCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await createCategory(req.body as CreateCategoryInput);

  return sendResponse(res, {
    message: "Category created successfully",
    data: category,
  });
});

export const getCategories = catchAsync(
  async (_req: Request, res: Response) => {
    const categories = await getAllCategories();

    return sendResponse(res, {
      message: "Categories retrieved successfully",
      data: categories,
    });
  },
);

export const getCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await getCategoryById(req.params.id as string);

  return sendResponse(res, {
    message: "Category retrieved successfully",
    data: category,
  });
});

export const editCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await updateCategory(
    req.params.id as string,
    req.body as UpdateCategoryInput,
  );

  return sendResponse(res, {
    message: "Category updated successfully",
    data: category,
  });
});

export const removeCategory = catchAsync(
  async (req: Request, res: Response) => {
    await deleteCategory(req.params.id as string);

    return sendResponse(res, {
      message: "Category deleted successfully",
    });
  },
);
