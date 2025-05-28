import React, { createContext, useCallback, useContext,useState } from 'react';
import { LoginContext } from './LoginContext';
import { Link, useNavigate } from 'react-router-dom';
import "./../assets/css/LoginButton.css";
import  "./../assets/css/ShowPass.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {loginUser} from "./../api";

const Form = ({UpdateSignupState}) => {
  // access of states using userlogin context
  const {popout,openloginmodal,
      closewind,username,
      setusername,password,
      setpassword,inputcheck,
      strongpass,setpopout,setinputcheck,setstrongpass} = useContext(LoginContext);
  // states for show password
  const [showpassword ,setshowpassword] = useState(false);
    // state for local signup indication
    const [SignupState ,SetSignupState] = useState(false);
  
  // Function for signup
  const signupFunction = useCallback(() => {SetSignupState(true)},[])

  //Login close function 
  const loginclose = () => { 
    // setpopout(false);
    signupFunction();
    SetSignupState((prev)=>!prev);
    UpdateSignupState((prev)=>!prev);
  }
  // login handleclick function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("token", data.token); // Store token in localStorage
      alert("Login successful!");
      window.location.reload(); // Refresh to reflect login state
      closewind();
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };
    return (
    <div id="login" className="w-96 h-auto bg-red-50 rounded shadow flex flex-col justify-between p-3">       
       {/*  */}
      <form className="text-indigo-600 font-rethinkSans"  onSubmit={handleLogin} action method="post">
        <fieldset className="border-4 border-dotted border-red-500 p-5">
          <legend className="px-2 italic text-blue-800 text-lg -mx-2">Welcome again!</legend>
          {/* logo  */}

          {/* Gmail ID */}
          <label className="text-sm font-bold tracking-wide after:content-['*'] after:text-red-400" htmlFor="email">
            Enter Your Gmail 
          </label>     
          <input className="w-72 p-2 mb-2 mt-1 outline-none ring-none font-oxanium text-gray-800 focus:ring-2 focus:ring-indigo-500" 
            type="email" required  placeholder='Enter Gmail'
            value={username} 
            onChange={(event)=>setusername(event.target.value)}/>   
          
          {/* Password Field */}
          <label className="text-sm font-bold tracking-wide after:content-['*'] after:text-red-400" htmlFor="password">Enter Your Password</label>
          <input className="w-72 p-2 mb-2 mt-1 outline-none font-oxanium text-gray-800 ring-none focus:ring-2 focus:ring-indigo-500" 
          type={showpassword ?
            "text" : "password"
          } required
          placeholder='Enter Password'
          value={password}
          onChange={(event)=>{setpassword(event.target.value)}}  />
          {/* <label htmlFor='check' >Show password</label> */}
          {/* Password Toggle Button */}
          <button
          type="button"
          className="ShPass"
          onClick={() => setshowpassword((prev) => !prev)}>
            {showpassword ?  <FaEye className="eye"/> : <FaEyeSlash className="eye-slash" />}
          </button>
          
          {/* login Button */}
          <button type='submit' className='LoginButton'>Login</button>
            
            {/* Separator */}
            <div className="border-1 border-gray-400 w-12 mx-4"></div>
          {/* For new user sign up field */}
              <p>Don't have an account?</p>
              <button className='text-blue-700 underline' onClick={loginclose}>Signup</button>
          
          {/* Terms and conditons field */}
          <div className='w-full text-center mt-4'>
            <p className="text-sm text-gray-500 leading-tight ">By signing up, you agree to our <br/> 
            <Link to="/Terms" 
            className='text-blue-700 text-base font-semibold hover:underline' > Terms & Conditions
            </Link> and 
            <Link to="/Privacy" className='text-blue-700 text-base font-semibold hover:underline'> Privacy Policy 
            </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;

