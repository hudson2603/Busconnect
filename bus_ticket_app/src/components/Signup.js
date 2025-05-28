import React, { useContext, useState } from 'react';
import "./../assets/css/LoginButton.css";
import { Link } from 'react-router-dom';
import {signupUser} from "./../api";
import { LoginContext } from './LoginContext';

const Signup = ({UpdateSignupState}) => {
  // Function for signup close
  const SignupClose = () =>{
    UpdateSignupState((prev)=>!prev)
  }
  const [username,setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const {closewind} = useContext(LoginContext)

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser(username,email, password);
      console.log("Sending signup request with:", email, password);
      console.log(data);
       // Automatically store the token and consider the user logged in
       localStorage.setItem("token", data.token);
       alert("Signup successful and logged in!");
       window.location.reload(); // Refresh to reflect login state
      // Optionally, clear the form or redirect
      closewind();
    } catch (error) {
      alert(error.message || "Signup failed!");
    }
  };
  return (
    <div id="login" className="w-96 h-auto bg-red-50 rounded shadow flex flex-col justify-between p-3">       
      <form className="text-indigo-500" onSubmit={handleSignup} action method="post">
        <fieldset className="border-4 border-dotted border-indigo-500 p-5">
          <legend className="px-2 italic -mx-2">Welcome again!</legend>
          {/* Username field */}
          <label className="text-xs font-bold after:content-['*'] after:text-red-500" htmlFor="name">Enter the Username </label>     
          <input 
          className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" 
          type="text" value={username}
          onChange={(event)=> setusername(event.target.value)} required />  
          {/* Gmail Field */}
          <label className="text-xs font-bold after:content-['*'] after:text-red-500" htmlFor="email">Enter the Gmail </label>     
          <input 
          className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" 
          type="email" value={email}
          onChange={(event)=> setEmail(event.target.value)} required />   
          {/* passsword Field */}
          <label className="text-xs font-bold after:content-['*'] after:text-red-500" htmlFor="password">Password</label>
          <input 
          className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" 
          type="password" value={password} 
          onChange={(event)=>setPassword(event.target.value)} required />
          
          <label className="text-xs font-bold after:content-['*'] after:text-red-500" htmlFor="password">Confirm Password</label>
          <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="password" required />
          
          {/* <a href="#" className="block text-right text-xs text-indigo-500 mb-4">Forgot Password?</a> */}
          <button className="LoginButton" type='submit'>Sign up</button>

          {/* Separator */}
          <div className="border-l border-gray-900 w-12 mx-4"></div>
          {/* For new user sign up field */}
              <p>Already have an account?</p>
              <button className='text-blue-700 underline' onClick={SignupClose}>Login</button>
          
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

export default Signup;
