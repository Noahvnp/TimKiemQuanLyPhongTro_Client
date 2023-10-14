import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Address, Button, Overview, UploadImage } from "../../components";

import { getGapsAcreages, getGapsPrices } from "../../utils/Common/getCodes";
import validateFields from "../../utils/Common/validateFields";

import { apiCreatePost, apiUpdatePost } from "../../services";
import { resetDataEdit } from "../../store/actions";

const CreatePost = ({ isEdit }) => {
  const dispatch = useDispatch();

  const { prices, acreages, categories } = useSelector((state) => state.app);
  const { current_user } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);

  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: +dataEdit?.priceNumber * Math.pow(10, 6) || 0,
      acreageNumber: dataEdit?.acreageNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      acreageCode: dataEdit?.acreageCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overviews?.target || "",
      label: dataEdit?.label || "",
      province: dataEdit?.province || "",
    };
    return initData;
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const resetPayload = () => {
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
    });
  };

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
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        finalPayload.imagesId = dataEdit?.imagesId;

        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công!",
            "Cập nhật bài đăng thành công!",
            "success"
          ).then(() => {
            resetPayload();
            dispatch(resetDataEdit());
          });
        } else {
          Swal.fire("Oops!", "Đã có lỗi xảy ra!", "error");
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công!",
            "Thêm bài đăng mới thành công!",
            "success"
          ).then(() => {
            resetPayload();
          });
        } else {
          Swal.fire("Oops!", "Đã có lỗi xảy ra!", "error");
        }
      }
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa bài đăng" : "Đăng tin mới"}
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
            text={isEdit ? "Cập nhật" : "Tạo mới"}
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
