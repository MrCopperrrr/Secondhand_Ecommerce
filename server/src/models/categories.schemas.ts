import { ObjectId } from 'mongodb'

export interface Category {
  _id?: ObjectId
  name: string
  description: string
  created_at?: Date
  deleted_at?: Date
}

export interface SubCategory {
  _id?: ObjectId
  parent_id: ObjectId | string
  name: string
  description: string
  created_at?: Date
  deleted_at?: Date
}
