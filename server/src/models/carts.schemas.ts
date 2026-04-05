import { ObjectId } from "mongodb"
interface CartType{
    _id: ObjectId
    user_id: ObjectId
    total: Number
    created_at: Date
    deleted_at: Date
}
export class Cart {
    _id: ObjectId
    user_id: ObjectId
    total: Number
    created_at: Date
    deleted_at: Date
    constructor(cart: CartType){
        this._id=cart._id
        this.user_id=cart.user_id
        this.total= cart.total
        this.created_at= cart.created_at
        this.deleted_at= cart.deleted_at
    }
}
