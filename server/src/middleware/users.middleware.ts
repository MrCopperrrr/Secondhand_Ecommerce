import { NextFunction, Request, Response } from "express";
import { checkSchema } from 'express-validator'
import userService from "../services/users.services.js";

export const loginValidator= (req: Request, res:  Response, next: NextFunction) => {
    const {email, password}= req.body
    if(!email || !password){
        return res.status(400).json({
            error:'Missing email or password'
        })
    }
    next()
}
export const registerValidator= checkSchema({
    name:{
        notEmpty: true,
        isLength:{
            options:{
                min: 1,
                max: 25
            }
        },
        trim: true,
        isString: true
    },
    email:{
        notEmpty: true,
        isEmail: true,
        trim: true,
        custom: {
            options: async (value) =>{
            const isExistEmail= await userService.checkEmailExist(value)
            if(isExistEmail){
                throw new Error('Email already exists')
            }
            return true
            }
        }
    },
    password: {
        notEmpty: true,
        isLength: {
            options:{
                min: 6,
                max: 50
            }
        },
        isString: true,
        isStrongPassword:{
            options:{
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
        },
        errorMessage: 'password must be at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol'
    },
    confirm_password: {
        notEmpty: true,
        isLength: {
            options:{
                min: 6,
                max: 50
            }
        },
        isString: true,
        isStrongPassword:{
            options:{
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
        },
        custom:{
            options: (value, {req})=>{
                if (value !== req.body.password){
                    throw new Error('Password confirmation does not match password')
                }
                return true
            }
        }
    },
    date_of_birth: {
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true
            }
        }
    } 
})
