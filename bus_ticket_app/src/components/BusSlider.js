import React, { useState, useEffect } from "react";
import busImage1 from "../assets/image/Bus1.jfif";
import busImage2 from "../assets/image/Bus3.webp";
import busImage3 from "../assets/image/bus6.jpg";
import busImage4 from "../assets/image/Bus4.jpg";
import busImage5 from "../assets/image/Bus5.jfif";

const BusSlider = () => {
  // 2. Create an array of local image imports
  const images = [busImage1, busImage2, busImage3, busImage4, busImage5];

  // currentIndex points to the first visible image
  const [currentIndex, setCurrentIndex] = useState(0);
    // State to trigger fade transition
    const [fade, setFade] = useState(true);

  // Show 3 images at a time
  const VISIBLE_COUNT = 3;

  useEffect(() => {
    // Advance the slide every 5 seconds
    const intervalId = setInterval(() => {
        setFade(false);
        setTimeout(()=>{
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(true);
        },300)
    }, 6000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  // Compute which images to display
  const displayedImages = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    const index = (currentIndex + i) % images.length;
    displayedImages.push(images[index]);
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 py-4 px-32 ">
      <div
        className={`flex space-x-4 overflow-hidden transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {displayedImages.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-1/3 bg-white rounded shadow"
          >
            <img src={img} alt={`Bus ${idx + 1}`} className="w-44 h-28" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSlider;
