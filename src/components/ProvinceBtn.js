import React from "react";

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className="shadow-md rounded-bl-md rounded-br-md text-blue-600 cursor-pointer hover:text-orange-600 hover:shadow-lg">
      <img
        src={image}
        alt={name}
        className="w-[220px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="font-medium p-2 text-center">{name}</div>
    </div>
  );
};

export default ProvinceBtn;
