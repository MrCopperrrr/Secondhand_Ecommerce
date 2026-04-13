
import 'dotenv/config';
import cors from 'cors';
import { userRouter } from './src/routes/users.routes'
import { productRouter } from './src/routes/products.routes'
import categoriesRouter from './src/routes/categories.routes'
import commonRouter from './src/routes/common.routes'
import paymentRouter from './src/routes/payment.routes.js'
import orderRouter from './src/routes/orders.routes.js'
import express from 'express'
import databaseService from './src/services/database.services'
import transactionRouter from './src/routes/transactions.routes.js'
import adminRouter from './src/routes/admin.routes'
const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/categories', categoriesRouter)
app.use('/common', commonRouter)
app.use('/payments', paymentRouter)
app.use('/orders', orderRouter)
app.use('/transactions',transactionRouter)
app.use('/admin', adminRouter)
databaseService.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running accurately at: http://localhost:${port}`)
    })
}).catch(err => {
    console.error("Critical error starting server:", err)
})