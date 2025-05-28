import React, {useCallback,useEffect, useContext, useState ,useRef} from 'react';
import Calendar from "react-calendar";
import {useNavigate } from 'react-router-dom';
import {Search} from './Search';
import "./../index.css";
import { LoginContext } from './LoginContext';
import "./Error";
import logo from "./../assets/image/Logo.png";
import foodOrder from "./../assets/image/foodorder.webp"
import background from "./../assets/image/backgroundbus1440x544(1).png";
import FAQAccordion from "./FAQAccordion"
import axios from "axios";

function Home() 
{
  // context for greet
  const {greet} = useContext(LoginContext);
  // states for list for cities
  const [pickupCities, setPickupCities] = useState([]);
  const [dropCities, setDropCities] = useState([]);
  // states for catching a date by user selection
  const [dat,set_dat] = useState(new Date());
  const today = new Date();
  const formatdate = today.toLocaleDateString('en-US',{
    year: 'numeric', // "2023"
    month: 'short',   // "October"
    day: 'numeric'   // "30"
  });
  // states for showing calendar 
  const [ShowCalendar ,SetShowCalendar ] = useState(false);
  // search state & selecting states for pickup and drop cities
  const [Searchcomponent , setsearchcomponent] = useState(false);
  const [Select_option ,SetSelect_option] = useState("");
  const [Select_destiny ,SetSelect_destiny] = useState("");
  // display a date ad string
  const [Ddisplay ,SetDdisplay] = useState(null);
  
  const navi = useNavigate(); 
  // handle the api
  useEffect(() => {
    axios.get('http://localhost:5000/api/locations')
      .then(response => {
        // Note: the keys returned from the API are 'pickupCities' and 'dropCities'
        setPickupCities(response.data.pickupCities);
        setDropCities(response.data.dropCities);
      })
      .catch(error => {
        console.error("Error fetching locations:", error);
      });
  }, []);
  // func for show up calendar
  const handleclick = ()=>
  {
    SetShowCalendar(!ShowCalendar)
    console.log(Select_option)
    console.log(Select_destiny)
  }
  console.log("Type of dat:", typeof dat , "Value:", dat);

  // function for checking input fields and switch b/w search component
  const handleclick_search = ()=>{
    if(!Select_option || !Select_destiny || !Ddisplay){
      navi("*");
    }
    else if(Select_option === Select_destiny){
      navi("*");
    }
    else{
    navi("/Search",
      {state:
        {
          pickupcity:Select_option,
          dropcity:Select_destiny,
          date_of_travel:shortdate(),
          day_of_travel:shortday(),
          exactdate:dat.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
        }})
        setsearchcomponent(!Searchcomponent)
      }
   }
  //  function for changing date in calendar
   const onchange_calendar = useCallback((date,local) => {
      set_dat(date)
      try{
        SetDdisplay(
          dat.toLocaleDateString(local, 
            { year: 'numeric', month: 'short', day: 'numeric' }
          ))
      }catch(err){
        console.log(err)
    }console.log("state date :" ,Ddisplay);
    console.log("dat date :" ,dat);
   },[dat]
);
// function used for prop a date into search component
const shortdate = useCallback(
  () => {
   if(dat){
     return dat.toLocaleDateString("en-US",{ month: 'short', day: 'numeric'});
  }
  return "";
},
  [dat],
);

// function used for prop a day into search component
const shortday = useCallback(
  () => {
   if(dat){
      return dat.toLocaleDateString("en-US",{weekday:"short"});
  }
  return "";
},
  [dat],
)
  // offer scroll bar
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy(
      { 
        left: -500, 
        behavior: "smooth" 
      }
    );
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy(
      { 
        left: 500, 
        behavior: "smooth" 
      }
    );
  };
  
