import 'dotenv/config';
import cors from 'cors';
import { userRouter } from './src/routes/users.routes'
import { productRouter } from './src/routes/products.routes'
import express from 'express'
import databaseService from './src/services/database.services'
const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
app.use('/products', productRouter)
databaseService.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running accurately at: http://localhost:${port}`)
    })
}).catch(err => {
    console.error("Critical error starting server:", err)
})