import React, { memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const PageNumber = ({ text, icon, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  let entries = searchParams.entries();

  const appendSearchParams = (entries) => {
    let arrParams = [];
    searchParams.append("page", +text || 1);
    for (let entry of entries) arrParams.push(entry);

    let objParams = {};
    arrParams?.forEach((param) => {
      if (
        Object.keys(objParams)?.some(
          (item) => item === param[0] && item !== "page"
        )
      ) {
        //Nếu đã có key trong obj thì truyền vào các mảng đã có sẵn với key tươn ứng trong mảng lớn đó
        objParams[param[0]] = [...objParams[param[0]], param[1]];
      } else objParams = { ...objParams, [param[0]]: [param[1]] }; // Nếu chưa có thì tạo obj mới với key = [param[0]], value là mảng [param[1]]
    });
    return objParams;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text || 1);
      navigate({
        pathname: location?.pathname,
        search: createSearchParams(appendSearchParams(entries)).toString(),
      });
    }
  };

  return (
    <div
      className={`w-[46px] h-[48px] flex items-center justify-center hover:bg-gray-200 rounded-md
          ${
            +text === +currentPage
              ? "bg-[#E13427] text-white hover:text-[#E13427]"
              : "bg-white"
          }
          ${text === "..." ? "cursor-text" : "cursor-pointer"}`}
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
