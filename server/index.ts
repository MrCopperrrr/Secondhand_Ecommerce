import express from 'express'
import databaseService from './src/services/database.services.js'
const app = express()
const port= 4000

app.use(express.json())
databaseService.connect()
app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`)
})