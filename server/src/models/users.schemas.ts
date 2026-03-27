import {ObjectId} from 'mongodb'
interface User{
    _id: ObjectId
    avatar: string
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
    date_of_birth: Date
    phone_number: string
    created_at: Timestamp
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
    created_at: Timestamp
}
interface Categories{
    _id: ObjectId
    name: string
    description: string
    created_at: Timestamp
    deleted_at: Timestamp
}
interface Sub_categories {
    _id: ObjectId
    parent_id: string
    name: string
    description: string
    created_at: Timestamp
    deleted_at: Timestamp
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
    created_at: Timestamp
    deleted_at: Timestamp
}
interface Product_skus{
    _id: ObjectId
    product_id: ObjectId
    size_attribute_id: ObjectId
    color_attribute_id: ObjectId
    sku: string
    price: Number
    quantity: Number
    created_at: Timestamp
    deleted_at: Timestamp
}
interface Product_attributes{
    _id: ObjectId
    value: string
    created_at: Timestamp
    deleted_at: Timestamp
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
    created_at: Timestamp
    deleted_at: Timestamp
}
interface Cart_item {
    _id: ObjectId
    cart_id: ObjectId
    product_id: ObjectId
    product_sku_id: ObjectId
    quantity: Number
    created_at: Timestamp
    deleted_at: Timestamp
}
interface Payment_details{
    _id: ObjectId
    order_id: ObjectId
    amount: Number
    provider: string
    status: string
    created_at: Timestamp
    updated_at: Timestamp
}
interface Order_details{
    _id: ObjectId
    user_id: ObjectId
    payment_id: ObjectId
    total: Number
    created_at: Timestamp
    updated_at: Timestamp
}
interface Order_item {
    _id: ObjectId
    product_id: ObjectId
    product_sku_id: ObjectId
    quantity: Number
    created_at: Timestamp
    updated_at: Timestamp
}