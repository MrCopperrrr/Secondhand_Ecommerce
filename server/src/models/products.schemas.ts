import { ObjectId } from "mongodb"
import { StatusType } from "../constants/enums.js"
interface ProductType {
    _id?: ObjectId
    name: string
    description: string
    price: number
    category_id: ObjectId        
    sub_category_id?: ObjectId        
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
    category_id: ObjectId        
    sub_category_id?: ObjectId        
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
        this.category_id= new ObjectId(product.category_id)
        this.sub_category_id= product.sub_category_id ? new ObjectId(product.sub_category_id) : undefined
        this.condition= product.condition
        this.images=product.images
        this.seller_id= product.seller_id
        this.status= product.status
        this.created_at= product.created_at || new Date()
        this.updated_at= product.updated_at || new Date()
    }
}

