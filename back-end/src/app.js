import express from 'express'
import cors from 'cors'
import foodRouter from './routes/food.route.js'
import userRouter from './routes/user.Route.js'
import cartRouter from './routes/cart.Route.js'
import orderRouter from './routes/order.Route.js'

const app = express()

// middlerware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/food', foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get('/', (req,res)=>{
    res.send('Hello Akash Mahto')
})
app.get('/name', (req,res)=>{
    res.send('I am Akash Mahto')
})

export {app}
