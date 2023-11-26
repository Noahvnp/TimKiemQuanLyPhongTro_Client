import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { apiCreatePaymentVNPay } from "../../services";
import { verifyPayment } from "../../store/actions";

const Payment = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [bankCode, setBankcode] = useState("");
  const [language, setLanguage] = useState("vn");

  const handleCheckout = async (e) => {
    const amount = location?.state?.amount;
    const paymentId = location?.state?.paymentId;
    await apiCreatePaymentVNPay({
      amount,
      bankCode,
      language,
      paymentId,
    }).then((response) => {
      response && dispatch(verifyPayment(paymentId));
      window.location.href = response.data.vnpUrl;
    });
  };

  return (
    <div className="px-6 py-4 flex flex-col items-center gap-6">
      <h3 className="text-xl font-medium">Thanh toán VN PAY</h3>
      {location?.state?.title && (
        <h3 className="text-3xl font-medium">{location?.state?.title}</h3>
      )}
      <div className="w-3/5 flex flex-col justify-center gap-6">
        <div className="flex flex-col justify-center gap-2">
          <label className="text-lg font-semibold">Số tiền: </label>
          <input
            className="bg-gray-100 border border-gray-300 outline-none rounded-md p-1"
            id="amount"
            name="amount"
            placeholder="Số tiền"
            readOnly
            value={location?.state?.amount}
          />
        </div>

        <div>
          <label className="text-lg font-semibold">
            Chọn Phương thức thanh toán:
          </label>
          <div className="flex flex-col">
            <label htmlFor="defaultPaymentMethod">
              <input
                type="radio"
                name="bankCode"
                id="defaultPaymentMethod"
                checked={bankCode === ""}
                value=""
                onChange={(e) => setBankcode(e.target.value)}
              />{" "}
              Cổng thanh toán VNPAYQR
            </label>

            <label htmlFor="vnpayqrPaymentMethod">
              <input
                type="radio"
                name="bankCode"
                id="vnpayqrPaymentMethod"
                checked={bankCode === "VNPAYQR"}
                value="VNPAYQR"
                onChange={(e) => setBankcode(e.target.value)}
              />{" "}
              Thanh toán qua ứng dụng hỗ trợ VNPAYQR
            </label>

            <label htmlFor="vnbankPaymentMethod">
              <input
                type="radio"
                name="bankCode"
                id="vnbankPaymentMethod"
                checked={bankCode === "VNBANK"}
                value="VNBANK"
                onChange={(e) => setBankcode(e.target.value)}
              />{" "}
              Thanh toán qua ATM-Tài khoản ngân hàng nội địa
            </label>

            <label htmlFor="intcardPaymentMethod">
              <input
                type="radio"
                name="bankCode"
                id="intcardPaymentMethod"
                checked={bankCode === "INTCARD"}
                value="INTCARD"
                onChange={(e) => setBankcode(e.target.value)}
              />{" "}
              Thanh toán qua thẻ quốc tế
            </label>
          </div>
        </div>

        <div>
          <label className="text-lg font-semibold">Ngôn ngữ:</label>
          <div className="flex flex-col gap-1">
            <label htmlFor="vnLanguage">
              <input
                type="radio"
                name="language"
                id="vnLanguage"
                value="vn"
                checked={language === "vn"}
                onChange={(e) => setLanguage(e.target.value)}
              />{" "}
              Tiếng việt
            </label>

            <label htmlFor="enLanguage">
              <input
                type="radio"
                name="language"
                id="enLanguage"
                checked={language === "en"}
                value="en"
                onChange={(e) => setLanguage(e.target.value)}
              />{" "}
              Tiếng anh
            </label>
          </div>
        </div>

        <button
          className="w-full bg-green-400 text-white text-xl font-semibold p-2 rounded-md"
          id="btnPopup"
          type="submit"
          onClick={handleCheckout}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Payment;
