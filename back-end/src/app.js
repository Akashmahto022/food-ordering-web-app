import express from 'express'
import cors from 'cors'
import foodRouter from './routes/food.route.js'
import userRouter from './routes/user.Route.js'
import cartRouter from './routes/cart.Route.js'

const app = express()

// middlerware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/food', foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use("/api/cart", cartRouter)


app.get('/', (req,res)=>{
    res.send('Hello Akash Mahto')
})

export {app}
