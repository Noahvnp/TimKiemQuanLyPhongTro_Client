import React, { memo } from "react";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const Select = ({
  label,
  type,
  name,
  option,
  value,
  setValue,
  reset,
  small,
  invalidFields,
  setInvalidFields,
}) => {
  const handleErrorText = () => {
    let nameInvalid = invalidFields?.find((field) => field.name === name);
    let addressInvalid = invalidFields?.find(
      (field) => field.name === "address"
    );

    return (
      <small className="text-red-500">
        {`${nameInvalid ? nameInvalid.message : ""}` ||
          `${addressInvalid ? addressInvalid.message : ""}`}
      </small>
    );
  };

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
        onFocus={() => setInvalidFields([])}
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
      {small && <small className="opacity-80 italic px-1">{small}</small>}
      {handleErrorText()}
    </div>
  );
};

export default memo(Select);
