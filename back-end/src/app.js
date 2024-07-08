import express from 'express'
import cors from 'cors'

const app = express()

// middlerware
app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.send('Hello Akash Mahto')
})
app.get('/name', (req,res)=>{
    res.send('Rahul')
})
app.get('/api', (req,res)=>{
    res.send('Hello Akash Mahto')
})

export {app}
