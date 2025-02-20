import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

import { Button } from "../../components";

import icons from "../../utils/icons";
import { formatPrice } from "../../utils/Common/formatPrice";

import {
  getPayments,
  getYourPayments,
  reGetPayment,
  reGetYourPayment,
} from "../../store/actions";
import { apiUpdatePayment, apiVerifyPayment } from "../../services";

const { FiEdit, ImBin, AiFillEye, FaCheck } = icons;

const ManagePayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { payments, your_payment, reGetYourPayments, reGetPayments } =
    useSelector((state) => state.rental);

  const [isManagePayment, setIsManagePayment] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentFilter, setPaymentFilter] = useState([]);

  useEffect(() => {
    (isManagePayment || reGetPayments) && dispatch(getPayments());
    (!isManagePayment || reGetYourPayments) && dispatch(getYourPayments());
  }, [dispatch, isManagePayment, reGetYourPayments, reGetPayments]);

  const handleFilterByStatus = (statusCode) => {
    if (statusCode === 0) {
      //Đã thanh toán
      isManagePayment && dispatch(getPayments(statusCode));
      !isManagePayment && dispatch(getYourPayments(statusCode));
      setPaymentFilter(true);
    } else if (statusCode === 1) {
      //Chưa thanh toán
      isManagePayment && dispatch(getPayments());
      !isManagePayment && dispatch(getYourPayments());
    }
  };

  const handlePayment = async (
    paymentId,
    paymentMethod,
    paymentTitle,
    amount
  ) => {
    if (paymentMethod === "Thanh toán trực tiếp") {
      const response = await apiUpdatePayment({ paymentId, paymentMethod });
      if (response?.data.err === 0) {
        Swal.fire("Thành công!", response?.data?.msg, "success").then(() => {
          setIsManagePayment(false);
          dispatch(reGetYourPayment());
        });
      } else {
        Swal.fire("Oops!", response?.data?.msg, "error");
      }
    } else if (paymentMethod === "Thanh toán online") {
      navigate(
        {
          pathname: "/he-thong/thanh-toan",
        },
        { state: { amount, paymentTitle, paymentId } }
      );
    } else {
      Swal.fire("Oops!", "Bạn chưa chọn hình thức thanh toán!", "error");
    }
  };

  const handleVerifyPayment = async (paymentId) => {
    const response = await apiVerifyPayment({ paymentId });
    if (response?.data.err === 0) {
      Swal.fire("Thành công!", response?.data?.msg, "success").then(() => {
        setIsManagePayment(true);
        dispatch(reGetPayment());
      });
    } else {
      Swal.fire("Oops!", response?.data?.msg, "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-20">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl flex items-center justify-center gap-6">
          <span
            className={`${
              isManagePayment && "font-semibold text-orange-600 underline"
            } bg-blue-200 font-medium p-4 shadow-md rounded-xl cursor-pointer`}
            onClick={() => setIsManagePayment(true)}
          >
            Quản lý thanh toán
          </span>
          <span
            className={`${
              !isManagePayment && "font-semibold text-orange-600 underline"
            } bg-blue-200 font-medium p-4 shadow-md rounded-xl cursor-pointer`}
            onClick={() => setIsManagePayment(false)}
          >
            Hóa đơn cần thanh toán
          </span>
        </h1>
        {isManagePayment && (
          <select
            className="outline-none border border-gray-200 rounded-md p-2 shadow-sm"
            onChange={(e) => handleFilterByStatus(+e.target.value)}
          >
            <option value="1">Chưa thanh toán</option>
            <option value="0">Đã thanh toán</option>
          </select>
        )}
      </div>

      {isManagePayment ? (
        payments && payments.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1">
                <th>Tên hóa đơn</th>
                <th>Người thuê</th>
                <th>Tổng tiền</th>
                <th className="w-[300px]">Mô tả</th>
                <th className="w-[130px]">Ngày tạo</th>
                <th className="w-[160px]">Ngày thanh toán</th>
                <th>Hình thức</th>
                <th>Trạng thái</th>
                <th>Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr
                  className="[&>*]:border [&>*]:border-gray-300 [&>*]:p-1 [&>*]:text-center"
                  key={payment.id}
                >
                  <td>{payment?.paymentName}</td>
                  <td>{payment?.contract?.renter?.name}</td>
                  <td>{formatPrice(payment?.amount)}</td>
                  <td className="!text-start">
                    <div>
                      <ul>
                        <li>{`-Trả tiền thuê tháng: ${payment?.paymentForMonth}`}</li>
                        {payment?.note && (
                          <li>{`- Ghi chú: ${payment?.note}`}</li>
                        )}
                        {payment?.contract?.roomId && (
                          <ul>
                            -Chi tiết hóa đơn:
                            <li>{`+ Giá điện / kWh: ${payment?.contract?.electrictCost} `}</li>
                            <li>{`+ Giá nước / m3: ${payment?.contract?.waterCost} `}</li>
                            <li>{`+ Chỉ số điện: ${payment?.electricIndex_old} -> ${payment?.electricIndex_new} kWh`}</li>
                            <li>{`+ Chỉ số nước: ${payment?.waterIndex_old} -> ${payment?.waterIndex_new} m3`}</li>
                          </ul>
                        )}
                      </ul>
                    </div>
                  </td>
                  <td>
                    {moment(payment?.createdAt).format(
                      process.env.REACT_APP_FORMAT_DATE
                    )}
                  </td>
                  <td>
                    {payment?.paymentDate
                      ? moment(payment?.paymentDate).format(
                          process.env.REACT_APP_FORMAT_DATE
                        )
                      : "Chưa có"}
                  </td>
                  <td>{payment?.paymentMethod || "Chưa có"}</td>
                  <td>
                    <div className="flex flex-col justify-center items-center">
                      {payment?.paymentStatus}
                      {payment?.paymentStatus === "Chờ xác nhận" && (
                        <span
                          className="font-bold text-blue-600 cursor-pointer hover:underline"
                          onClick={() => handleVerifyPayment(payment.id)}
                        >
                          Xác nhận
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        IcTitle="Xem"
                        IcAfter={AiFillEye}
                        bgColor="bg-secondary1"
                        textColor="text-white"
                        px="px-3"
                        noUnderline
                      />
                      <Button
                        IcTitle="Sửa"
                        IcAfter={FiEdit}
                        bgColor="bg-green-600"
                        textColor="text-white"
                        px="px-2"
                        noUnderline
                      />
                      <Button
                        IcTitle="Xóa"
                        IcAfter={ImBin}
                        bgColor="bg-secondary2"
                        textColor="text-white"
                        px="px-2"
                        noUnderline
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>Bạn chưa có hóa đơn.</>
        )
      ) : your_payment && your_payment.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1">
              <th>Tên hóa đơn</th>
              <th>Người tạo</th>
              <th>Tổng tiền</th>
              <th className="w-[300px]">Mô tả</th>
              <th className="w-[130px]">Ngày tạo</th>
              <th className="w-[220px]">Hình thức</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {your_payment?.map((payment) => (
              <tr
                className="[&>*]:border [&>*]:border-gray-300 [&>*]:p-1 [&>*]:text-center"
                key={payment.id}
              >
                <td>{payment?.paymentName}</td>
                <td>{"Van nam"}</td>
                <td>{formatPrice(payment?.amount)}</td>
                <td className="!text-start">
                  <div>
                    <ul>
                      <li>{`-Trả tiền thuê tháng: ${payment?.paymentForMonth}`}</li>
                      {payment?.note && (
                        <li>{`- Ghi chú: ${payment?.note}`}</li>
                      )}
                      {payment?.contract?.roomId && (
                        <ul>
                          -Chi tiết hóa đơn:
                          <li>Tiền trọ: </li>
                          <li>{`+ Tiền điện: ${formatPrice(
                            +payment?.contract?.electrictCost *
                              (+payment?.electricIndex_new -
                                +payment?.electricIndex_old)
                          )} `}</li>
                          <li>{`+ Tiền nước: ${formatPrice(
                            +payment?.contract?.waterCost *
                              (+payment?.waterIndex_new -
                                +payment?.waterIndex_old)
                          )}`}</li>
                        </ul>
                      )}
                    </ul>
                  </div>
                </td>
                <td>
                  {moment(payment?.createdAt).format(
                    process.env.REACT_APP_FORMAT_DATE
                  )}
                </td>
                <td>
                  <select
                    id={payment.id}
                    className="outline-none border border-gray-300 p-2 rounded-md"
                    value={paymentMethod || ""}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Chọn hình thức</option>
                    <option value="Thanh toán trực tiếp">
                      Thanh toán trực tiếp
                    </option>
                    <option value="Thanh toán online">Thanh toán online</option>
                  </select>
                </td>

                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      IcTitle="Xem"
                      IcAfter={AiFillEye}
                      bgColor="bg-secondary1"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                    />

                    <Button
                      IcTitle="Xác nhận"
                      IcAfter={FaCheck}
                      bgColor="bg-green-600"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                      onClick={() =>
                        handlePayment(
                          payment.id,
                          paymentMethod,
                          payment.paymentName,
                          payment.amount
                        )
                      }
                    />
                    <Button
                      IcTitle="Xóa"
                      IcAfter={ImBin}
                      bgColor="bg-secondary2"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>Bạn chưa có hóa đơn nào cần thanh toán.</>
      )}
    </div>
  );
};

export default ManagePayment;
