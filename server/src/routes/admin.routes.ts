import { Router } from "express";
import { wrapAsync } from "../utils/handlers.js";
import { accessTokenValidator } from "../middleware/auth.middlewares.js";
import { getAdminStatsController, getAllOrdersAdminController } from "../controllers/admin.controllers.js";

const adminRouter = Router();

// Middleware checking for admin role should be here, but for now we rely on accessToken
// In a real app, we'd add an adminValidator
adminRouter.get("/stats", accessTokenValidator, wrapAsync(getAdminStatsController));
adminRouter.get("/orders", accessTokenValidator, wrapAsync(getAllOrdersAdminController));

export default adminRouter;
