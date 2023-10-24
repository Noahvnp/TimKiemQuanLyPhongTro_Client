import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Path } from "../utils/constants";

const ProvinceBtn = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const titleSearch = `Cho thuê ${name}, phòng trọ giá rẻ`;
    navigate(
      {
        pathname: Path.DETAIL_SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <div
      className="shadow-md rounded-bl-md rounded-br-md text-blue-600 cursor-pointer hover:text-orange-600 hover:shadow-lg"
      onClick={handleClick}
    >
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
