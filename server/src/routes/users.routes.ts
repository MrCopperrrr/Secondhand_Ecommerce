import { Router } from "express"
import { loginValidator } from "../middleware/users.middleware.js"
import { loginController } from "../controllers/users.controllers.js"
const userRouter= Router()
userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register')