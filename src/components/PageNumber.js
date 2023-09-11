import React, { memo } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const PageNumber = ({ text, icon, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let entries = searchParams.entries();
  const appendSearchParams = (entries) => {
    let arrParams = [];
    searchParams.append("page", +text || 1);
    for (let entry of entries) arrParams.push(entry);
    let objParams = {};
    arrParams?.map(
      (param) => (objParams = { ...objParams, [param[0]]: param[1] })
    );
    return objParams;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text || 1);
      navigate({
        pathname: "/",
        search: createSearchParams(appendSearchParams(entries)).toString(),
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
