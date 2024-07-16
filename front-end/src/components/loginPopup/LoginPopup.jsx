import React, {useState, useContext } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken, token} = useContext(StoreContext)
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data , setData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const onChangeHandler =(e)=>{
    const name = e.target.name
    const value = e.target.value
    setData({...data,[name]:value})
  }

  const onLogin = async(e)=>{
    e.preventDefault()
    let newUrl = url
    if (currentState==="Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    console.log(newUrl)

    const response = await axios.post(newUrl, data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Sign Up" ? (
            <input type="text" name="userName" onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />
          ) : (
            <></>
          )}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="password" required />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing i agree to the term and condition</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account? <span onClick={()=>setCurrentState('Sign Up')}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account ? <span  onClick={()=>setCurrentState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
