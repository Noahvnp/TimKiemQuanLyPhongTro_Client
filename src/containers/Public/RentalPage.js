import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ItemSidebar, Province, RelatedPost } from "../../components";
import { List, Pagination } from "../Public";

import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";

const RentalPage = () => {
  const { categories, prices, acreages } = useSelector((state) => state?.app);
  const [currentCategory, setCurrentCategory] = useState({});
  const location = useLocation();

  console.log(categories);
  useEffect(() => {
    if (location.pathname !== "/") {
      const category = categories?.find(
        (item) =>
          `/${formatVietnameseToString(item.value)}` === location.pathname
      );
      setCurrentCategory(category);
    }
  }, [location, currentCategory]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{currentCategory?.header}</h1>
        <p className="text-base text-gray-700">{currentCategory?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List categoryCode={currentCategory?.code} />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            title="Xem theo giá"
            content={prices}
            type={"priceCode"}
            isDouble={true}
          />
          <ItemSidebar
            title="Xem theo diện tích"
            content={acreages}
            type={"acreageCode"}
            isDouble={true}
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default RentalPage;
