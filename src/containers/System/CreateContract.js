import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  Button,
  CreateRoom,
  DateInput,
  InputFormV2,
  InputReadOnly,
  Select,
} from "../../components";

import icons from "../../utils/icons";

import {
  apiCreateContract,
  apiCreateRoom,
  apiGetPostsLimit,
} from "../../services";
import validateFields from "../../utils/Common/validateFields";

import { reGetRenter, reGetRoom } from "../../store/actions";

const { TbReportMoney, RiCrop2Line, BsStopwatch } = icons;

const CreateContract = ({ users, roomsList, postId }) => {
  const dispatch = useDispatch();

  const [invalidFields, setInvalidFields] = useState([]);
  const [postRenter, setPostRenter] = useState({});
  const [selectedRoomPrice, setSelectedRoomPrice] = useState("");
  const [room, setRoom] = useState({
    roomName: "",
    roomType: "",
    monthlyRent: 0,
  });
  const [notes, setNotes] = useState(null);
  const [payload, setPayload] = useState({
    customer: "",
    room: "",
    depositAmount: "",
    electrictCost: "",
    waterCost: "",
    startDate: "",
    endDate: "",
  });
  const [otherContract, setOtherContract] = useState({
    customer: "",
    depositAmount: "",
    startDate: "",
    endDate: "",
  });

  // render dữ liệu của các bài viết tương ứng với postId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetPostsLimit({ id: postId });
        if (response.status === 200) {
          setPostRenter(response?.data?.response?.rows[0]);
        } else {
          throw new Error("Lỗi khi gọi API");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (payload.room !== "") {
      const selectedRoom = roomsList[postId][0].find(
        (room) => room.id === payload.room
      );

      let roomPrice =
        selectedRoom?.monthlyRent < Math.pow(10, 6)
          ? `${selectedRoom?.monthlyRent} đồng/tháng`
          : `${selectedRoom?.monthlyRent / Math.pow(10, 6)} triệu/tháng`;

      setSelectedRoomPrice(roomPrice);
    }
  }, [payload.room, postId, roomsList]);

  const handleCreateRoom = async () => {
    const { monthlyRent } = room;
    if (monthlyRent) room.monthlyRent = +monthlyRent;

    const finalPayload = { ...room, postId: postRenter?.id };
    const result = await validateFields(finalPayload, setInvalidFields);

    if (result === 0) {
      const response = await apiCreateRoom(finalPayload);
      if (response?.data.err === 0) {
        Swal.fire("Thành công!", "Tạo phòng mới thành công!", "success").then(
          () => {
            setRoom({
              roomName: "",
              roomType: "",
              monthlyRent: 0,
            });
            dispatch(reGetRoom());
          }
        );
      } else {
        Swal.fire("Oops!", response?.data?.msg, "error");
      }
    }
  };

  const handleSubmit = async () => {
    let finalPayload = {};
    if (postRenter?.overviews?.type !== "CTPT") {
      finalPayload = {
        ...otherContract,
        postId: postRenter?.id,
        categoryCode: postRenter?.overviews?.type,
      };
    } else {
      finalPayload = {
        ...payload,
        postId: postRenter?.id,
        categoryCode: postRenter?.overviews?.type,
      };
    }
    // console.log(finalPayload);
    const result = await validateFields(finalPayload, setInvalidFields);
    if (result === 0) {
      if (notes) finalPayload.notes = notes;
      const response = await apiCreateContract(finalPayload);
      if (response?.data.err === 0) {
        Swal.fire("Thành công!", response?.data?.msg, "success").then(() => {
          postRenter?.overviews?.type === "CTPT"
            ? setPayload({
                customer: "",
                room: "",
                depositAmount: "",
                electrictCost: "",
                waterCost: "",
                startDate: "",
                endDate: "",
              })
            : setOtherContract({
                customer: "",
                depositAmount: "",
                startDate: "",
                endDate: "",
              });

          dispatch(reGetRoom());
          dispatch(reGetRenter());
        });
      } else {
        Swal.fire("Oops!", response?.data?.msg, "error");
      }
    }
  };

  return (
    <div className="px-2 border-b border-gray-200">
      <div className="p-3">
        <h3>Mã tin: {postRenter?.overviews?.code}</h3>
        <h2 className="text-lg font-semibold">Tiêu đề: {postRenter?.title}</h2>
        <h3>Địa chỉ: {postRenter?.address}</h3>

        <div className="flex items-center justify-span gap-10 [&>*]:flex [&>*]:items-center [&>*]:gap-1">
          <span className="font-semibold text-lg text-green-600">
            <TbReportMoney color="gray" />
            {postRenter?.attributes?.price}
          </span>
          <span className="">
            <RiCrop2Line color="gray" />
            {postRenter?.attributes?.acreage}
          </span>
          <span className="">
            <BsStopwatch color="gray" />
            {postRenter?.attributes?.published}
          </span>
        </div>
      </div>
      <div className="w-full flex">
        {postRenter?.overviews?.type !== "CTPT" && (
          <div className="w-2/3 m-2 p-2 px-4 bg-blue-200 rounded-md grid grid-rows-3 grid-flow-col gap-4 shadow-sm">
            <Select
              label="Người thuê"
              option={users[0].map((user) => ({
                code: user.id,
                value: user.name,
              }))}
              name="customer"
              small={
                users[0].length > 0
                  ? `Có ${users[0].length} người chờ thuê`
                  : "Chưa có người đăng kí"
              }
              value={otherContract.customer}
              setValue={setOtherContract}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <div>
              <label htmlFor="desc" className="font-medium">
                Ghi chú
              </label>
              <textarea
                id="desc"
                className="outline-none mt-1 rounded-md w-full"
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
                name="note"
              />
            </div>
            <Button
              text="TẠO HỢP ĐỒNG"
              fontSz="font-bold text-xl"
              textColor="text-white"
              className="my-3 col-span-3 bg-green-500"
              onClick={() => handleSubmit(postRenter?.id)}
            />
            <InputReadOnly
              label="Giá cho thuê"
              value={postRenter?.attributes?.price}
            />

            <InputFormV2
              label="Tiền cọc"
              unit={"Đồng"}
              small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
              name="depositAmount"
              value={otherContract.depositAmount}
              setValue={setOtherContract}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <DateInput
              label="Ngày thuê"
              type="date"
              name="startDate"
              value={otherContract.startDate}
              setValue={setOtherContract}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <DateInput
              label="Ngày trả"
              type="date"
              name="endDate"
              value={otherContract.endDate}
              setValue={setOtherContract}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>
        )}
        {postRenter?.overviews?.type === "CTPT" && (
          <>
            <div className="w-2/3 m-2 p-2 px-4 bg-blue-200 rounded-md grid grid-rows-4 grid-flow-col gap-4 shadow-sm">
              <Select
                label="Phòng"
                option={roomsList[postId][0].map((room) => ({
                  code: room.id,
                  value: room.roomName,
                  monthlyRent: room.monthlyRent,
                }))}
                name="room"
                small={
                  roomsList[postId][0].length > 0
                    ? `Có ${roomsList[postId][0].length} phòng đang trống`
                    : "Không có phòng trống"
                }
                value={payload.room}
                setValue={setPayload}
                setSelectedRoomPrice
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <Select
                label="Người thuê"
                option={users[0].map((user) => ({
                  code: user.id,
                  value: user.name,
                }))}
                name="customer"
                small={
                  users[0].length > 0
                    ? `Có ${users[0].length} người chờ thuê`
                    : "Chưa có người đăng kí"
                }
                value={payload.customer}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputReadOnly
                label="Giá cho thuê"
                value={
                  selectedRoomPrice
                    ? selectedRoomPrice
                    : postRenter?.attributes?.price
                }
              />
              <Button
                text="TẠO HỢP ĐỒNG"
                fontSz="font-bold text-xl"
                textColor="text-white"
                className="m-2 col-span-3 bg-green-500"
                onClick={() => handleSubmit(postRenter?.id)}
              />

              <InputFormV2
                label="Tiền cọc"
                name="depositAmount"
                unit={"Đồng"}
                small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                value={payload.depositAmount}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputFormV2
                label="Giá điện / kWh"
                name="electrictCost"
                unit={"Đồng"}
                small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                value={payload.electrictCost}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputFormV2
                label="Giá nước / m3"
                name="waterCost"
                value={payload.waterCost}
                unit={"Đồng"}
                small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <DateInput
                label="Ngày vào ở"
                type="date"
                name="startDate"
                value={payload.startDate}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <DateInput
                label="Ngày trả phòng"
                type="date"
                name="endDate"
                value={payload.endDate}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <div>
                <label htmlFor="desc" className="font-medium">
                  Ghi chú
                </label>
                <textarea
                  id="desc"
                  className="outline-none mt-1 rounded-md w-full"
                  value={notes || ""}
                  onChange={(e) => setNotes(e.target.value)}
                  name="note"
                />
              </div>
            </div>
            <CreateRoom
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              payload={room}
              setPayload={setRoom}
              onClick={handleCreateRoom}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CreateContract);
