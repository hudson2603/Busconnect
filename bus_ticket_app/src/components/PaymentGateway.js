// src/components/PaymentGateway.js
import React, { useState } from 'react';

const PaymentGateway = ({ onConfirm, onCancel }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirm = () => {
    // Validate card details as needed
    const paymentDetails = { cardNumber, expiry, cvv };
    onConfirm(paymentDetails);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Enter Card Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
