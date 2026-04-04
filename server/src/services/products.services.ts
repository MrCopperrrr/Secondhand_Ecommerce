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

    async getProductById(id: string) {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'seller_id',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: {
                    path: '$seller',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'address',
                    localField: 'seller_id',
                    foreignField: 'user_id',
                    as: 'addresses'
                }
            },
            {
                $addFields: {
                    'seller.address': { $arrayElemAt: ['$addresses', 0] }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'sub_categories',
                    localField: 'sub_category_id',
                    foreignField: '_id',
                    as: 'subCategory'
                }
            },
            {
                $unwind: {
                    path: '$subCategory',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    addresses: 0
                }
            }
        ];

        const result = await databaseService.products.aggregate(pipeline).toArray();
        return result[0] || null;
    }

}
const productService= new ProductService()
export default productService