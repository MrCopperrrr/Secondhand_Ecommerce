
import User, {RefreshToken} from './../models/users.schemas.js';
import databaseService from "./database.services.js"
import { RegisterReqBody } from "../models/requests/users.requests.js"
import { UserRole, TokenType } from '../constants/enums.js';
import { hashPassword } from '../utils/crypto.js';
import { signToken } from '../utils/jwt.js';
import { ObjectId } from 'mongodb';
import { createWorker } from 'tesseract.js';
import { normalizeText } from '../utils/text.js';

class UserService{
    private signAccessAndRefreshToken(user_id: string){
        return Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshToken(user_id)
        ])
    }
    async logout(refresh_token: string){
        const result= await databaseService.refreshTokens.deleteOne({token: refresh_token})
        return result
    }
    async login(user_id: string){
        const [access_token, refresh_token]= await this.signAccessAndRefreshToken(user_id)
        await databaseService.refreshTokens.insertOne(
        new RefreshToken({
            user_id: new ObjectId(user_id),
            token: refresh_token,
            created_at: new Date()
        })
    )
        const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) }, { projection: { password: 0 } })
        return {
            access_token,
            refresh_token,
            user
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
            password: hashPassword(payload.password.trim()), 
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
        const user = await databaseService.users.findOne({ _id: result.insertedId }, { projection: { password: 0 } })
        return {
        access_token,
        refresh_token,
        user
    }
    }
    async getMe(user_id: string) {
        const user = await databaseService.users.findOne(
            { _id: new ObjectId(user_id) },
            {
                projection: {
                    password: 0,
                    email_verify_token: 0,
                    forgot_password_token: 0
                }
            }
        )
        return user
    }
    async updateMe(user_id: string, payload: any) {
        const result = await databaseService.users.findOneAndUpdate(
            { _id: new ObjectId(user_id) },
            {
                $set: {
                    ...payload,
                    updated_at: new Date()
                }
            },
            {
                returnDocument: 'after',
                projection: {
                   password: 0,
                    email_verify_token: 0,
                    forgot_password_token: 0
                }
            }
        )
        return result
    }

    async getAddresses(user_id: string) {
        console.log("Querying addresses for user_id:", user_id)
        const filter = {
            $or: [
                { user_id: user_id },
                { user_id: new ObjectId(user_id) }
            ]
        }
        
        let addresses = await databaseService.addresses.find(filter).toArray()
        if (addresses.length === 0) {
            console.log("Plural 'addresses' is empty, trying singular 'address'")
            addresses = await databaseService.address.find(filter).toArray()
        }
        
        console.log("Found addresses count:", addresses.length)
        return addresses
    }
    async saveAddress(user_id: string, payload: any) {
        const filter = { user_id: new ObjectId(user_id) }
        const update = {
            $set: {
                ...payload,
                user_id: new ObjectId(user_id),
                updated_at: new Date()
            },
            $setOnInsert: {
                created_at: new Date()
            }
        }
        const result = await databaseService.address.updateOne(filter, update, { upsert: true })
        return result
    }

    async verifyStudentCard(user_id: string, image: string) {
        // 1. Prepare image
        let imageBuffer: Buffer | string = image;
        if (image.startsWith('data:image')) {
            imageBuffer = Buffer.from(image.split(',')[1], 'base64');
        }

        // 2. OCR text extraction
        let text = '';
        try {
            const worker = await createWorker(['vie', 'eng']);
            const result = await worker.recognize(imageBuffer);
            text = result.data.text;
            await worker.terminate();
        } catch (error: any) {
            console.error('OCR Error Details:', error);
            // Fallback: If OCR totally fails due to environment/network, we give a more helpful message
            throw new Error(`Lỗi hệ thống OCR: ${error.message || 'Không thể khởi động bộ lọc ảnh'}. Vui lòng thử lại sau.`);
        }

        const normalizedOCR = normalizeText(text);
        
        // 3. Fetch user
        const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) });
        if (!user) throw new Error('Người dùng không tồn tại');
        
        // Verification Logic - Simplified as requested
        // Check for card title keywords
        const cardTitleKeywords = ['the sinh vien', 'student card', 'student id card', 'truong dai hoc'];
        const hasCardTitle = cardTitleKeywords.some(k => normalizedOCR.includes(k));
        
        // Check for ID markers or any long numeric sequence
        const idMarkers = ['ma so', 'mssv', 'id', 'student id'];
        const hasIDMarker = idMarkers.some(k => normalizedOCR.includes(k)) || /\d{5,}/.test(normalizedOCR);

        if (!hasCardTitle || !hasIDMarker) {
            throw new Error('Ảnh không đủ thông tin xác thực. Yêu cầu ảnh thẻ phải rõ tiêu đề "Thẻ Sinh Viên" và Mã số sinh viên.');
        }

        // 5. Update Database
        const result = await databaseService.users.findOneAndUpdate(
            { _id: new ObjectId(user_id) },
            { $set: { is_verified: true, student_card_image: image, updated_at: new Date() } },
            { returnDocument: 'after', projection: { password: 0, email_verify_token: 0 } }
        )
        return result
    }
}
const userService = new UserService()
export default userService