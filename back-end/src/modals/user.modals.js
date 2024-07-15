import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {

        userName :{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        cartData:{
            type: Object,
            default:{}
        }
    },{timestamps:true, minimize:false})

export const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema)

