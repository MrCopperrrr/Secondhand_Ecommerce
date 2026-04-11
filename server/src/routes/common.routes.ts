import { Router } from "express";
import { getProvincesController, getFilterOptionsController } from "../controllers/common.controllers.js";

const commonRouter = Router();

commonRouter.get("/provinces", getProvincesController);
commonRouter.get("/filter-options", getFilterOptionsController);

export default commonRouter;
