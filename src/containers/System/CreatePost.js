import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Address, Button, Overview, UploadImage } from "../../components";

import { getGapsAcreages, getGapsPrices } from "../../utils/Common/getCodes";
import { apiCreatePost } from "../../services";
import validateFields from "../../utils/Common/validateFields";

const CreatePost = () => {
  const { prices, acreages, categories } = useSelector((state) => state.app);
  const { current_user } = useSelector((state) => state.user);

  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    priceNumber: 0,
    acreageNumber: 0,
    images: "",
    address: "",
    priceCode: "",
    acreageCode: "",
    description: "",
    target: "",
    label: "",
    province: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleSubmit = async () => {
    let priceCode = getGapsPrices(
      [
        +payload.priceNumber / Math.pow(10, 6),
        +payload.priceNumber / Math.pow(10, 6),
      ],
      prices
    )[0]?.code;

    let acreageCode = getGapsAcreages(
      [+payload.acreageNumber, +payload.acreageNumber],
      acreages
    )[0]?.code;

    let finalPayload = {
      ...payload,
      priceCode,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      acreageCode,
      userId: current_user.id,
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((category) => category.code === payload.categoryCode)
          ?.value
      } ${payload?.address?.split(",")?.[0]}`,
    };

    const result = await validateFields(finalPayload, setInvalidFields);
    console.log(result);
    if (result === 0) {
      console.log(finalPayload);
      const response = await apiCreatePost(finalPayload);
      if (response?.data.err === 0) {
        Swal.fire("Thành công!", "Đã thêm bài đăng mới!", "success").then(
          () => {
            setTimeout(
              () =>
                setPayload({
                  categoryCode: "",
                  title: "",
                  priceNumber: 0,
                  acreageNumber: 0,
                  images: "",
                  address: "",
                  priceCode: "",
                  acreageCode: "",
                  description: "",
                  target: "",
                  label: "",
                  province: "",
                }),
              1000
            );
          }
        );
      } else {
        Swal.fire("Oops!", "Đã có lỗi xảy ra!", "error");
      }
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col flex-auto gap-10">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <UploadImage
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Button
            text="Tiếp tục"
            textColor="text-white"
            fontSz="text-lg font-medium"
            bgColor="bg-green-600"
            fullWidth
            noUnderline
            className={"hover:bg-green-700"}
            onClick={handleSubmit}
          />
        </div>
        <div className="w-[30%] flex-none">maps</div>
      </div>
    </div>
  );
};

export default CreatePost;
