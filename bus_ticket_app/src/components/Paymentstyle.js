// File: src/components/Paymentstyle.js
import React, { useEffect, useState,useContext } from 'react';
import styled from 'styled-components';
import "./../assets/css/Continue.css";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './LoginContext';
import Loader from './Loader';

const Paymentstyle = ({
  pickupcity,
  dropcity,
  date_of_travel,
  selectedbus,
  selectedSeats,
  price,
  duration,
  countseats,
  openPassengerDetails,
  ShowPrice,
  stops,formattedDate
}) => {
  const {openloginmodal} = useContext(LoginContext);
  // const navigate = useNavigate();
  const handleclick = () => {
    console.log("continue to proceed")
    const token = localStorage.getItem('token');
    console.log("token:",token)
    if (token) {
      // If logged in, go to Passenger Details page
      openPassengerDetails();
    } else {
      // If not logged in, navigate to the login page (or open login modal)
      openloginmodal();
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="card cart">
          <div>
            <label className="title text-lg">BOOK YOUR SEATS</label>
          </div>
          <div className="steps">
            <div className="step">
              {/* Boarding & Dropping Section */}
              <div className="font-semibold text-lg font-rethinkSans">
                BOARDING & DROPPING POINT
              </div>
              <div className="p-4 bg-gray-100 rounded-sm shadow-md shadow-gray-300 max-w-xl">
                <div className="relative flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-2 h-2 mt-10 bg-gray-400 rounded-full" />
                    <div className="h-12 border-dotted border-l-2 border-black my-1" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold font-oxanium">
                      {selectedbus.busName}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-800 font-medium text-lg">{pickupcity}</div>
                      <div className="text-gray-800 font-medium text-lg ml-10">
                        {duration}
                      </div>
                    </div>
                    <div className="text-gray-600 text-lg">
                      {stops.length > 0 ? (
                        stops.map((stop, index) => (
                          <span key={index} className="mr-2">
                            Stops: ({stop})
                          </span>
                        ))
                      ) : (
                        <><Loader></Loader><span>No stops available</span></>
                      )}
                    </div>
                    <div className="text-red-600 text-lg mb-2">Mar -6</div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-800 font-medium text-lg">{dropcity}</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {/* Selected Seats */}
              <div>
                <div className="font-semibold text-sm">SEATS</div>
                <div className="font-medium text-base">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "No seat selected"}
                </div>
              </div>
              <hr />
             
              {/* Payment Summary */}
              <div className="payments">
                <div>PAYMENT</div>
                <div className="details">
                  <div>Ticket price:</div>
                  <div>Rs. {price}</div>
                  <div>Total Price:</div>
                  <div>
                    {countseats === 0 ? (
                      <p>No seat selected</p>
                    ) : (
                      <p className="text-base">Rs. {ShowPrice}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card checkout">
          <div className="footer">
            <div className="text-x">
              ( Taxes will be calculated during payment )
            </div>
            <button className="Btn" onClick={handleclick}>
              Continue to Proceed
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Paste your Continue.css styles or additional custom CSS here */
  .container {
    display: grid;
    grid-template-columns: auto;
    gap: 0px;
  }
  hr {
    height: 1px;
    background-color: #E5C7C5;
    border: none;
  }
  .card {
    width: 400px;
    background: #F4E2DE;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05),
      0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1),
      0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #E5C7C5;
    font-weight: 700;
    font-size: 11px;
    color: #000000;
  }
  .cart {
    border-radius: 19px 19px 0px 0px;
  }
  .cart .steps {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .cart .steps .step {
    display: grid;
    gap: 10px;
  }
  .cart .steps .step span {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 8px;
    display: block;
  }
  .cart .steps .step p {
    font-size: 11px;
    font-weight: 600;
    color: #000000;
  }
  .promo form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 0px;
  }
  .input_field {
    width: auto;
    height: 36px;
    padding-left: 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #E5C7C5;
    background-color: #F4E2DE;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #F3D2C9;
    background-color: #F4E2DE;
  }
  .promo form button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: #F3D2C9;
    box-shadow: 0px 0.5px 0.5px #E5C7C5,
      0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-weight: 600;
    font-size: 12px;
    color: #000000;
  }
  .payments .details {
    display: grid;
    grid-template-columns: 10fr 1fr;
    gap: 5px;
    padding: 0px;
  }
  .payments .details span:nth-child(odd) {
    font-size: 12px;
    font-weight: 600;
    color: #000000;
    margin: auto auto auto 0;
  }
  .payments .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin: auto 0 auto auto;
  }
  .checkout .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: #ECC2C0;
  }
  .price {
    font-size: 22px;
    color: #2B2B2F;
    font-weight: 900;
  }
  .checkout .checkout-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: #F3D2C9;
    box-shadow: 0px 0.5px 0.5px #E5C7C5,
      0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 1px solid #ECC2C0;
    color: #000000;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
`;

export default Paymentstyle;
