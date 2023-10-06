import React from "react";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

const InputReadOnly = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={formatVietnameseToString(label)} className="font-medium">
        {label}
      </label>
      <input
        type="text"
        id={formatVietnameseToString(label)}
        readOnly
        className="outline-none bg-gray-100 border border-gray-200 w-full p-2 rounded-md"
        value={value || ""}
      />
    </div>
  );
};

export default InputReadOnly;
