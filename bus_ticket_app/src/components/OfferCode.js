import React from "react";
import PrimoImage from "../assets/image/primo.webp";
import WomenDealImage from "../assets/image/womandeal.webp";
import NewOperatorImage from "../assets/image/trynew.webp";
import ExclusiveImage from "../assets/image/handpick.webp";

const OfferCode = () => {
  return (
    <div className="flex flex-wrap gap-5 py-4 px-14 ">
      {/* Card 1 */}
      <div> 
        <img src={PrimoImage} alt="Primo" className="w-32 h-28 mb-2 rounded-md" />
      </div>

      {/* Card 2 */}
      <div >
        <img src={WomenDealImage} alt="image" className="w-32 h-28 mb-2 rounded-md" />
      </div>

      {/* Card 3 */}
      <div >
        <img src={NewOperatorImage} alt="New Operator" className="w-32 h-28 mb-2 rounded-md" />
      </div>

      {/* Card 4 */}
      <div>
        <img src={ExclusiveImage} alt="Image" className="w-32 h-28 mb-2 rounded-md" />
      </div>
    </div>
  );
};

export default OfferCode;
