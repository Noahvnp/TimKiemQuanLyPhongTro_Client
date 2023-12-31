import React from "react";
import { useSelector } from "react-redux";

import { ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from ".";
import { useLocation } from "react-router-dom";

const DetailSearch = () => {
  const { prices, acreages } = useSelector((state) => state?.app);
  const location = useLocation();

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{location.state?.titleSearch}</h1>
        <p className="text-base text-gray-700">
          {location.state?.titleSearch}, phòng mới xây, chính chủ gần chợ,
          trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.
        </p>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
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
          <RelatedPost outstandingPosts />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default DetailSearch;
