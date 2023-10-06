import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Address, Button, Overview, UploadImage } from "../../components";

import { getGapsAcreages, getGapsPrices } from "../../utils/Common/getCodes";

const CreatePost = () => {
  const { prices, acreages } = useSelector((state) => state.app);

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
    province: "",
  });

  const handleSubmit = () => {
    let priceCode = getGapsPrices(
      [+payload.priceNumber, +payload.priceNumber],
      prices
    )[0]?.code;

    let acreageCode = getGapsAcreages(
      [+payload.acreageNumber, +payload.acreageNumber],
      acreages
    )[0]?.code;

    let finalPayload = {
      ...payload,
      priceCode,
      acreageCode,
    };

    console.log(finalPayload);
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col flex-auto gap-10">
          <Address payload={payload} setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <UploadImage payload={payload} setPayload={setPayload} />
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
