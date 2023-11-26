import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { apiGetPaymentVNPay, apiVerifyPayment } from "../../services";
import { Path } from "../../utils/constants";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();

  const [code, setCode] = useState(null);

  useEffect(() => {
    let arrParams = [];
    //Chuyển object thành 1 mảng lớn chứa nhiều mảng nhỏ gồm [[key, value], [key, value], ...]
    for (let entry of searchParams.entries()) arrParams.push(entry);

    let objParams = {};
    arrParams?.forEach((param) => {
      if (Object.keys(objParams)?.some((item) => item === param[0])) {
        //Nếu đã có key trong obj thì truyền vào các mảng đã có sẵn với key tươn ứng trong mảng lớn đó
        objParams[param[0]] = param[1];
      } else objParams = { ...objParams, [param[0]]: param[1] }; // Nếu chưa có thì tạo obj mới với key = [param[0]], value là mảng [param[1]]
    });

    apiGetPaymentVNPay(objParams).then((response) => {
      let paymentId = decodeURIComponent(response?.data?.paymentId).split(
        ":"
      )[1];
      apiVerifyPayment({ paymentMethod: "Thanh toán online", paymentId });
      setCode(response?.data?.code);
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center mt-[20%]">
      {code && code === "00" ? (
        <h1 className="text-5xl text-orange-500 font-semibold">
          GIAO DỊCH THÀNH CÔNG.
        </h1>
      ) : (
        <h1 className="text-5xl text-red-600 font-semibold">
          GIAO DỊCH THẤT BẠI.
        </h1>
      )}

      <span className="py-2 cursor-pointer ">
        <Link
          to={`../${Path.MANAGE_PAYMENT}}`}
          className="text-blue-600 font-semibold"
        >
          Quay trở lại trang.
        </Link>{" "}
      </span>
    </div>
  );
};

export default PaymentStatus;
