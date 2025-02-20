import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FcRefresh } from "react-icons/fc";

import { InputReadOnly, InputFormV2, DateInput, Button, CloseBtn } from ".";

import { formatPrice, formatPricePerMonth } from "../utils/Common/formatPrice";
import validateFields from "../utils/Common/validateFields";

import { apiCreatePayment } from "../services";

const CreatPayment = ({ setIsCreateBill, data, type }) => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [notes, setNotes] = useState();
  const [payload, setPayload] = useState(() => {
    const initData =
      type === "other"
        ? {
            name: data?.renter?.name || "",
            phone: data?.renter?.phone || "",
            billName: "",
            dateBill: new Date(),
            priceRental: data?.room?.monthlyRent
              ? +data?.room?.monthlyRent
              : +data?.renter?.renterPost?.priceNumber * Math.pow(10, 6),
            amount: 0,
          }
        : {
            name: data?.renter?.name || "",
            phone: data?.renter?.phone || "",
            roomName: data?.room?.roomName || "",
            billName: "",
            dateBill: new Date(),
            electricIndex_old: 0,
            electricIndex_new: 0,
            waterIndex_old: 0,
            waterIndex_new: 0,
            priceRental: data?.room?.monthlyRent
              ? +data?.room?.monthlyRent
              : +data?.renter?.renterPost?.priceNumber * Math.pow(10, 6),
            amount: 0,
          };
    return initData;
  });

  const handleCalcPrice = () => {
    if (type === "other") {
      return (payload.amount = +payload?.priceRental);
    }

    if (
      +payload?.electricIndex_old <= +payload?.electricIndex_new &&
      +payload?.waterIndex_old <= +payload?.waterIndex_new
    ) {
      const electricCost =
        data?.electrictCost *
        (+payload?.electricIndex_new - +payload?.electricIndex_old);

      const waterCost =
        data?.waterCost * (+payload?.waterIndex_new - +payload?.waterIndex_old);

      const total = electricCost + waterCost + +payload?.priceRental;
      payload.amount = total;

      invalidFields && invalidFields.filter((field) => field.name === "amount");
    } else {
      payload.amount = 0;
    }
  };

  useEffect(() => {
    invalidFields && setInvalidFields([]);
    handleCalcPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data?.waterCost,
    data?.electrictCost,
    payload?.electricIndex_old,
    payload?.electricIndex_new,
    payload?.waterIndex_old,
    payload?.waterIndex_new,
    payload,
  ]);

  const handleSubmit = async () => {
    const result = await validateFields(payload, setInvalidFields);
    if (result === 0) {
      let finalPayload = {
        ...payload,
        dateBill: `${
          payload.dateBill.getMonth() + 1
        }/${payload.dateBill.getFullYear()}`,
        renterId: data?.renter?.id,
        contractId: data?.id,
      };
      if (notes) payload.notes = notes;
      const response = await apiCreatePayment(finalPayload);
      if (response?.data.err === 0) {
        Swal.fire("Thành công!", response?.data?.msg, "success").then(() => {
          type === "other"
            ? setPayload({
                name: data?.renter?.name || "",
                phone: data?.renter?.phone || "",
                billName: "",
                dateBill: new Date(),
                priceRental: data?.room?.monthlyRent
                  ? +data?.room?.monthlyRent
                  : +data?.renter?.renterPost?.priceNumber * Math.pow(10, 6),
                amount: 0,
              })
            : setPayload({
                name: data?.renter?.name || "",
                phone: data?.renter?.phone || "",
                roomName: data?.room?.roomName || "",
                billName: "",
                dateBill: new Date(),
                electricIndex_old: 0,
                electricIndex_new: 0,
                waterIndex_old: 0,
                waterIndex_new: 0,
                priceRental: data?.room?.monthlyRent
                  ? +data?.room?.monthlyRent
                  : +data?.renter?.renterPost?.priceNumber * Math.pow(10, 6),
                amount: 0,
              });
          setNotes("");
        });
      } else {
        Swal.fire("Oops!", response?.data?.msg, "error");
      }
    }
  };

  return (
    <div
      className="bg-overlay-70 fixed top-0 left-0 right-0 bottom-0 flex justify-center z-20"
      onClick={(e) => {
        e.stopPropagation();
        setIsCreateBill(false);
      }}
    >
      <div
        className="bg-white max-w-600 w-full h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-3">
          <h1 className="text-3xl font-medium py-2 border-b border-gray-200 flex justify-between items-center">
            Hóa đơn đóng tiền theo tháng
            <CloseBtn setShow={setIsCreateBill} />
          </h1>
          <div className="flex gap-4">
            <div className="py-3 flex flex-col flex-auto gap-5">
              <InputFormV2
                label="Tên hóa đơn"
                value={payload.billName}
                setValue={setPayload}
                name="billName"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <div className="grid grid-cols-2 gap-7">
                <InputReadOnly
                  label={"Thông tin liên hệ"}
                  value={payload?.name}
                />
                <InputReadOnly label={"Điện thoại"} value={payload?.phone} />
              </div>

              <div className="grid grid-cols-2 gap-7">
                {!type ? (
                  <InputReadOnly
                    label={"Tên phòng"}
                    value={payload?.roomName}
                  />
                ) : (
                  <div>
                    <label htmlFor="desc" className="font-medium">
                      Ghi chú
                    </label>
                    <textarea
                      id="desc"
                      className="outline-blue-300 border-2 border-gray-200 mt-1 rounded-md w-full"
                      value={notes || ""}
                      onChange={(e) => setNotes(e.target.value)}
                      name="note"
                    />
                  </div>
                )}
                <DateInput
                  type="month"
                  name="dateBill"
                  label="Chọn Tháng"
                  value={payload?.dateBill}
                  setValue={setPayload}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>

              {!type && (
                <>
                  <div className="flex justify-between items-center">
                    <InputFormV2
                      label="Chỉ số điện cũ"
                      value={payload.electricIndex_old}
                      setValue={setPayload}
                      unit="kWh"
                      name="electricIndex_old"
                      invalidFields={invalidFields}
                      setInvalidFields={setInvalidFields}
                    />
                    <InputFormV2
                      label="Chỉ số điện mới"
                      value={payload.electricIndex_new}
                      setValue={setPayload}
                      unit="kWh"
                      name="electricIndex_new"
                      invalidFields={invalidFields}
                      setInvalidFields={setInvalidFields}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <InputFormV2
                      label="Chỉ số nước cũ"
                      value={payload.waterIndex_old}
                      setValue={setPayload}
                      unit="m3"
                      name="waterIndex_old"
                      invalidFields={invalidFields}
                      setInvalidFields={setInvalidFields}
                    />
                    <InputFormV2
                      label="Chỉ số nước mới"
                      value={payload.waterIndex_new}
                      setValue={setPayload}
                      unit="m3"
                      name="waterIndex_new"
                      invalidFields={invalidFields}
                      setInvalidFields={setInvalidFields}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-6">
                <InputReadOnly
                  label="Giá thuê:"
                  value={formatPricePerMonth(
                    +payload?.priceRental / Math.pow(10, 6)
                  )}
                />
                <div className="flex items-center justify-start gap-4">
                  <div className="flex flex-col">
                    <InputReadOnly
                      label="Tổng tiền:"
                      value={
                        +payload?.amount === 0
                          ? payload?.amount
                          : formatPrice(payload?.amount)
                      }
                      onFocus={() => invalidFields && setInvalidFields([])}
                    />
                    <small className="text-red-500 text-xs">
                      {invalidFields?.some(
                        (field) => field.name === "amount"
                      ) &&
                        invalidFields?.find((field) => field.name === "amount")
                          .message}
                    </small>
                  </div>
                  <span
                    title="Tính lại"
                    className="mt-8 cursor-pointer"
                    onClick={() => {
                      handleCalcPrice();
                    }}
                  >
                    <FcRefresh size={24} />
                  </span>
                </div>
              </div>
              {!type && (
                <div className="w-full">
                  <label htmlFor="desc" className="font-medium">
                    Ghi chú
                  </label>
                  <textarea
                    id="desc"
                    className="outline-blue-300 border-2 border-gray-200 rounded-md w-full"
                    value={notes || ""}
                    onChange={(e) => setNotes(e.target.value)}
                    name="note"
                  />
                </div>
              )}
              <Button
                text="TẠO HÓA ĐƠN"
                fullWidth
                noUnderline
                bgColor="bg-green-500"
                className="text-white font-bold py-3 mt-1"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatPayment;
