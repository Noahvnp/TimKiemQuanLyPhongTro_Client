import React, { memo } from "react";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const Select = ({ label, type, name, option, value, setValue, reset }) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor={formatVietnameseToString(label)} className="font-medium">
        {label}
      </label>
      <select
        id={formatVietnameseToString(label)}
        className="outline-none border border-gray-300 p-2 rounded-md w-full"
        value={!reset ? value : ""}
        onChange={(e) =>
          name
            ? setValue((prev) => ({ ...prev, [name]: e.target.value }))
            : setValue(e.target.value)
        }
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {option?.map((item) => (
          <option
            value={
              type === "province"
                ? item?.province_id
                : type === "district"
                ? item?.district_id
                : item?.code
            }
            key={
              type === "province"
                ? item?.province_id
                : type === "district"
                ? item?.district_id
                : item?.code
            }
          >
            {type === "province"
              ? item?.province_name
              : type === "district"
              ? item?.district_name
              : item?.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Select);
