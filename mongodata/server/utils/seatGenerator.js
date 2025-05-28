const generateDefaultSeats = () => {
    const seats = [];
    const upperDeckSeats = 18;
    const lowerDeckSeats = 18;
  
    for (let i = 1; i <= upperDeckSeats; i++) {
      seats.push({ seatNumber: `U${i}`, deck: "upper", status: "available" });
    }
    for (let i = 1; i <= lowerDeckSeats; i++) {
      seats.push({ seatNumber: `L${i}`, deck: "lower", status: "available" });
    }
    return seats;
  };
  
  module.exports = generateDefaultSeats;
  