import { ObjectId } from "mongodb"
import { StatusType } from "../constants/enums.js"
interface ProductType {
    _id?: ObjectId
    name: string
    description: string
    price: number
    category: string        
    condition: number        
    images: string[]      
    seller_id: ObjectId  
    status: StatusType   
    created_at?: Date
    updated_at?: Date
}
export default class Product {
    _id?: ObjectId
    name: string
    description: string
    price: number
    category: string        
    condition: number        
    images: string[]      
    seller_id: ObjectId  
    status: StatusType 
    created_at?: Date
    updated_at?: Date
    constructor(product: ProductType){
        this._id=product._id
        this.name=product.name
        this.description=product.description
        this.price= product.price
        this.category= product.category
        this.condition= product.condition
        this.images=product.images
        this.seller_id= product.seller_id
        this.status= product.status
        this.created_at= product.created_at || new Date()
        this.updated_at= product.updated_at || new Date()
    }
}

