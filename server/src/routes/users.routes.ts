import { wrapAsync } from './../utils/handlers.js';
import { validate } from './../utils/validation.js';
import { Router } from "express"
import { loginValidator, registerValidator } from "../middleware/users.middleware.js"
import { loginController, registerController } from "../controllers/users.controllers.js"
export const userRouter= Router()
userRouter.post('/login', validate(loginValidator), loginController)
userRouter.post('/register', validate(registerValidator), wrapAsync(registerController))