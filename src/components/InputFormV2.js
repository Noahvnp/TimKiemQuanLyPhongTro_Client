import React, { memo } from "react";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const InputFormV2 = ({ label, unit, value, setValue, name, small }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={formatVietnameseToString(label)} className="font-medium">
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id={formatVietnameseToString(label)}
          className={`w-full outline-blue-300 border border-gray-300 p-2 ${
            unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
          }`}
          value={value || ""}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
        />
        {unit && (
          <span className="p-2 w-16 flex-none text-center border border-gray-300 bg-gray-200 rounded-tr-md rounded-br-md">
            {unit}
          </span>
        )}
      </div>
      {small && <small className="opacity-80">{small}</small>}
    </div>
  );
};

export default memo(InputFormV2);