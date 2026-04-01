import { wrapAsync } from './../utils/handlers.js';
import { validate } from './../utils/validation.js';
import { Router } from "express"
import { loginValidator, refreshTokenValidator, registerValidator } from "../middleware/users.middleware.js"
import { loginController, registerController, logoutController } from "../controllers/users.controllers.js"
import { accessTokenValidator } from '../middleware/auth.middlewares.js';
export const userRouter= Router()

userRouter.post('/login', validate(loginValidator), wrapAsync(loginController))
userRouter.post('/register', validate(registerValidator), wrapAsync(registerController))

userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))