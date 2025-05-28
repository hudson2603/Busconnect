import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  // Controls whether the answer is visible
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggleAccordion}
        className="w-full text-left flex justify-between items-center py-4"
      >
        <span className="font-semibold text-gray-900 font-oxanium">
          {question}
        </span>
        {/* Icon or symbol for expand/collapse */}
        <span className="text-2xl text-gray-600">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 pl-2 pr-2 text-gray-800 font-oxanium">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQAccordion = () => {
  // Example FAQ data
  const faqData = [
    {
      question: "Can I track the location of my booked bus online?",
      answer: "Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus.” This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety.",
    },
    {
      question: "What are the advantages of purchasing a bus ticket with HuonBus?",
      answer: "Some advantages include hassle-free online booking, real-time seat selection, secure payment options, and round-the-clock customer support. We also offer special deals, loyalty rewards, and a user-friendly interface to enhance your booking experience.",
    },
    {
      question: "Why book bus tickets online on HuonBus?",
      answer: "By booking online, you can easily compare prices, choose from multiple bus operators, select preferred seats, and enjoy the convenience of e-tickets. Our platform provides reliable information on bus schedules, seat availability, and travel duration.",
    },
    {
        question:" Is there a limit on the luggage I can bring on board?",
        answer:"Most operators allow one piece of luggage in the storage compartment and a small carry-on bag in the seating area. However, if you plan to carry extra or oversized luggage, we recommend reviewing the operator’s baggage policy or contacting our support for clarification."
    },
    {
        question:"How safe are online payments on your platform?",
        answer:"We prioritize payment security by using encrypted gateways and SSL certificates. All transactions are processed through secure channels to protect your personal and financial information."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-sm rounded-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 font-rethinkSans">
        FAQ 'S
      </h1>
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
