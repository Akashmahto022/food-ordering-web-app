import React, { useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
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
            <input type="text" placeholder="Your Name" required />
          ) : (
            <></>
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="password" required />
        </div>
        <button>
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
