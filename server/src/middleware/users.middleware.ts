import { checkSchema } from 'express-validator'
import userService from "../services/users.services.js"
import databaseService from '../services/database.services.js'
import { validate } from '../utils/validation.js'
import { verifyToken } from '../utils/jwt.js'
import { hashPassword } from '../utils/crypto.js'


export const refreshTokenValidator = validate(
  checkSchema({
    refresh_token: {
      trim: true,
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new Error('Refresh token is required')
          }
          try {
            // verify token 
            const decoded_refresh_token = await verifyToken(value, process.env.JWT_SECRET_REFRESH_TOKEN)
            
            // Check token if exist in DB
            const refresh_token_in_db = await databaseService.refreshTokens.findOne({ token: value })
            
            if (refresh_token_in_db === null) {
              throw new Error('Refresh token does not exist or has been used')
            }

            //save decoded to req
            ;(req as any).decoded_refresh_token = decoded_refresh_token
          } catch (error) {
            throw new Error((error as any).message)
          }
          return true
        }
      }
    }
  }, ['body'])
)
export const loginValidator= checkSchema({
    email:{
        notEmpty:{
            errorMessage: 'Email is required'
        },
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
        trim:true,
        notEmpty: {
            errorMessage: 'password is required'
        },
        custom: {
            options: async (value, {req}) => {
                const user= await databaseService.users.findOne({email: req.body.email})
                console.log(user)
                if (!user) {
                throw new Error('Email or password is incorrect')
            }
                const isMatch= hashPassword(value) === user.password
                if(!isMatch){
                    throw new Error ('Password is incorrect')
                }
                req.user = user
                return true
            }
        }
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
        trim: true,
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
        trim: true,
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
    phone_number: {
        notEmpty: true,
        isLength:{
            options:{
                min: 10,
                max: 10
            }
            
        }
    }
})
