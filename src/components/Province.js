import React from "react";
import { ProvinceBtn } from "../components";
import { location } from "../utils/constants";

const Province = () => {
  return (
    <div className="flex items-center gap-5 justify-center py-5">
      {location.map((item) => (
        <ProvinceBtn key={item.name} name={item.name} image={item.image} />
      ))}
    </div>
  );
};

export default Province;
