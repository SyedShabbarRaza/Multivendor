import React from "react";
import CountDown from "./CountDown";

function EventCard({active}) {
  return (
    <div className={`w-full blcok bg-white rounded-lg ${active?"unset":"mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[40%] m-auto">
        <img src="data:image/jpeg;base64,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" alt="Event Image" />
      </div>
      <div className="w-full lg:w-[60%] m-auto flex flex-col justify-center">
        <h2 className="ext-[25px] font-[600] font-Roboto text-[#333]">
          Iphone 14pro max 8/256gb
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ab
          minima in asperiores et, ea dignissimos perferendis facilis, sed
          blanditiis cum aliquid beatae, nihil doloribus impedit voluptatem a
          modi dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt ab minima in asperiores et, ea dignissimos perferendis
          facilis, sed blanditiis cum aliquid beatae, nihil doloribus impedit
          voluptatem a modi dolore.
        </p>
        <div className="flex justify-between">
          <div className="flex pt-3">
            <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
              900$
            </h4>
            <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              1220$
            </h3>
          </div>

          <h3 className="text-[16px] text-green-400 mt-1">120 Sold</h3>
        </div>

        <CountDown />


  
      </div>
    </div>
  );
}

export default EventCard;
