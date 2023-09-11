import React, { memo } from "react";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import icons from "../utils/icons";
import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble, type }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const formatContent = () => {
    const oddEls = content?.filter((item, index) => index % 2 !== 0);
    const evenEls = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEls.map((item, index) => ({
      right: item,
      left: evenEls.find((item2, index2) => index2 === index),
    }));
    return formatContent;
  };

  const handelFilterPost = (code) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };

  return (
    <div className=" w-full p-4 bg-white border border-gray-300 shadow-sm rounded-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col gap-2">
        {!isDouble &&
          content?.length > 0 &&
          content.map((item) => (
            <Link
              to={formatVietnameseToString(item.value)}
              key={item.code}
              className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
            >
              <GrNext size={10} />
              <p className="text-[16px]">{item.value}</p>
            </Link>
          ))}

        {isDouble &&
          content?.length > 0 &&
          formatContent(content).map((item, index) => (
            <div key={index} className="flex items-center justify-around">
              <div
                onClick={() => handelFilterPost(item.left.code)}
                className="flex flex-1 gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
              >
                <GrNext size={10} />
                <p className="text-[16px]">{item.left.value}</p>
              </div>
              <div
                onClick={() => handelFilterPost(item.right.code)}
                className="flex flex-1 gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
              >
                <GrNext size={10} />
                <p className="text-[16px]">{item.right.value}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(ItemSidebar);
