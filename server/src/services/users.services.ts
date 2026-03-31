import User from './../models/users.schemas.js';
import databaseService from "./database.services.js"
import { RegisterReqBody } from "../models/requests/users.requests.js"
import { UserRole } from '../constants/enums.js';
import { hashPassword } from '../utils/crypto.js';

class UserService{
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
    }
}
const userService = new UserService()
export default userService