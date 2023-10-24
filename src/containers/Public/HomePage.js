import React from "react";
import { useSelector } from "react-redux";

import { textHomeContent } from "../../utils/constants";
import { ItemSidebar, Province, RelatedPost } from "../../components";
import { List, Pagination } from "../Public";

const HomePage = () => {
  const { categories, prices, acreages } = useSelector((state) => state?.app);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{textHomeContent.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">
          {textHomeContent.HOME_DESCRIPTION}
        </p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar title="Danh sách cho thuê" content={categories} />
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
          <RelatedPost outstandingPosts />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
