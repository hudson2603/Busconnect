import React from 'react'

function Contact() {
  return (
<div className="bg-white mt-24 py-10 px-4 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-xl font-bold font-rethinkSans text-red-600 mb-6">Contact Us</h1>
        
        <p className="text-gray-700 text-lg mb-4">
          HuonBus India Private Limited is dedicated to transforming long-distance travel by providing innovative, reliable, and comfortable bus services. We continuously strive to improve our offerings through state-of-the-art technology and a customer-first approach.
        </p>
        
        <p className="text-gray-700 text-lg mb-4">
          Our services are designed to ensure that every journey is safe, hassle-free, and enjoyable. With a focus on punctuality and excellent customer support, we aim to set new standards in travel convenience and comfort.
        </p>
        
        <p className="text-gray-700 text-lg mb-4">
          If you have any queries regarding our bus schedules, ticket booking process, or any other travel-related service, please do not hesitate to get in touch. Our dedicated team is always ready to assist you and ensure that your travel experience is smooth and memorable.
        </p>
        
        <div className="mt-6">
          <p className="text-gray-800 text-lg font-semibold">Company Address:</p>
          <p className="text-gray-700 text-lg">
            307, Sathy Road, Ganapathy,<br />
            Coimbatore, Tamil Nadu, India
          </p>
          <p className="text-gray-800 text-lg font-semibold mt-4">Contact Number:</p>
          <p className="text-gray-700 text-lg">+91 422 439 1662</p>
          <p className="text-gray-800 text-lg font-semibold mt-4">Email:</p>
          <p className="text-gray-700 text-lg">support@huonbus.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact