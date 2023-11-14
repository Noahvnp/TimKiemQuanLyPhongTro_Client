import React from "react";

import { InputFormV2, Button, Select } from "../components";

const CreateRoom = ({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
  onClick,
}) => {
  return (
    <div className="w-1/3 m-2 p-2 px-4 bg-red-100 rounded-md">
      <h4 className="text-center font-medium text-lg">Tạo phòng mới</h4>
      <div className="flex flex-col gap-4">
        <InputFormV2
          label="Tên phòng"
          name="roomName"
          small="Tên phòng không được trùng nhau."
          value={payload.roomName}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Select
          label="Loại phòng"
          option={[
            { code: "Phòng đơn", value: "Phòng đơn" },
            { code: "Phòng đôi", value: "Phòng đôi" },
            { code: "3 người trở lên", value: "3 người trở lên" },
          ]}
          name="roomType"
          value={payload.roomType}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputFormV2
          label="Giá cho thuê"
          name="monthlyRent"
          unit={"Đồng"}
          small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
          value={payload.monthlyRent}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Button
          text="TẠO PHÒNG"
          fontSz="font-bold text-xl"
          textColor="text-white"
          className="my-2 bg-secondary2"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default CreateRoom;
