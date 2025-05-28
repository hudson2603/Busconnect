import React from 'react';
import logo from './../assets/image/Logo.png';
import Socialmedia from "./Socialmedia";
function BottomBar() {

  return (
    <footer>
      <div className='bg-gradient-to-r from-white to-red-50 p-4 mt-2 rounded-t-md relative border-t-1.5 border-gray-300 shadow-md shadow-gray-100'>
        <div className="flex w-full h-auto container p-2">
            {/* Logo and description */}
            <div className="w-4/12 container flex flex-col px-4">
                <div  className=''>    
                    <img src={logo} alt='Logo' className='w-32 h-32' />
                </div>
                <div>
                    <p className="text-justify font-oxanium " style={{ wordSpacing: '0.2rem' }}>
                        HuonBus is the world's largest online bus  
                        ticket booking service trusted by over 
                        25 million happy customers globally.    
                        HuonBus offers bus ticket booking through  
                        its website, iOS and Android mobile     
                        apps for all major routes.
                    </p>
                </div>
            </div>

            {/* Popular cities description */}
            <div className="w-3/12 container flex flex-col items-center px-4 text-justify">
                <h4 className="text-lg font-semibold mb-2 font-rethinkSans">Popular Cities</h4>
                <p className="space-y-2 font-oxanium ">
                Coimbatore Bus Ticket Booking <br />
                Bangalore Bus Ticket Booking <br />
                Chennai Bus Ticket Booking <br />
                Pune Bus Tickets Booking <br />
                Delhi Bus Ticket Booking <br />
                Mumbai Bus Ticket Booking <br />
                Vijayawada Bus Ticket Booking
                </p>
            </div>

            {/* Info */}
            <div className="w-3/12 container flex flex-col px-4 items-center ">
                <h4 className="text-lg font-semibold mb-2 font-rethinkSans">Info</h4>
                <p className="space-y-2 text-center font-oxanium">
                T&C <br />
                Privacy policy <br />
                FAQ <br />
                Agent registration <br />
                Insurance partner <br />
                User agreement
                </p>
            </div>

            {/* Partners */}
            <div className="w-2/12 container flex flex-col px-4 items-center">
                <h4 className="text-lg font-semibold mb-2 font-rethinkSans">Our Partners</h4>
                <p className="space-y-2 text-justify font-oxanium">
                AXY Bus <br />
                AXY Hotels <br />
                TravelTrip Hotels
                </p>
            </div>
        </div>
        {/* Separator */}
            <div className="border border-gray-800 w-auto mx-4"></div>
        {/* trademark and social media*/}
        <div className='p-2 mx-4 font-rethinkSans flex w-full'>
            <div className = "w-3/4">
                Ⓒ 2024 HuonBus India Pvt Ltd. All rights reserved
            </div>
            <div className = "w*1/4 ">
                <Socialmedia/>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default BottomBar