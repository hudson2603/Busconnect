import React from 'react';
import Home from './components/Home';
import {Search} from './components/Search';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Error from "./components/Error";
import Book from "./components/Book";
import FirstBar from './components/FirstBar';
import Payment from './components/Payment';
import Profile from './components/Profile';
import Ticket from './components/Ticket';
import BottomBar from './components/BottomBar';


function Manipulate() {
  
  return (
    <Router>
          <FirstBar/>      
        <Routes>
              <Route path="/" element = {<Home/>}></Route>
              <Route path="/Search" element = {<Search/>}></Route>
              <Route path="/Contact" element ={<Contact/>}></Route>
              <Route path="/About" element ={<About/>}></Route>
              <Route path="/Privacy" element={<Privacy/>}></Route>
              <Route path="/Terms" element={<Terms/>}></Route>
              <Route path="*" element={<Error/>}></Route>
              <Route path="/Book" element={<Book/>} ></Route>
              <Route path="/Payment" element={<Payment/>} ></Route>
              <Route path="/Profile" element={<Profile/>} ></Route>
              <Route path="/Ticket" element={<Ticket/>} ></Route>
        </Routes>
          <BottomBar/>
    </Router>
    
  )
}

export default Manipulate