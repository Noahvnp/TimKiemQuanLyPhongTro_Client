import React, { memo } from "react";
import { useSelector } from "react-redux";

import { InputFormV2, InputReadOnly, Select } from "../components";

const objTargets = [
  { code: "Tất cả", value: "Tất cả" },
  { code: "Nam", value: "Nam" },
  { code: "Nữ", value: "Nữ" },
];

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);
  const { current_user } = useSelector((state) => state.user);

  return (
    <div>
      <h2 className="font-bold text-xl py-4">Thông tin mô tả</h2>
      <div className="flex flex-col gap-4">
        <div className="w-1/2">
          <Select
            label={"Loại chuyên mục"}
            option={categories}
            name={"categoryCode"}
            value={payload.categoryCode}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputFormV2
          label="Tiêu đề"
          name="title"
          value={payload.title}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="font-medium">
            Nội dung mô tả
          </label>
          <textarea
            id="desc"
            cols={30}
            rows={10}
            className="w-full outline-blue-300 border border-gray-300 p-2 rounded-md"
            value={payload?.description}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                description: [e.target.value],
              }))
            }
            onFocus={() => setInvalidFields([])}
          />
          <small className="text-red-500">
            {invalidFields?.some((field) => field.name === "description") &&
              invalidFields?.find((field) => field.name === "description")
                .message}
          </small>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly
            label={"Thông tin liên hệ"}
            value={current_user?.name || current_user?.user_name}
          />
          <InputReadOnly label={"Điện thoại"} value={current_user?.phone} />
          <InputFormV2
            label="Giá cho thuê"
            unit={"Đồng"}
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
            value={payload.priceNumber}
            setValue={setPayload}
            name="priceNumber"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormV2
            label="Diện tích"
            unit={"m2"}
            value={payload.acreageNumber}
            setValue={setPayload}
            name="acreageNumber"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            label={"Đối tượng cho thuê"}
            option={objTargets}
            value={payload.target}
            setValue={setPayload}
            name="target"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Overview);
