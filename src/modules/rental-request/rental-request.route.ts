import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import {
  addRentalRequest,
  approveOrRejectRequest,
  getRentalRequest,
  getRentalRequests,
} from "./rental-request.controller";

const rentalRequestRouter: IRouter = Router();

// Tenant
rentalRequestRouter.post("/", auth("TENANT"), addRentalRequest);
rentalRequestRouter.get("/", auth("TENANT"), getRentalRequests);

// Tenant / Landlord / Admin
rentalRequestRouter.get(
  "/:id",
  auth("TENANT", "LANDLORD", "ADMIN"),
  getRentalRequest,
);

// Landlord
rentalRequestRouter.patch("/:id", auth("LANDLORD"), approveOrRejectRequest);

export default rentalRequestRouter;
