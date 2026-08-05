import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import { addReview, editReview, getReview, getReviews, removeReview } from "./review.controller";


const reviewRouter: IRouter = Router();

// Public
reviewRouter.get("/", getReviews);
reviewRouter.get("/:id", getReview);

// Tenant
reviewRouter.post("/", auth("TENANT"), addReview);
reviewRouter.patch("/:id", auth("TENANT"), editReview);

// Tenant/Admin
reviewRouter.delete("/:id", auth("TENANT", "ADMIN"), removeReview);

export default reviewRouter;