import React from "react";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const InputReadOnly = ({ label, value, setValue, flexRow, editPhone }) => {
  return (
    <div className={`flex ${flexRow ? "items-center" : "flex-col"} gap-2`}>
      <label
        htmlFor={formatVietnameseToString(label)}
        className={`${!flexRow ? "w-full" : "w-[25%]"} flex-none font-medium`}
      >
        {label}
      </label>
      <div className="flex-auto">
        <input
          type="text"
          id={formatVietnameseToString(label)}
          readOnly
          className="outline-none bg-gray-100 border border-gray-200 w-full p-2 rounded-md"
          value={value || ""}
          onChange={() => {
            setValue &&
              setValue((prev) => ({
                ...prev,
                monthlyRent: value,
              }));
          }}
        />
        {editPhone && (
          <small className="text-blue-500 cursor-pointer">
            Đổi só điện thoại
          </small>
        )}
      </div>
    </div>
  );
};

export default InputReadOnly;
