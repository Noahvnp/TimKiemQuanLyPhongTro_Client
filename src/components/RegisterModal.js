import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { InputForm, Button, Select, YearOfBirthInput } from "../components";

import validateFields from "../utils/Common/validateFields";
import { apiGetVietNamProvinces, apiRental } from "../services";

const objWorks = [
  { code: "Công nhân", value: "Công nhân" },
  { code: "Văn phòng", value: "Văn phòng" },
  { code: "Sinh viên", value: "Sinh viên" },
  { code: "Khác", value: "Khác" },
];

function RegisterModal({ setIsRegister }) {
  const { current_user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: current_user?.name || "",
    phone: current_user?.phone || "",
    yearOfBirth: null,
    homnetown: "",
    work: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");

  useEffect(() => {
    const fetchVietNamProvinces = async () => {
      const response = await apiGetVietNamProvinces();
      setProvinces(response?.data?.results);
    };

    fetchVietNamProvinces();
  }, []);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      homnetown: `${
        province
          ? `${
              provinces?.find((item) => item.province_id === province)
                ?.province_name
            }`
          : ""
      }`,
    }));
  }, [province, provinces]);
  console.log(payload.homnetown);

  const hanldeSubmit = async () => {
    const invalidIndex = await validateFields(payload, setInvalidFields);
    if (invalidIndex === 0) {
      const response = await apiRental(payload, posts[0].id);
      if (response?.data.err === 0) {
        Swal.fire(
          "Đăng ký thuê thành công!",
          "Chúng tôi sẽ phản hồi sớm với bạn.",
          "success"
        ).then(() => {
          setIsRegister(false);
        });
      } else {
        Swal.fire("Oops!", response?.data?.msg, "error").then(() => {
          setIsRegister(false);
        });
      }
    }
  };

  return (
    <div
      className="bg-overlay-70 fixed py-6 top-0 left-0 right-0 bottom-0 flex justify-center z-20"
      onClick={(e) => {
        e.stopPropagation();
        setIsRegister(false);
      }}
    >
      <div
        className="bg-white max-w-600 w-full h-fit overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4">
          <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
            Đăng ký thuê
          </h1>
          <div className="flex gap-4">
            <div className="py-4 flex flex-col flex-auto gap-4">
              <InputForm
                label={"Thông tin liên hệ"}
                keyValue="name"
                value={payload?.name}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputForm
                label={"Điện thoại"}
                keyValue="phone"
                setValue={setPayload}
                value={payload?.phone}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <YearOfBirthInput
                setValue={setPayload}
                value={payload?.yearOfBirth}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <Select
                type="province"
                // name="homnetown"
                value={province}
                setValue={setProvince}
                option={provinces}
                label="Quê quán"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <Select
                type="work"
                name="work"
                value={payload?.work}
                setValue={setPayload}
                option={objWorks}
                label="Công việc"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <Button
                text="Đăng ký"
                textColor="text-white"
                fontSz={"font-bold text-lg"}
                fullWidth
                bgColor={"bg-secondary1"}
                onClick={hanldeSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RegisterModal);
