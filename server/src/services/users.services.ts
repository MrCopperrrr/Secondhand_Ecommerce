
import User, {RefreshToken} from './../models/users.schemas.js';
import databaseService from "./database.services.js"
import { RegisterReqBody } from "../models/requests/users.requests.js"
import { UserRole, TokenType } from '../constants/enums.js';
import { hashPassword } from '../utils/crypto.js';
import { signToken } from '../utils/jwt.js';


class UserService{
    private signAccessAndRefreshToken(user_id: string){
        return Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshToken(user_id)
        ])
    }
    async login(user_id: string){
        const [access_token, refresh_token]= await this.signAccessAndRefreshToken(user_id)
        return {
            access_token,
            refresh_token
        }
    }
    async signRefreshToken (user_id: string){
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.RefreshToken
            },
            options: {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as any,
                algorithm: 'HS256'
            }
        })
    }
    async signAccessToken (user_id: string){
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.AccessToken
            },
            options: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as any,
                algorithm: 'HS256'
            }
        })
    }
    async checkEmailExist(email: string) {
        const user= await databaseService.users.findOne({email})
        return Boolean(user)     
    }
    async register (payload: RegisterReqBody){
        const {name, email, password, phone_number}= payload
        const result= await databaseService.users.insertOne(
            new User({
            username: name,          
            email: email,
            password: hashPassword(payload.password), 
            role: UserRole.User,
            phone_number: phone_number,   
            created_at: new Date()
            })
        )
        const user_id = result.insertedId.toString()
        const [access_token, refresh_token]= await this.signAccessAndRefreshToken(user_id)
        await databaseService.refreshTokens.insertOne(
        new RefreshToken({
        user_id: result.insertedId,
        token: refresh_token,
        created_at: new Date()
        })
        
    )
        return {
        access_token,
        refresh_token
    }
    }
}
const userService = new UserService()
export default userService