return (
  <div>
    <div>
      {/* home page */}
      <div className='bg-no-repeat bg-cover bg-center h-screen'>
        {/* background for the main search */}
        <img src = {background} 
          alt="background pic" 
          className=' h-full w-full mt-24 object-cover' />
        {/* styling for the heading and below text */}
        <div className='font-rubikWetPaint font-medium tracking-wider z-10 inset-10 -mt-172 text-white text-3xl text-center'>
            <h1>No. 1 Online Bus Ticket Booking Site</h1>
        </div>
        <div className='font-rethinkSans font-extrabold tracking-widest z-10 inset-10 mt-80 text-center text-yellow-500 text-3xl'>
          <h2>Happy Travelling..!!</h2>
        </div>
      </div> 
        {/* Search for buses box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white flex items-center space-x-14 space-y-2 rounded-3xl shadow-lg w-3/4 max-w-2xl px-4 py-4">
            {/* From Department */}
            <div className="flex flex-col">
              <label className="font-rethinkSans text-gray-800 font-bold text-lg tracking-wide">
                From
              </label>
              <select
                id="pickup_cities"
                value={Select_option}
                className="bg-white rounded px-2 py-1 font-oxanium font-medium"
                onChange={(event) => SetSelect_option(event.target.value)}
              >
                <option value="" hidden>{}</option>
                {pickupCities.map((city, index) => (
                  <option className="font-oxanium font-medium" key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Separator */}
            <div className="border-l border-gray-900 h-12"></div>

            {/* To Department */}
            <div className="flex flex-col">
              <label className="font-rethinkSans text-gray-800 font-bold text-lg tracking-wide">
                To
              </label>
              <select
                id="drop_cities"
                value={Select_destiny}
                className="bg-white rounded px-2 py-1 font-oxanium font-medium"
                onChange={(event) => SetSelect_destiny(event.target.value)}
              >
                <option value="" hidden>{}</option>
                {dropCities.map((city, index) => (
                  <option className="font-oxanium font-medium" key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Separator */}
            <div className="border-l border-gray-800 h-12"></div>

            {/* Date Button */}
            <div className="flex flex-col items-center">
              <button onClick={handleclick} className="font-rethinkSans text-gray-800 font-bold text-lg tracking-wide">
                Date
              </button>
              <span className="font-oxanium font-medium text-sm">
                {dat ? dat.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : null}
              </span>
            </div>

            {/* Calendar Popup */}
            {ShowCalendar && (
              <div className="absolute top-80 right-52 z-10 w-80 h-80 rounded-3xl bg-white shadow-lg">
                <Calendar 
                  className="bg-white rounded-lg shadow-lg"
                  onChange={onchange_calendar}
                  value={dat}
                  minDate={new Date()}
                  calendarType="gregory"
                />
              </div>
            )}

            {/* Separator */}
            <div className="border-l border-gray-100 h-12"></div>

            

            {/* Optionally render search component */}
            {Searchcomponent && (<Search />)}
          </div>
          {/* Search Button */}
          <div className="bg-red-600 hover:bg-red-700 w-52 flex items-center justify-center rounded-3xl p-8 ml-1">
              <button onClick={handleclick_search} className="text-white font-bold font-rethinkSans text-lg">
                SEARCH BUSES
              </button>
            </div>
        </div>


      {/* offer box container */}
        <div className= 'container -mt-8 max-w-1000px mx-32 p-4 rounded-3xl relative bg-gray-100 h-auto'>
          <h2 className="text-xl font-bold mb-4">Trending Offers</h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Button */}
          <button onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 
            rounded-full shadow-md hover:bg-gray-400"
          > ⇦
          </button>

          {/* Right Button */}
          <button onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white  p-3 
            rounded-full shadow-lg shadow-black hover:bg-gray-400"
          > ⇨ 
          </button>

          {/* Carousel Content */}
          <div
            ref={carouselRef}
            className="carousel-container flex overflow-x-auto scroll-smooth space-x-4 p-4 hide-scrollbar"
          >
            {/* Slide Item 1 */}
            <div className="flex-none w-60 h-40 bg-gradient-to-r from-blue-900 to to-blue-700 rounded-lg text-white p-4">
              <h3 className="text-lg font-semibold">Save up to Rs 250</h3>
              <p>Valid till 31 Jan</p>
            </div>
            {/* Slide Item 2 */}
            <div className="flex-none w-60 h-40 bg-gradient-to-r from-green-900 to-green-700 rounded-lg text-white p-4">
              <h3 className="text-lg font-semibold">Save up to Rs 300</h3>
              <p>Valid till 31 Jan</p>
            </div>
            {/* Slide Item 3 */}
            <div className="flex-none w-60 h-40 bg-gradient-to-r from-red-900 to-red-700 rounded-lg text-white p-4">
              <h3 className="text-lg font-semibold">Save Rs 300</h3>
              <p>Valid till 31 Jan</p>
            </div>
            {/* Slide Item 4 */}
            <div className="flex-none w-60 h-40 bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg text-white p-4">
              <h3 className="text-lg font-semibold">Save Rs 200</h3>
              <p>Valid till 31 Jan</p>
            </div>
          </div>
        </div>
        {/* Inline CSS for hiding scrollbar */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}
        </style>
      </div><br/>
      {/* food detail ad */}
      <div className="flex space-x-4">
        {/* food description */}
        <div className="w-2/4 p-6 ml-20 ">
          {/* for heaiding ad */}
          <div className="uppercase text-4.5xl font-rethinkSans font-extrathin tracking-wide leading-normal">
            <h2>now, TURN YOUR BUS   
              <span className ="font-extrabold"> JOURNEY INTO A FEAST </span>with <br></br>BUSCONNECT!
            </h2>
          </div><br/>
          {/* logo with food side heading */}
          <div className="p-4 font-oxanium font-medium text-lg  text-red-600">
            <img src={logo} alt ="Logo" className="max-w-14 max-h-14 min-h-10 min-w-10 ml-4"></img>
            <p className='-mt-8 ml-24 '>Food Order</p>
            <div className="border-1.5 border-red-600 w-56 mt-3"></div><br/>
            {/* food detail descript */}
            <div className='text-black p-4 tracking-wide'>
              <p>Book your favorite meals with BusConnect! 
                Quick and easy food pre-ordering —delivered fresh at your bus stop 
              </p>
            </div>
          </div>
        </div>   
        {/* food logo */}
        <div className="w-2/4 max-w-172 max-h-172  ">
            <img src={foodOrder} alt='Image' className='rounded-lg'/>
        </div>
      </div>
      <div>
        <FAQAccordion/>
      </div>
    </div>
  </div>
  )
}

export default Home
                 
 