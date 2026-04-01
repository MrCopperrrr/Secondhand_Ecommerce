import jwt, { SignOptions } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: SignOptions 
}) => {
  return new Promise<string>((resolve, reject) => {
   
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        return reject(error) 
      }
      resolve(token as string)
    })
  }) 
}
export const verifyToken = (token: string, secretKey = process.env.JWT_SECRET as string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        throw reject(error) 
      }
      resolve(decoded) 
    })
  })
}