import { Request, Response } from "express"
import userService from "../services/users.services.js"
import databaseService from "../services/database.services.js"
export const loginController = async (req: Request, res: Response) => {
    const {email, password}= req.body
    try{
        const users= await databaseService.users.findOne({
            email,
            password
        })
        if (!users){
            return res.status(401).json({
                        message: 'Email hoặc mật khẩu không chính xác'
                    })
        }
        return res.json({
            message: 'Đăng nhập thành công',
            result: {
                username: users.username,
                email: users.email
            }
        })
    } catch (error: any){
        return res.status(500).json({
            message:'Lỗi hệ thống khi đăng nhập',
            error: error.message
        })
    }
}
export const registerController= async (req: Request, res: Response) => {
    const result = await userService.register(req.body);
    return res.json({
        message: 'Register success',
        result 
    })
}