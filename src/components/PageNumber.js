import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const PageNumber = ({ text, icon, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text);
      navigate({
        pathname: "/",
        search: createSearchParams({
          page: text,
        }).toString(),
      });
    }
  };

  return (
    <div
      className={`w-[46px] h-[48px] flex items-center justify-center hover:bg-gray-500 rounded-md shadow-md 
          ${+text === +currentPage ? "bg-[#E13427] text-white" : "bg-white"}
          ${text === "..." ? "cursor-text" : "cursor-pointer"}`}
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
