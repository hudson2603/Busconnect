import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useReactTable , getCoreRowModel} from "@tanstack/react-table";
import React , {useState, useEffect , useMemo} from "react";
import Arrow from "./../assets/image/backarrow(1).png";
import "./Book";
import Filters, { getTimeSlot } from "./Filters";
import Loader from "./Loader";
import OfferCode from './OfferCode';

export function Search() {
    // props of data from the home component
    const location = useLocation();
    const {pickupcity , dropcity , date_of_travel ,exactdate ,day_of_travel} = location.state || {}
   
  // State to hold bus data fetched from backend
  const [busData, setBusData] = useState([]);

    // State for filters applied by user
    const [filters, setFilters] = useState({
      selectedTimings: [],
      selectedPriceRanges: [],
      minRating: ""
    });

  // Fetch bus data from the backend endpoint when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/buses')
      .then(response => {
        setBusData(response.data);
      })
      .catch(error => {
        console.error("Error fetching bus data:", error);
      });
  }, []);

   // Callback function to update filters
   const handleFilterChange = (filterSettings) => {
    setFilters(filterSettings);
  };

  // Filter the busData based on filters
  const filteredBuses = useMemo(() => {
    return busData.filter((bus) => {
      // Filter by departure timing
      if (filters.selectedTimings.length > 0) {
        const busTimeSlot = getTimeSlot(bus.departure);
        if (!filters.selectedTimings.includes(busTimeSlot)) {
          return false;
        }
      }
      // Filter by price ranges using the new selectedPriceRanges field
      if (filters.selectedPriceRanges.length > 0) {
        const price = parseFloat(bus.price);
        // Check if bus price falls into any selected price range
        const matchesPriceRange = filters.selectedPriceRanges.some(range => {
          if (range === 'below500') return price < 500;
          if (range === '500to1000') return price >= 500 && price <= 1000;
          if (range === '1000to1500') return price > 1000 && price <= 1500;
          if (range === '1500above') return price > 1500;
          return false;
        });
        if (!matchesPriceRange) {
          return false;
        }
      }
      // Filter by minimum rating
      if (
        filters.minRating &&
        parseFloat(bus.rating) < parseFloat(filters.minRating)
      ) {
        return false;
      }
      return true;
    });
  }, [busData, filters]);

  // Setup react-table using the fetched busData
  const data = React.useMemo(()=> filteredBuses, [filteredBuses]);
  const columns = React.useMemo(()=>[
    {id:"busname",Header:"Buses found",accessor:"busname",},
    {id:"dept",Header:"Departure",accessor:"dept",},
    {id:"duration",Header:"Duration",accessor:"duration",},
    {id:"arrival",Header:"Arrival",accessor:"arrival",},
    {id:"rating",Header:"Rating",accessor:"rating",},
    {id:"price",Header:"Price",accessor:"price",},
    {id:"seats",Header:"Seats Available",}
], []);
// use of react table
const { getHeaderGroups } = useReactTable({
  columns, data , getCoreRowModel:getCoreRowModel()
});

//Use state of the search component
const [selectbus , setselectbus] = useState(busData[0]); 

// Book function to navigate to the booking page with selected bus data
const navigate = useNavigate();
const bookfunc = (busdata) =>
  {
    setselectbus(busdata.busname);
    // console.log(busdata.busname);
    navigate("/Book" ,{
      state:{
        selectedbus:busdata,
        pickupcity:pickupcity, 
        dropcity:dropcity ,
        date_of_travel:date_of_travel ,
        day_of_travel:day_of_travel,
        exactdate:exactdate,
        stops:stops
      }
    });
}
const [stops, setStops] = useState([]);
console.log("pickupcity" , pickupcity);
console.log("dropcity" ,dropcity);
console.log("stop point" , stops);
useEffect(() => {
  // Only fetch stops if both pickup and drop are selected.
  if (pickupcity && dropcity) {
    fetch(`http://localhost:5000/api/stops?pickup=${pickupcity}&drop=${dropcity}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stops");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is in the form { stops: [...] }
        setStops(data.stops);
      })
      .catch((error) => console.error("Error fetching stops:", error));
  }
}, [pickupcity, dropcity]);

return(
  <div className="min-h-screen bg-gray-50">
    { /* full search page container */ }
    <div className='container mx-auto mt-24  px-4'>
        {/* pickup & drop loaction */}
        <div className='flex font-rethinkSans items-center justify-between bg-white p-4 rounded-md shadow mb-6'>
            <div className='flex items-center space-x-2'>
            <div className="font-bold text-lg">{pickupcity}</div>
              <img src={Arrow} alt="arrow" className="h-4" />
              <div className="font-bold text-lg">{dropcity}</div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-xl">{date_of_travel}</div>
              <div className="text-sm font-bold text-gray-600">{day_of_travel}</div>
            </div>
        </div>
            {/* Separator */}
            
            <div className="border-t border-gray-200 mb-6 "></div>
        
        <div className='flex flex-col lg:flex-row'>   
            {/* filter sidebar */}
            <div className='lg:w-1/4 mb-6 lg:mb-0 lg:pr-4 '>
              <Filters onFilterChange={handleFilterChange} />
            </div>
             {/* Bus listings table */}
        <div className="lg:w-3/4">
          <div className="overflow-x-auto">
            <div>
              <OfferCode/>
            </div>
            <table className="min-w-full bg-white rounded-md shadow">
              <thead className="bg-gray-200">
                {getHeaderGroups().map((headergroup) => (
                  <tr key={headergroup.id} className="text-center text-gray-700 text-sm font-rethinkSans font-medium">
                    {headergroup.headers.map((header) => (
                      <th key={header.id} className="px-2 py-5 border-b border-red-400 text-center font-rethinkSans ">
                        {header.isPlaceholder ? null : header.column.columnDef.Header}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 items-center flex ">
                      <Loader/>
                    </td>
                  </tr>
                ) : (
                  data.map((busdata, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => bookfunc(busdata)}
                    >
                      <td className="px-4 py-8 border-b border-gray-200 font-bold text-sm text-center font-oxanium">
                        {busdata.busName}
                      </td>
                      <td className="px-4 py-8 border-b border-gray-200 text-xl font-bold text-center font-oxanium">
                        {busdata.departure}
                        <br />
                        <span className="text-xs font-normal text-gray-600 font-oxanium">({pickupcity})</span>
                      </td>
                      <td className="px-4 py-8 border-b border-gray-200 text-base font-medium text-center font-oxanium">
                        {busdata.duration}
                        <br />
                        <span className="text-xs text-gray-600 font-oxanium">Stop at: ({stops})</span>
                      </td>
                      <td className="px-4 py-8 border-b border-gray-200 text-xl font-thin text-center font-oxanium">
                        {busdata.arrival}
                        <br />
                        <span className="text-xs text-gray-600 font-oxanium">({dropcity})</span>
                      </td>
                      <td className="px-4 py-8 border-b border-gray-200 font-medium text-center font-oxanium">
                        {busdata.rating}
                      </td>
                      <td className="px-4 py-8 border-b border-gray-200 font-bold text-xl text-center font-oxanium">
                        <span className="text-sm font-normal text-gray-600 font-oxanium">Starts from</span>
                        <br /> {busdata.price}
                      </td>
                      <td className="px-4 py-8 border-b border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            bookfunc(busdata);
                          }}
                          className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 px-4 rounded-md"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default Search
