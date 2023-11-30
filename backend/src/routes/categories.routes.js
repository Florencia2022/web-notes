import { Router } from "express";
import {
  getCategories,
  postCategories,
} from "../controllers/categories.controllers.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", postCategories);

export default categoryRouter;
