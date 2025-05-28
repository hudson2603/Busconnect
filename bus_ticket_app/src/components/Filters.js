import React, { useState } from 'react';

// Helper function to determine which time slot a departure time belongs to.
// Assumes departure time is in "HH:MM" (24-hour) format.
const getTimeSlot = (timeStr) => {
  const [hourStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  // Covers hours from 21 to 23 and 0 to 5.
  return 'night';
};

const Filters = ({ onFilterChange }) => {
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [minRating, setMinRating] = useState('');

    // Price range options
    const priceOptions = [
        { label: 'Below 500', value: 'below500' },
        { label: '500 - 1000', value: '500to1000' },
        { label: '1000 - 1500', value: '1000to1500' },
        { label: '1500 above', value: '1500above' },
      ];

  // Toggle departure time slot filters
  const handleTimingChange = (e) => {
    const { value, checked } = e.target;
    let updatedTimings = [...selectedTimings];
    if (checked) {
      updatedTimings.push(value);
    } else {
      updatedTimings = updatedTimings.filter((time) => time !== value);
    }
    setSelectedTimings(updatedTimings);
  };

  // Toggle price range checkboxes
  const handlePriceRangeChange = (e) => {
    const { value, checked } = e.target;
    let updatedPriceRanges = [...selectedPriceRanges];
    if (checked) {
      updatedPriceRanges.push(value);
    } else {
      updatedPriceRanges = updatedPriceRanges.filter((price) => price !== value);
    }
    setSelectedPriceRanges(updatedPriceRanges);
  };


  // Apply filters and send the settings to the parent component
  const applyFilters = () => {
    onFilterChange({ selectedTimings, selectedPriceRanges, minRating });
  };

  return (
<div className="p-6 bg-red-50 shadow-md rounded-md">
      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2 font-rethinkSans">Departure Timings</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="morning"
              onChange={handleTimingChange}
              className="form-checkbox h-4 w-4 text-red-600"
            />
            <span className="text-gray-700 font-oxanium text-sm">Morning (5 AM - 12 PM)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="afternoon"
              onChange={handleTimingChange}
              className="form-checkbox h-4 w-4 text-red-600"
            />
            <span className="text-gray-700 font-oxanium text-sm">Afternoon (12 PM - 5 PM)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="evening"
              onChange={handleTimingChange}
              className="form-checkbox h-4 w-4 text-red-600"
            />
            <span className="text-gray-700 font-oxanium text-sm">Evening (5 PM - 9 PM)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="night"
              onChange={handleTimingChange}
              className="form-checkbox h-4 w-4 text-red-600"
            />
            <span className="text-gray-700 font-oxanium text-sm">Night (9 PM - 5 AM)</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2 font-rethinkSans">Price Range</h4>
        <div className="space-y-2">
        {priceOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option.value}
                onChange={handlePriceRangeChange}
                className="form-checkbox h-4 w-4 text-red-600"
              />
              <span className="text-gray-700 font-oxanium text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2 font-rethinkSans">Minimum Rating</h4>
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="w-full p-2 border font-oxanium text-sm border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option value="">All</option>
          <option value="1">1+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-2 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
};

export { getTimeSlot };
export default Filters;
