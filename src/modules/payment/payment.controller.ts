import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { confirmPaymentService, createPaymentService, getPaymentById, getPaymentsByUser } from "./payment.service";


export const createPayment = catchAsync(async (req, res) => {
  const result = await createPaymentService(req.body, req.user!.id);

  return sendResponse(res, {
    message: "Payment created successfully",
    data: result,
  });
});

export const confirmPayment = catchAsync(async (req, res) => {
  const result = await confirmPaymentService(req.body);

  return sendResponse(res, {
    message: "Payment confirmed successfully",
    data: result,
  });
});

export const getPayments = catchAsync(async (req, res) => {
  const result = await getPaymentsByUser(req.user!.id);

  return sendResponse(res, {
    message: "Payments retrieved successfully",
    data: result,
  });
});

export const getPayment = catchAsync(async (req, res) => {
  const result = await getPaymentById(req.params.id as string, req.user!.id);

  return sendResponse(res, {
    message: "Payment retrieved successfully",
    data: result,
  });
});