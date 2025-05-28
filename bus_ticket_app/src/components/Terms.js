import React from 'react';
import FirstBar from './FirstBar';
function Terms() {
  return (
    <div>
      {/* main heading div */}
      <div className='mt-28 ml-28 mr-28 p-3'>
          <h2 className='text-red-700 text-2xl font-rethinkSans font-bold'>IMPORTANT : ADHERE TO STATE GUIDELINES</h2>
          <p className='font-rethinkSans text-gray-700'>
            Most states have released their own guidelines 
            for inbound and outbound travellers vis-a-vis passes, permits, 
            quarantine rules and other requirements. Please go through the 
            guidelines of your source and destination state carefully before planning your travel, 
            for a hassle-free experience.
          </p>
      </div>
      <br/>
      {/* terms of service  */}
      <div className='mr-28 ml-44 p-3' >
          <h2 className='text-red-700 text-2xl font-rethinkSans font-bold underline text-center'>TERMS OF SERVICE</h2>
          {/* bus --> first division */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold'>1.BUS</p>
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold ml-11'>1.1 ROLE OF HUON BUS</p>
          {/* Role of bus */}
          <div className='p-3 mr-28 ml-20 tracking-wide text-gray-700 font-oxanium leading-5 whitespace-normal text-justify'>
              <p> 
                1.1.1 HuonBus only provides a technology platform that connects intending travelers 
                with bus operators. It doesn’t operate any bus or offer the service of 4
                transportation to the User. HuonBus also doesn’t act as an agent of any 
                bus operator in the process of providing the above-mentioned technology 
                platform services.
                <br/><br/>
                1.1.2 The bus ticket booking voucher which HuonBus issues to a User is 
                solely based on the information provided or updated by the bus operator regarding 
                the seat availability.
                <br/><br/>  
                1.1.3 The amenities, services, routes, fares, schedule, bus type, seat availability 
                and any other details pertaining to the bus service are provided by the respective 
                bus operator and HuonBus has no control over such information provided by the bus operator.
              </p>
              <br/>
          </div>
          {/* Limitations */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold ml-11'>1.2 LIMITATION OF LIABILITY OF HUONBUS</p>
          <div className='p-3 mr-28 ml-20 tracking-wide text-gray-700 leading-5 font-oxanium whitespace-normal text-justify'>
              <p>
                1.2.1 Timely departure or arrival of the bus;
                <br/><br/>
                1.2.2 The conduct of bus operator's employees, representatives or agents;
                <br/><br/>
                1.2.3 The condition of the bus, seats etc. not being up to the customer's 
                expectation or as per the description provided by the bus operator;
                <br/><br/>
                1.2.3 Cancellation of the trip due to any reasons;
                <br/><br/>
                1.2.4 Loss or damage of the baggage of the customer;
                <br/><br/>
                1.2.5 The bus operator changing a customer's seat for any reason whatsoever;
                <br/><br/>
                1.2.6 Bus operator informing a wrong boarding point for the issuance of the booking confirmation voucher, 
                or changing such boarding point eventually with or without any notification to Huonbus or the User;
                <br/><br/>
                1.2.7 Bus operator using a separate pick-up vehicle to transport the User from the designated boarding 
                point to the actual place of departure of the bus.
              </p>
              <br/>
          </div>
          {/* responsbility of user */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold ml-11'>1.3 RESPONSIBILITIES OF THE USERS</p>
          <div className='p-3 mr-28 ml-20 tracking-wide text-gray-700 leading-5 font-oxanium whitespace-normal text-justify'>
              <p>
                  1.3.1 Users are advised to call the bus operator to find out the exact boarding point, or any information which 
                  they may need for the purpose of boarding or travel in that trip.
                  <br/><br/>
                  1.3.2 At the time of boarding the bus, Users shall furnish a copy of the ticket, and any valid identity proof 
                  like aadhar card, passport, PAN card or voter identification card or any other identity proof issued by a 
                  government authority.
                  <br/><br/>
                  1.3.3 Users are required to reach the boarding place at least 30 minutes before the scheduled departure time.
                  <br/><br/>
                  1.3.4 All tickets issued shall be non-transferable.
                </p>
                <br/>
          </div>
          {/* cancel of ticket */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold ml-11'>1.4 CANCELLATION OF TICKETS</p>
          <div className='p-3 mr-28 ml-20 tracking-wide text-gray-700 leading-5 font-oxanium whitespace-normal text-justify'>
              <p>
                  1.4.1 Cancellation of tickets can be done either through the User’s login in the HuonBus’s website or 
                  mobile application, or by calling on the customer care number;
                  <br/><br/>
                  1.4.2 Any cancellation is subject to such cancellation charges as mentioned on the ticket.
              </p>
              <br/>
          </div>
          {/* reschedule of ticket */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold ml-11'>1.5 RESCHEDULING OF TICKET</p>
          <div className='p-3 mr-28 ml-20 tracking-wide text-gray-700 leading-5font-oxanium whitespace-normal text-justify'>
              <p>
                  1.5.1 Rescheduling (i.e. change of date of travel) of the tickets can be done through the User’s login in the 
                  HuonBus’s website or mobile application, or by reaching out to the customer support team;
                  <br/><br/>
                  1.5.2 Rescheduling is an option provided only by select bus operators. The policy for the same shall be available
                  on the e-ticket.
                  <br/><br/>
                  1.5.3 Rescheduling a ticket is subject to charges as mentioned on the e-ticket. Fare difference, if applicable, 
                  shall be borne by the customer. However, if the fare of the rescheduled ticket is lower than 
                  the current fare, the fare difference shall not be refunded.
                  <br/><br/>
                  1.5.4 Rescheduling a ticket can be availed only once per booking, if applicable. Once the travel date change 
                  option is availed, the ticket cannot be further canceled.
                  <br/><br/>
                  1.5.5 Tickets are non-transferrable and the originally booked passengers are to travel upon such rescheduling.
              </p>
              <br/>
          </div>
          {/* payments --> second division */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold'>2.PAYMENTS</p>
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold ml-11'>2.1 ADDITIONAL CHARGES FOR BOOKINGS</p>
          {/* charges */}
          <div className='p-3 mr-28 ml-20 tracking-wide text-gray-700 leading-5 font-oxanium whitespace-normal text-justify'>
              <p>
                  2.1.1 <span className='font-bold text-gray-800'>FULL PAYMENT</span>: Payment maybe made in full amount to HuonBus during the booking. Such total booking 
                  amount includes the base fare, applicable taxes including GST as may be applicable as per local laws, 
                  and any additional booking fee, service fee or convenience fee charged by HuonBus.
                  <br/><br/>
                  2.1.2 <span className='font-bold text-gray-800'>PARTIAL PAYMENT</span>: Under this option User has to make payment of a partial amount as specified at the time 
                  of booking / in the booking voucher and pay the balance amount within a specified time period as informed
                  the time of booking / in the booking voucher. Failure to pay such balance amount within the stipulated 
                  time will lead to cancellation of the booking and any refund will be subject to the booking/ cancellation 
                  policy. In some cases, the customer may be allowed to make the balance payment at the start of the trip.
                  <br/><br/>  
                  2.1.3 <span className='font-bold text-gray-800'>PAY AT VEHICLE</span>: Under this option the User has to pay certain part of the booking amount specified at the 
                  time of booking / in the booking confirmation voucher to HuonBus and the balance to the vehicle operator 
                  at the start or end of the trip.
                  <br/><br/>
                  2.1.4 Expenses like toll charges, permit charges, parking charges, entry fees, Service Tax & any other 
                  Government Tax as per Government guidelines are to be borne by the User and paid directly to the driver.
                  <br/><br/>
                  2.1.5 The excess Driver Bata wherever applicable has to be paid directly to the driver.
                  <br/><br/>
                  2.1.6 User may opt for Insurance while booking. Such Insurance will be provided entirely by 
                  third party and HuonBus in no way will be a party to any such claims or concerns on the matter.
              </p>
              <br/>
          </div>
          {/* MISCELLANEOUS --> third division */}
          <p className='font-rethinkSans text-gray-800 text-sm font-semibold'>3.MISCELLANEOUS</p>
          {/* content of MISCELLANEOUS */}
          <div className='p-3 mr-28 ml-11 tracking-wide text-gray-700 font-oxanium leading-5 whitespace-normal text-justify'>
            <p>
                3.1 The bus operator shall solely be liable for compliance of all laws including but not limited to the Motor
                Vehicle Act its Rules, applicable regulations, guidelines or directions enacted or issued by the Central 
                Government or relevant State Governments. Any prosecution arising out of the contravention of such laws, 
                rules, regulations, guidelines including directives on fare control from respective RTO’s or directions 
                including but not limited to fines or penalties shall be borne by the bus operator. The User agrees to 
                take up any grievance resulting from cancellation or any deficiency in services due to any action of the 
                enforcement agencies arising with the bus operator.
                 <br/><br/>
                3.2 User Agreement and Privacy Policy at redBus website shall apply. redBus will be entitled to reject any 
                claim in case there is any abuse/misuse of the offer by the User or the cancellation/claim is not eligible 
                under the offer.
                <br/><br/>
                3.3 The terms and conditions shall be governed by the laws of India. Any dispute arising out of or in relation 
                to this offer shall be subject to the exclusive jurisdiction of competent courts in Bengaluru.
                <br/><br/>
                3.4 The maximum liability of redBus in the event of any claim arising out of this offer shall not 
                exceed the amount under the underlying transaction paid by the User.
                <br/><br/>
                3.5 redBus shall not be liable to pay for any indirect, punitive, special, incidental or consequential 
                damages arising out of or in connection with the offer.
            </p> 
            <br/> 
          </div> 
      </div>
    </div>
  )
}

export default Terms