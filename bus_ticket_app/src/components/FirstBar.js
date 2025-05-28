import React from 'react'
import { useState ,useContext ,useEffect} from 'react';
import { Link ,useLocation , useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import Logo from "./../assets/image/Logo.png";
import UserLogo from "./../assets/image/userLogo.png"
import { LoginContext } from './LoginContext';
import Form from './Form';
import { IoClose } from "react-icons/io5"; 
import Signup from './Signup';


function FirstBar() {
  // access of states using userlogin context
  const {popout,openloginmodal,
    closewind,username,
    setusername,password,
    setpassword,inputcheck,
    strongpass,setpopout} = useContext(LoginContext);
  
    // navigate variable declaration
  const navigate = useNavigate();
  Modal.setAppElement('#root')
  
  // state and function for signup indication
  const [SignupState ,SetSignupState] = useState(false);
  // fetch user
  const [user, setUser] = useState(null);
// Checking a user is Authenticated
const [isAuthenticated, setIsAuthenticated] = useState(false);
  // route the privacy and term page
  const location = useLocation();
  
  // For Switching a component 
  useEffect(() => {
    if(location.pathname === '/Privacy' || location.pathname === '/Terms'){
      setpopout(false)
    }
    if (popout) {document.body.style.overflow = 'hidden';} 
    else {document.body.style.overflow = 'auto';}
    return () => {document.body.style.overflow = 'auto';};
  }, [setpopout,location,popout]);
  
  //For the Fetch user for the login
  useEffect(() => {
   
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); //Get token from localStorage
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        try{
        const response = await fetch("http://localhost:5000/api/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, //  Send token in request
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data); // Store user data
            console.log(user)
            setIsAuthenticated(true);

        } else {
            console.error("Error fetching user data: " + data.message);
            setIsAuthenticated(false);
        }
      }
      catch (error) {
          console.error("Fetch user error:", error);
          setIsAuthenticated(false);
        }
    };
    fetchUser();
}, []); 
  // Logout Indication
  const handleLogout = () => {
    localStorage.removeItem("token"); //Remove token
    alert("Logged out successfully");
    window.location.reload(); // Refresh to reflect logout state
};
  
  return (
    <div>
        <nav className={`bg-white rounded-b-md fixed z-10 top-0 shadow:md w-full px-8 py-1 h-24 shadow-md shadow-gray-500 `}>
            {/* Logo  */}
            <Link to="/">
              <img src={Logo} alt='Logo' className ='max-w-24 max-h-20 absolute py-1 left-12' />
            </Link>
            {/* bt for contact , about, userlogin */}
          <div className='container justify-end flex mt-8 px-12 space-x-8 font-oxanium font-bold'>
            {isAuthenticated && 
              (<button onClick={handleLogout}>Logout</button> 
            )}
            <Link to="/Contact" >Contact</Link>
            <Link to="/About">About</Link>
          {/* Conditional Profile button if logged in */}
            {isAuthenticated && user ? (
            <button onClick={() => navigate("/profile")} >
              <img src={UserLogo} alt='UserLogo' className='max-w-10 max-h-10 absolute opacity-90 top-8' />
              <span className='px-10 hover:text-red-900 top-6'>My Profile</span>
            </button>
          ) : (
            <button onClick={openloginmodal}>
              <img src={UserLogo} alt='UserLogo' className='max-w-10 max-h-10 absolute opacity-90 top-8' />
              <span className='px-10 hover:text-red-900 top-6'>Login</span>
            </button>
          )}
          </div>
        </nav>
        {/* Popout properties */}
        
        <div>
        <Modal 
        isOpen={popout} 
        onRequestClose={closewind}
        className='fixed inset-0 justify-center flex items-center z-50'
        overlayClassName='fixed inset-0 bg-black bg-opacity-50 z-40'
        >
      
        <div className='relative z-auto  bg-gray-100 rounded-lg shadow-lg transform -translate-x-1 translate-y-7'>
          {/* Close Button (Cross Icon) */}
            <button
            onClick={closewind}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
            >
              <IoClose size={24} />
            </button>
          {SignupState ? 
          <Signup UpdateSignupState ={SetSignupState} />
          :
          <Form UpdateSignupState = {SetSignupState}/>}
          
        </div>
      </Modal>
    </div>
  </div>
  )
}

export default FirstBar