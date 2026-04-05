import { Router } from "express";
import { getProvincesController } from "../controllers/common.controllers.js";

const commonRouter = Router();

commonRouter.get("/provinces", getProvincesController);

export default commonRouter;
