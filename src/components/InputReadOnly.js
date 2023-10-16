import React from "react";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const InputReadOnly = ({ label, value, flexRow, editPhone }) => {
  return (
    <div className={`flex ${flexRow ? "" : "flex-col"} gap-2`}>
      <label
        htmlFor={formatVietnameseToString(label)}
        className="w-[25%] flex-none font-medium"
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
