import React, { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YearOfBirthInput = ({
  value,
  setValue,
  invalidFields,
  setInvalidFields,
}) => {
  const handleYearChange = (date) => {
    // Chỉ lấy năm từ ngày được chọn
    const selectedYear = date ? date.getFullYear() : null;
    setValue((prev) => ({ ...prev, yearOfBirth: selectedYear }));
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm">Năm sinh</label>
      <DatePicker
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        showIcon
        selected={value ? new Date(value.toString()) : null}
        onChange={handleYearChange}
        onFocus={() => setInvalidFields && setInvalidFields([])}
        placeholderText="  Chọn năm sinh"
        isClearable
        showYearPicker
        dateFormat="yyyy"
        yearDropdownItemNumber={20}
      />
      {/* Render ra lỗi của trường đó bằng cách tìm tên lỗi trùng với type input */}
      {invalidFields?.some((i) => i.name === "yearOfBirth") && (
        <small className="text-red-500 italic">
          {invalidFields.find((i) => i.name === "yearOfBirth")?.message}
        </small>
      )}
    </div>
  );
};

export default memo(YearOfBirthInput);
