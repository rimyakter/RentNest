import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import {
  addProperty,
  editProperty,
  getProperties,
  getProperty,
  removeProperty,
} from "./property.controller";

const propertyRouter: IRouter = Router();

/**
 * Public Routes
 */
propertyRouter.get("/", getProperties);
propertyRouter.get("/:id", getProperty);

/**
 * Landlord Routes
 */
propertyRouter.post("/", auth("LANDLORD", "ADMIN"), addProperty);
propertyRouter.patch("/:id", auth("LANDLORD", "ADMIN"), editProperty);
propertyRouter.delete("/:id", auth("LANDLORD", "ADMIN"), removeProperty);

export default propertyRouter;
