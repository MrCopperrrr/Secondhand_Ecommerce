import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";

export const accessTokenValidator= async (req: Request, res: Response, next: NextFunction) => {
    const authHeader= req.headers.authorization || req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({
            message: 'Authorization failed. No access token provided.'
        })
    }
    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message: 'Authorization failed. Token malformed'
        })
    }
    try{
        const decoded_authorization= await verifyToken(token);
        (req as any).decoded_authorization = decoded_authorization
        next()

    }catch(error){
        return res.status(401).json({
      message: 'Unauthorized',
      error: (error as any).message
    })
    }
    
}