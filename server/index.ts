
import 'dotenv/config';
import cors from 'cors';
import { userRouter } from './src/routes/users.routes.js'
import { productRouter } from './src/routes/products.routes.js'
import categoriesRouter from './src/routes/categories.routes.js'
import commonRouter from './src/routes/common.routes.js'
import paymentRouter from './src/routes/payment.routes.js'
import orderRouter from './src/routes/orders.routes.js'
import express from 'express'
import databaseService from './src/services/database.services.js'
import transactionRouter from './src/routes/transactions.routes.js'
import adminRouter from './src/routes/admin.routes.js'
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
}).catch((err: any) => {
    console.error("Critical error starting server:", err)
})

app.use(cors({
  // Thay link này bằng link Static Site bạn nhận được từ Render
  origin: ['http://localhost:3000', 'https://secondhand-ecommerce-client.onrender.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Cho phép gửi cookie/header Authorization nếu cần
}));