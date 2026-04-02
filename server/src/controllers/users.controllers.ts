import { Request, Response } from "express"
import userService from "../services/users.services.js"
export const loginController = async (req: Request, res: Response) => {
    const {user}: any= req
    const user_id= user._id
    const result = await userService.login(user_id.toString())
    return res.json({
            message: 'Login success',
            result 
        })
}
export const registerController= async (req: Request, res: Response) => {
    try {
        const result = await userService.register(req.body);
        return res.json({
            message: 'Register success',
            result 
        })
    } catch (error: any) {
        return res.status(500).json({
            message: 'Register failed',
            error: error.message
        })
    }
}