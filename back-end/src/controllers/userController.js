import { UserModel } from "../modals/user.modals";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator";


//login user
const loginUser = async(req, res)=>{

}

// register User

const registerUser = async(req, res)=>{
    const {userName, password, email} = req.body;
        try {
            const exists = await UserModel.findOne({email})
            // checking is user already exists
            if (exists) {
                return res.json({success: false, message: "User all ready exists"})
            }

            // validating email format and strong password

            if (!validator.isEmail(email)) {
                return res.json({success: false, message: "please enter a valid email"})
            }

            if (password.length<8) {
                return res.json({success: false, message: "please enter a strong password"})
            }

            // hashing user password
            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = new UserModel({
                name: name,
                email: email,
                password:hashPassword
            })

            if (user) {
                const user = await newUser.save()
            }

        } catch (error) {
            
        }
}


export {loginUser, registerUser}