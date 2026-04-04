import { StatusType } from "../constants/enums.js";
import Product from "../models/products.schemas.js";
import databaseService from "./database.services.js";
import { ObjectId } from "mongodb";
class ProductService{
    async createProduct(payload: Product){
        const result= await databaseService.products.insertOne(
            new Product ({
            ...payload,
            status: StatusType.Available,
            seller_id: new ObjectId(payload.seller_id)
            })
        )
        return result
    }

    async getProductsBySeller(seller_id: string){
        const result= await databaseService.products.find({
            seller_id: new ObjectId(seller_id)
        }).toArray()
        return result
    }

    async getProducts(){
        const result= await databaseService.products.find({}).toArray()
        return result
    }

    async getProductById(id: string){
        const result= await databaseService.products.findOne({
            _id: new ObjectId(id)
        })
        return result
    }

}
const productService= new ProductService()
export default productService