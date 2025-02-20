import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { Button, CreatePayment } from "../../components";

import icons from "../../utils/icons";
import { Path } from "../../utils/constants";

import { getContract } from "../../store/actions/rental";
import {
  formatPrice,
  formatPricePerMonth,
} from "../../utils/Common/formatPrice";

const { FiEdit, ImBin, BsClipboard2PlusFill } = icons;

const ManageContract = () => {
  const dispatch = useDispatch();

  const { contracts } = useSelector((state) => state.rental);

  const [isCreateBill, setIsCreateBill] = useState(false);
  const [dataCreateBill, setDataCreateBill] = useState(null);

  useEffect(() => {
    dispatch(getContract());
  }, []);

  return (
    <div className="flex flex-col gap-6 mb-20">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý hợp đồng</h1>
      </div>

      {contracts && contracts.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1">
              <th>Người thuê</th>
              <th>Tiêu đề</th>
              <th>Giá thuê</th>
              <th className="w-[300px]">Mô tả</th>
              <th className="w-[130px]">Ngày thuê</th>
              <th className="w-[130px]">Ngày kết thúc</th>
              <th>Trạng thái</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {contracts?.map((contract) => (
              <tr
                className="[&>*]:border [&>*]:border-gray-300 [&>*]:p-1 [&>*]:text-center"
                key={contract.id}
              >
                <td>{contract?.renter?.name}</td>
                <td>
                  {`${
                    contract?.renter?.renterPost?.title?.length > 50
                      ? `${contract?.renter?.renterPost?.title?.slice(
                          0,
                          40
                        )}...`
                      : contract?.renter?.renterPost?.title
                  }
                  `}
                </td>
                <td>
                  {contract?.room?.monthlyRent
                    ? formatPricePerMonth(
                        +contract?.room?.monthlyRent / Math.pow(10, 6)
                      )
                    : formatPricePerMonth(
                        contract?.renter?.renterPost?.priceNumber.toString()
                      )}
                </td>
                <td className="!text-start h-[100px]">
                  <div>
                    <ul>
                      <li>{`-Tiền cọc: ${formatPrice(
                        +contract?.depositAmount
                      )} `}</li>
                      {contract?.note && (
                        <li>{`- Ghi chú: ${contract?.note}`}</li>
                      )}
                      {contract?.room?.id && (
                        <ul>
                          - Chi tiết phòng:
                          <li>{`+ Tên phòng: ${contract?.room?.roomName}.`}</li>
                          <li>{`+ Giá thuê: ${formatPricePerMonth(
                            +contract?.room?.monthlyRent / Math.pow(10, 6)
                          )}. `}</li>
                          <li>{`+ Điện: ${+contract?.electrictCost}. Nước: ${+contract?.waterCost}. `}</li>
                          <li>{`+ Loại phòng: ${contract?.room?.roomType}.`}</li>
                        </ul>
                      )}
                    </ul>
                  </div>
                </td>
                <td>
                  {moment(contract?.startDate).format(
                    process.env.REACT_APP_FORMAT_DATE
                  )}
                </td>
                <td>
                  {moment(contract?.endDate).format(
                    process.env.REACT_APP_FORMAT_DATE
                  )}
                </td>
                <td className="!text-xs !text-orange-600">
                  {contract?.contractStatus}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      IcTitle="Tạo hóa đơn"
                      IcAfter={BsClipboard2PlusFill}
                      bgColor="bg-secondary1"
                      textColor="text-white"
                      px="px-2"
                      noUnderline
                      onClick={() => {
                        setDataCreateBill(contract);
                        setIsCreateBill(true);
                      }}
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
        <span className="w-full">
          Bạn chưa có hợp đồng nào.{" "}
          <Link
            to={`../${Path.CREATE_CONTRACT}`}
            className="text-orange-600 font-semibold"
          >
            Nhấn vào đây
          </Link>{" "}
          để thêm hợp đồng.
        </span>
      )}
      {isCreateBill ? (
        dataCreateBill?.room?.id ? (
          <CreatePayment
            setIsCreateBill={setIsCreateBill}
            data={dataCreateBill}
          />
        ) : (
          <CreatePayment
            setIsCreateBill={setIsCreateBill}
            data={dataCreateBill}
            type="other"
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManageContract;
