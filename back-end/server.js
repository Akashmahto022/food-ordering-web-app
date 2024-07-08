import {app} from './app.js'

const port = 4000


app.listen(process.env.PORT || port,()=>{
    console.log(`server running at http://localhost:${port}`)
})
