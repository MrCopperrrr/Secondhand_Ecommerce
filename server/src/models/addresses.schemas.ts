import { ObjectId } from "mongodb"
interface AddressType{
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
export class Address {
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
    constructor(address: AddressType){
        this._id=address._id
        this.user_id= address.user_id
        this.tittle= address.tittle
        this.address_line_1= address.address_line_1
        this.city=address.city
        this.ward= address.ward
        this.phone_number= address.phone_number
        this.created_at= address.created_at
    }
}
