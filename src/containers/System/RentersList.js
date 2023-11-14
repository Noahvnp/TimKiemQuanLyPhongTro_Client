import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import { Button, Loading } from "../../components";

import icons from "../../utils/icons";

import * as actions from "../../store/actions";
import { apiAcceptRenter, apiGetRenter } from "../../services";

const {
  BsFillCheckCircleFill,
  ImBin,
  TbReportMoney,
  RiCrop2Line,
  BsStopwatch,
  MdClose,
} = icons;

const RentersList = ({ setShowRenters }) => {
  const dispatch = useDispatch();

  const { renters } = useSelector((state) => state.rental);
  const { posts } = useSelector((state) => state.post);

  const [rentersList, setRentersList] = useState(renters ? renters : null);
  const [isShow, setIsShow] = useState(0);

  const handleNoRegister = () => {
    Swal.fire("Oops!", "Chưa có người đăng ký.", "error").then(() =>
      setShowRenters(false)
    );
  };

  const handleAccepter = async (renterId) => {
    const response = await apiAcceptRenter(renterId);
    if (response.statusCode === 200)
      dispatch(actions.getRenters({ postId: posts[0]?.id }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetRenter({
          postId: posts[0]?.id,
          isConfirmed: 0,
        });
        if (response.status === 200) {
          setRentersList(response?.data?.response?.rows);
          response?.data?.response?.count > 0 ? setIsShow(1) : setIsShow(-1);
        } else {
          throw new Error("Lỗi khi gọi API");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="bg-overlay-70 fixed py-10 top-0 left-0 right-0 bottom-0 flex justify-center z-20"
      onClick={(e) => {
        e.stopPropagation();
        setShowRenters(false);
      }}
    >
      <div
        className="bg-white w-[70%] h-fit overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isShow === 0 ? (
          <></>
        ) : isShow > 0 ? (
          <div className="p-6">
            <h1 className="text-3xl font-medium py-2 border-b border-gray-200 flex justify-between items-center">
              Danh sách đăng ký thuê
              <span
                title="Đóng"
                className="bg-gray-300 rounded-md cursor-pointer"
                onClick={() => setShowRenters(false)}
              >
                <MdClose color="red" size={30} />
              </span>
            </h1>
            <div className="mt-2 p-3">
              <h3 className="text-lg font-medium">
                Tiêu đề: {posts[0]?.title}
              </h3>
              <div className="flex items-center justify-start gap-10 [&>*]:flex [&>*]:items-center [&>*]:gap-1">
                <span className="font-semibold text-lg text-green-600">
                  <TbReportMoney color="gray" />
                  {posts[0]?.attributes?.price}
                </span>
                <span className="">
                  <RiCrop2Line color="gray" />
                  {posts[0]?.attributes?.acreage}
                </span>
                <span className="">
                  <BsStopwatch color="gray" />
                  {posts[0]?.attributes?.published}
                </span>
              </div>
            </div>

            <table className="my-2 w-full table-fixed">
              <thead>
                <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1 h-10">
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Năm sinh</th>
                  <th>Công việc</th>
                  <th>Quê quán</th>
                  <th>Thời gian</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {rentersList &&
                  Object.values(rentersList)[0] !== "" &&
                  rentersList?.map((renter) => (
                    <tr
                      className="[&>*]:border [&>*]:p-1 [&>*]:text-center h-12"
                      key={renter.id}
                    >
                      <td>{renter.name}</td>
                      <td>{renter.phone}</td>
                      <td>{renter.yearOfBirth}</td>
                      <td>{renter.work}</td>
                      <td>{renter.hometown}</td>
                      <td>
                        {moment(renter.createdAt).format("DD-MM-YYYY HH:mm")}
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-6">
                          <Button
                            IcTitle="Đồng ý"
                            IcAfter={BsFillCheckCircleFill}
                            textColor="text-white"
                            bgColor="bg-green-600"
                            px="px-3"
                            onClick={() => handleAccepter(renter.id)}
                          />
                          <Button
                            IcTitle="Từ chối"
                            IcAfter={ImBin}
                            textColor="text-white"
                            bgColor="bg-secondary2"
                            px="px-3"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : isShow < 0 ? (
          handleNoRegister()
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default memo(RentersList);
