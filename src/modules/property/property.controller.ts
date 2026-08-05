import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
} from "./property.service";
import type {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "./property.validation";

export const addProperty = catchAsync(async (req: Request, res: Response) => {
  const property = await createProperty(
    req.body as CreatePropertyInput,
    req.user!.id,
  );

  return sendResponse(res, {
    message: "Property created successfully",
    data: property,
  });
});

export const getProperties = catchAsync(
  async (_req: Request, res: Response) => {
    const properties = await getAllProperties();

    return sendResponse(res, {
      message: "Properties retrieved successfully",
      data: properties,
    });
  },
);

export const getProperty = catchAsync(async (req: Request, res: Response) => {
  const property = await getPropertyById(req.params.id as string);

  return sendResponse(res, {
    message: "Property retrieved successfully",
    data: property,
  });
});

export const editProperty = catchAsync(async (req: Request, res: Response) => {
  const property = await updateProperty(
    req.params.id as string,
    req.body as UpdatePropertyInput,
    req.user!,
  );

  return sendResponse(res, {
    message: "Property updated successfully",
    data: property,
  });
});

export const removeProperty = catchAsync(
  async (req: Request, res: Response) => {
    await deleteProperty(req.params.id as string, req.user!);

    return sendResponse(res, {
      message: "Property deleted successfully",
    });
  },
);
