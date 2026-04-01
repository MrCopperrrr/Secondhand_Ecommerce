import cors from 'cors';
import { userRouter } from './src/routes/users.routes';
import express from 'express'
import databaseService from './src/services/database.services.js'
const app = express()
const port= process.env.PORT
app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
databaseService.connect()
app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`)
})