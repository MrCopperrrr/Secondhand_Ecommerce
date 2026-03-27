import { MongoClient, Db, Collection } from 'mongodb'
import 'dotenv/config'
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@2hand.kgjhxgg.mongodb.net/?appName=2hand`
if(!uri){
    console.error("Error: MONGODB_URI isn't exist in .env file")
    process.exit(1)
}
class DatabaseService{
    private client: MongoClient
    private db: Db
    constructor(){
        this.client= new MongoClient(uri)
        this.db= this.client.db(process.env.DB_NAME)
    }
    async connect(){
        try {
          await this.client.connect()
        // Send a ping to confirm a successful connection
        await this.db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(err) {
        // Ensures that the client will close when you finish/error
        console.error("Error in connecting to database: ", err)
        throw err
      }
      }
}
const databaseService = new DatabaseService ()
export default databaseService