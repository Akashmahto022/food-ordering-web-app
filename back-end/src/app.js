import express from 'express'
import cors from 'cors'
import foodRouter from './routes/food.route.js'
import userRouter from './routes/user.Route.js'

const app = express()

// middlerware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/food', foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)


app.get('/', (req,res)=>{
    res.send('Hello Akash Mahto')
})
app.get('/name', (req,res)=>{
    res.send('Rahul')
})
app.get('/api', (req,res)=>{
    res.send('Hello Akash Mahto /api worked')
})

export {app}
