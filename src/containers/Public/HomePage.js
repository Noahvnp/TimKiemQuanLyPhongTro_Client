import React from "react";
import { textHomeContent } from "../../utils/constants";
import { Province } from "../../components";

function HomePage() {
  return (
    <div className="border border-red-500 w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{textHomeContent.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">
          {textHomeContent.HOME_DESCRIPTION}
        </p>
      </div>
      <Province />
    </div>
  );
}

export default HomePage;
