import React from 'react'
import { createContext ,useState ,useCallback } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({children})=> {
  
    // State for popout and username in first bar component
  const [popout ,setpopout] = useState(false);
  const [username ,setusername] = useState("");
  // first bar password and input field check
  const [password , setpassword] = useState("");  
  const [inputcheck , setinputcheck] = useState(null);
    // state for strong pass
  const [strongpass ,setstrongpass]  = useState(null);
  // state for greetings
   const [greet , setgreet] = useState(null);
  
    // Button function for popout  
    const openloginmodal = useCallback(() => setpopout(true),[]);
  // func for close login screen
  const closewind = useCallback(()=>{
    setpopout(false);
    setinputcheck(null);
    setusername(null);
    setpassword(null);
},[password,username]);

  return (
    <LoginContext.Provider 
    value={{
        popout,
        openloginmodal,
        closewind,
        username,
        setusername,
        password,
        setpassword,
        inputcheck,
        setinputcheck,
        strongpass,
        greet,
        setstrongpass,
        setpopout
        
    }}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider