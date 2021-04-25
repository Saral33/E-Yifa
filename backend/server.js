import dotenv from 'dotenv';
import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRoutes.js'
import {notFound,errorHandler} from './middleware/errorHandler.js'
import morgan from 'morgan';

const app = express()
dotenv.config();
connectDB()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/uploads',uploadRoute)

app.get('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`App is running on port ${PORT}`.magenta.bold))


