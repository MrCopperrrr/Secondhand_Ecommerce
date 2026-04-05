import { MongoClient, Db, Collection } from 'mongodb'
import 'dotenv/config'
import  User from '../models/users.schemas.js'
import Product from '../models/products.schemas.js'
import { RefreshToken } from '../models/users.schemas.js'
const username = process.env.DB_USERNAME?.trim()
const password = process.env.DB_PASSWORD?.trim()
const dbName = process.env.DB_NAME?.trim()

const uri = process.env.MONGODB_URI ||`mongodb+srv://${username}:${password}@2hand.kgjhxgg.mongodb.net/?appName=2hand`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    // Sử dụng tên DB từ file .env
    this.db = this.client.db(dbName)
  }

  async connect() {
    try {
      await this.client.connect()
      await this.db.command({ ping: 1 })
      console.log(`Pinged your deployment. You successfully connected to MongoDB!`)
    } catch (err) {
      console.error("Error in connecting to database: ", err)
      throw err
    }
  }
  get users(): Collection<User>{
    return this.db.collection('users')
  }
  get products(): Collection<Product>{
    return this.db.collection('products')
  }

  // Getter để lấy instance của database khi cần dùng 
  get database(): Db {
    return this.db
  }
  get refreshTokens(): Collection<RefreshToken> {
  return this.db.collection('refresh_tokens')
}
  get addresses(): Collection<any> {
    return this.db.collection('addresses')
  }
  get address(): Collection<any> {
    return this.db.collection('address')
  }
  get categories(): Collection<any> {
    return this.db.collection('categories')
  }
  get subCategories(): Collection<any> {
    return this.db.collection('sub_categories')
  }
  get provinces(): Collection<any> {
    return this.db.collection('provinces')
  }
}

const databaseService = new DatabaseService()
export default databaseService