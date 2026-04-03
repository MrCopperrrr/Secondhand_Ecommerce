import 'dotenv/config';
import cors from 'cors';
import { userRouter } from './src/routes/users.routes';
import express from 'express'
import databaseService from './src/services/database.services'
const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use('/users', userRouter)
databaseService.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running accurately at: http://localhost:${port}`)
    })
}).catch(err => {
    console.error("Critical error starting server:", err)
})