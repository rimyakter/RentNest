import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import {
  addCategory,
  editCategory,
  getCategories,
  getCategory,
  removeCategory,
} from "./category.controller";

const categoryRouter: IRouter = Router();

// Public
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);

// Admin
categoryRouter.post("/", auth("ADMIN"), addCategory);
categoryRouter.put("/:id", auth("ADMIN"), editCategory);
categoryRouter.delete("/:id", auth("ADMIN"), removeCategory);

export default categoryRouter;
