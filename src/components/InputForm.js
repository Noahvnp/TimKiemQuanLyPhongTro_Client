import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  keyValue,
  invalidFields,
  setInvalidFields,
  type,
}) => {
  return (
    <div>
      <label htmlFor={keyValue} className="text-sm">
        {label}
      </label>
      <input
        type={type || "text"}
        id={keyValue || ""}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyValue]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {/* Render ra lỗi của trường đó bằng cách tìm tên lỗi trùng với type input */}
      {invalidFields?.some((i) => i.name === keyValue) && (
        <small className="text-red-500 italic">
          {invalidFields.find((i) => i.name === keyValue)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
