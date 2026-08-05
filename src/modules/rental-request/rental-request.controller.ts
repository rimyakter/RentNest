import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { createRentalRequest, getMyRentalRequests, getRentalRequestById, updateRentalRequestStatus } from "./rental-request.service";


export const addRentalRequest = catchAsync(async (req, res) => {
  const result = await createRentalRequest(req.body, req.user!.id);

  return sendResponse(res, {
    message: "Rental request submitted successfully",
    data: result,
  });
});

export const getRentalRequests = catchAsync(async (req, res) => {
  const result = await getMyRentalRequests(req.user!);

  return sendResponse(res, {
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

export const getRentalRequest = catchAsync(async (req, res) => {
  const result = await getRentalRequestById(req.params.id as string, req.user!);

  return sendResponse(res, {
    message: "Rental request retrieved successfully",
    data: result,
  });
});

export const approveOrRejectRequest = catchAsync(async (req, res) => {
  const result = await updateRentalRequestStatus(
    req.params.id as string,
    req.body,
    req.user!
  );

  return sendResponse(res, {
    message: "Rental request updated successfully",
    data: result,
  });
});