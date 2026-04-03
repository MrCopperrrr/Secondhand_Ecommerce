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

}
const productService= new ProductService()
export default productService