import React, { memo } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import "moment/locale/vi";

const DateInput = ({
  value,
  setValue,
  invalidFields,
  setInvalidFields,
  type,
  name,
  label,
}) => {
  const handleYearChange = (date) => {
    // Chỉ lấy năm từ ngày được chọn
    const selectedYear = date ? date.getFullYear() : null;
    setValue((prev) => ({ ...prev, [name]: selectedYear }));
  };

  moment.locale("vi");

  return (
    <div className="flex flex-col gap-2">
      <label className="w-full flex-none font-medium">{label}</label>
      <div className="flex-auto flex-col items-center">
        <div className="flex-auto flex items-center">
          {/* <input className=" w-full bg-red-500" /> */}
          {type === "year" ? (
            <DatePicker
              className="!block max-w-full outline-blue-300 border border-gray-300 rounded-md p-2"
              showIcon
              selected={value ? new Date(value.toString()) : null}
              onChange={handleYearChange}
              onFocus={() => setInvalidFields && setInvalidFields([])}
              placeholderText={`Chọn ${label}`}
              isClearable
              showYearPicker
              dateFormat={"yyyy"}
              yearDropdownItemNumber={20}
            />
          ) : (
            <DatePicker
              selected={value || null}
              className="!block max-w-full outline-blue-300 border border-gray-300 rounded-md p-2"
              onChange={(date) => {
                setValue((prev) => ({ ...prev, [name]: date }));
              }}
              dateFormat="dd/MM/yyyy" // Định dạng ngày tháng năm theo format của Việt Nam
              placeholderText={`Chọn ${label}`}
              showYearDropdown
              isClearable
              showIcon
              yearDropdownItemNumber={3}
              scrollableYearDropdown
            />
          )}
        </div>
      </div>

      {/* Render ra lỗi của trường đó bằng cách tìm tên lỗi trùng với type input */}
      {invalidFields?.some((i) => i.name === name) && (
        <small className="text-red-500 italic">
          {invalidFields.find((i) => i.name === name)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(DateInput);
