import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'


const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({
    storage:storage
})

foodRouter.post("/addfood", upload.single('image'),addFood)
foodRouter.get("/getallfoods",listFood)
foodRouter.post("/removefood",removeFood);

export default foodRouter

