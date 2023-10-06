import React, { useState, useEffect, memo } from "react";

import { InputReadOnly, Select } from "../components";
import { apiGetVietNamDistricts, apiGetVietNamProvinces } from "../services";

const Address = ({ payload, setPayload }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [reset, setReset] = useState(false);

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
  }, [province, district]);

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
          />
          <Select
            type="district"
            value={district}
            setValue={setDistrict}
            option={districts}
            reset={reset}
            label="Quận/Huyện"
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
