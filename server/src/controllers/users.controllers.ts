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
export const logoutController= async (req: Request, res: Response) => { 
        const {refresh_token} = req.body
        const result = await userService.logout(refresh_token)
        return res.json({
            message: 'Logout success'
        })
}

export const getMeController = async (req: Request, res: Response) => {
    const { decoded_authorization } = req as any
    const user_id = decoded_authorization.user_id
    const user = await userService.getMe(user_id)
    return res.json({
        message: 'Get profile success',
        result: user
    })
}

export const updateMeController = async (req: Request, res: Response) => {
    const { decoded_authorization } = req as any
    const user_id = decoded_authorization.user_id
    const body = req.body
    const result = await userService.updateMe(user_id, body)
    return res.json({
        message: 'Update profile success',
        result
    })
}

export const getAddressesController = async (req: Request, res: Response) => {
    const { decoded_authorization } = req as any
    const user_id = decoded_authorization.user_id
    const addresses = await userService.getAddresses(user_id)
    return res.json({
        message: 'Get addresses success',
        result: addresses
    })
}

export const saveAddressController = async (req: Request, res: Response) => {
    const { decoded_authorization } = req as any
    const user_id = decoded_authorization.user_id
    const body = req.body
    const result = await userService.saveAddress(user_id, body)
    return res.json({
        message: 'Save address success',
        result
    })
}

export const verifyStudentCardController = async (req: Request, res: Response) => {
    try {
        const { decoded_authorization } = req as any
        const user_id = decoded_authorization.user_id
        const { image } = req.body
        const result = await userService.verifyStudentCard(user_id, image)
        return res.json({
            message: 'Xác thực thẻ sinh viên thành công!',
            result
        })
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || 'Xác thực thất bại'
        })
    }
}
