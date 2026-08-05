import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "./review.service";


export const addReview = catchAsync(async (req, res) => {
  const result = await createReview(req.body, req.user!.id);

  return sendResponse(res, {
    message: "Review created successfully",
    data: result,
  });
});

export const getReviews = catchAsync(async (_req, res) => {
  const result = await getAllReviews();

  return sendResponse(res, {
    message: "Reviews retrieved successfully",
    data: result,
  });
});

export const getReview = catchAsync(async (req, res) => {
  const result = await getReviewById(req.params.id as string);

  return sendResponse(res, {
    message: "Review retrieved successfully",
    data: result,
  });
});

export const editReview = catchAsync(async (req, res) => {
  const result = await updateReview(
    req.params.id as string,
    req.body,
    req.user!
  );

  return sendResponse(res, {
    message: "Review updated successfully",
    data: result,
  });
});

export const removeReview = catchAsync(async (req, res) => {
  await deleteReview(req.params.id as string, req.user!);

  return sendResponse(res, {
    message: "Review deleted successfully",
  });
});