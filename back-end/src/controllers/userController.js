import { UserModel } from "../modals/user.modals.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.json({ success: false, message: "Wrong Password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET
  );
};

// register User

const registerUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const exists = await UserModel.findOne({ email });
    // checking is user already exists
    if (exists) {
      return res.json({
        success: false,
        message: "User all ready exists",
      });
    }

    // validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    // hashing user password
    const hashPassword = await bcrypt.hash(password, 10);

    // creating new user
    const newUser = new UserModel({
      userName: userName,
      email: email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { loginUser, registerUser };
