import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

import { InputReadOnly, Select } from "../components";
import { apiGetVietNamDistricts, apiGetVietNamProvinces } from "../services";

const Address = ({ invalidFields, setInvalidFields, payload, setPayload }) => {
  const { dataEdit } = useSelector((state) => state.post);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [reset, setReset] = useState(false);

  // Lấy data edit để render ra lại địa chỉ hiện tại
  useEffect(() => {
    let addressArr = dataEdit?.address?.split(",");
    let foundedProvince = addressArr
      ? provinces?.length > 0 &&
        provinces?.find(
          (province) =>
            province.province_name === addressArr[addressArr.length - 1]?.trim()
        )?.province_id
      : "";
    setProvince(foundedProvince);
  }, [provinces]);

  useEffect(() => {
    let addressArr = dataEdit?.address?.split(",");
    let foundedDistrict = addressArr
      ? districts?.length > 0 &&
        districts?.find(
          (district) =>
            district.district_name === addressArr[addressArr.length - 2]?.trim()
        )?.district_id
      : "";
    setDistrict(foundedDistrict);
  }, [districts]);

  // Lấy ra toàn bộ tỉnh, thành VN
  useEffect(() => {
    const fetchVietNamProvinces = async () => {
      const response = await apiGetVietNamProvinces();
      setProvinces(response?.data?.results);
    };

    fetchVietNamProvinces();
  }, []);

  useEffect(() => {
    const fetchVietNamDistricts = async () => {
      const response = await apiGetVietNamDistricts(province);
      setDistricts(response?.data?.results);
    };

    setDistrict("");
    province && fetchVietNamDistricts();
    !province && setDistricts([]);
    !province ? setReset(true) : setReset(false);
  }, [province]);

  // Render ra province, district đã chọn
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            }, `
          : ""
      }${
        province
          ? `${
              provinces?.find((item) => item.province_id === province)
                ?.province_name
            }`
          : ""
      }`,
      province: province
        ? `${
            provinces?.find((item) => item.province_id === province)
              ?.province_name
          }`
        : "",
    }));
  }, [province, district, setPayload, districts, provinces]);

  return (
    <div>
      <h2 className="font-bold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            type="province"
            value={province}
            setValue={setProvince}
            option={provinces}
            label="Tỉnh/Thành Phố"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            type="district"
            value={district}
            setValue={setDistrict}
            option={districts}
            reset={reset}
            label="Quận/Huyện"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputReadOnly
          label={"Địa chỉ chính xác"}
          value={`${
            district
              ? `${
                  districts?.find((item) => item.district_id === district)
                    ?.district_name
                }, `
              : ""
          }${
            province
              ? `${
                  provinces?.find((item) => item.province_id === province)
                    ?.province_name
                }`
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
