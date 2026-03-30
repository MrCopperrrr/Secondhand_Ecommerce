import { ObjectId } from 'mongodb'
import { UserRole } from '../constants/enums.js'
interface UserType{
    _id: ObjectId
    avatar: string
    first_name: string
    last_name: string
    username: string
    email: string
    role?: UserRole
    password: string
    date_of_birth: Date
    phone_number: string
    email_verify_token?: string
    created_at: Date
}
export class User {
    _id?: ObjectId
    avatar?: string
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    role: UserRole
    date_of_birth: Date
    phone_number: string
    email_verify_token: string
    created_at?: Date
    constructor(user: UserType){
        this._id=user._id || ''
        this.avatar=user.avatar || '' //Default avatar
        this.first_name=user.first_name
        this.last_name=user.last_name
        this.username= user.username
        this.email= user.email
        this.password= user.password
        this.date_of_birth= user.date_of_birth
        this.phone_number= user.phone_number
        this.email_verify_token=user.email_verify_token || ''
        this.created_at= user.created_at || new Date()
        this.role=user.role || UserRole.User
    }
}
interface Address{
    _id: ObjectId
    user_id: string
    tittle: string
    address_line_1: string
    address_line_2?: string
    city: string
    ward: string
    campus? : string
    phone_number: string
    created_at: Date
}
interface Categories{
    _id: ObjectId
    name: string
    description: string
    created_at: Date
    deleted_at: Date
}
interface Sub_categories {
    _id: ObjectId
    parent_id: string
    name: string
    description: string
    created_at: Date
    deleted_at: Date
}
interface Product {
    _id: ObjectId
    name: string
    description: string
    summary: string
    cover: string
    sku: string
    price: Number
    category_id: string
    created_at: Date
    deleted_at: Date
}
interface Product_skus{
    _id: ObjectId
    product_id: ObjectId
    size_attribute_id: ObjectId
    color_attribute_id: ObjectId
    sku: string
    price: Number
    quantity: Number
    created_at: Date
    deleted_at: Date
}
interface Product_attributes{
    _id: ObjectId
    value: string
    created_at: Date
    deleted_at: Date
}
interface Wishlist{
    _id: ObjectId
    product_id: string
    user_id: string
    created_at: string
    deleted_at: string
}
interface Cart{
    _id: ObjectId
    user_id: ObjectId
    total: Number
    created_at: Date
    deleted_at: Date
}
interface Cart_item {
    _id: ObjectId
    cart_id: ObjectId
    product_id: ObjectId
    product_sku_id: ObjectId
    quantity: Number
    created_at: Date
    deleted_at: Date
}
interface Payment_details{
    _id: ObjectId
    order_id: ObjectId
    amount: Number
    provider: string
    status: string
    created_at: Date
    updated_at: Date
}
interface Order_details{
    _id: ObjectId
    user_id: ObjectId
    payment_id: ObjectId
    total: Number
    created_at: Date
    updated_at: Date
}
interface Order_item {
    _id: ObjectId
    product_id: ObjectId
    product_sku_id: ObjectId
    quantity: Number
    created_at: Date
    updated_at: Date
}