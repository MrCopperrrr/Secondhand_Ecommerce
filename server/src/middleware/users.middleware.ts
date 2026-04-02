import { checkSchema } from 'express-validator'
import userService from "../services/users.services.js";
import databaseService from '../services/database.services.js';

export const loginValidator= checkSchema({
    email:{
        notEmpty: true,
        isEmail: {
            errorMessage: 'Email is invalid'
        },
        trim: true,
        custom: {
            options: async (value, {req}) =>{
            const user= await databaseService.users.findOne({email: value})
            if(!user){
                throw new Error('User not found')
            }
            req.user=user
            return true
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password is required'
        },
        isLength: {
            options:{
                min: 6,
                max: 50
            }
        },
        isString: {
            errorMessage: 'password must be a string'
        },
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
    }
})

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
    }
})
