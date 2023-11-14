import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { apiGetRenter, apiGetRooms } from "../../services";
import CreateContract from "./CreateContract";

const ManageRenter = () => {
  const dispatch = useDispatch();

  const { posts_current_user } = useSelector((state) => state.post);
  const { reGetRoom, reGetRenter } = useSelector((state) => state.rental);

  const [rentersList, setRentersList] = useState({});
  const [roomsList, setRoomsList] = useState({});

  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);

  useEffect(() => {
    try {
      let objRentersWithPostId = {};
      let objRoomsWithPostId = {};

      posts_current_user &&
        posts_current_user?.map(async (post) => {
          const rentersResponse = await apiGetRenter({
            postId: post?.id,
            isConfirmed: 1,
            isRented: 0,
          });

          const roomResponse = await apiGetRooms({
            postId: post?.id,
            roomStatus: "Trống",
          });

          // Kiểm tra xem có các obj tương ứng với postId chưa
          if (
            Object.keys(objRentersWithPostId)?.some(
              (item) => item === post?.id
            ) ||
            Object.keys(objRoomsWithPostId)?.some((item) => item === post?.id)
          ) {
            // Nếu đã có thì lấy obj đó với key là postId truyền vào thêm dữ liệu mới
            if (rentersResponse.status === 200 || roomResponse.status === 200) {
              objRentersWithPostId[post?.id] = [
                ...objRentersWithPostId[post?.id],
                rentersResponse?.data?.response?.rows,
              ];

              objRoomsWithPostId[post?.id] = [
                ...objRoomsWithPostId[post?.id],
                roomResponse?.data?.response?.rows,
              ];
            } else {
              throw new Error("Lỗi khi gọi API");
            }
          } else {
            // Nếu chưa có thì lấy obj và tạo obj mới với key là postId truyền vào thêm dữ liệu mới
            if (rentersResponse.status === 200 || roomResponse.status === 200) {
              objRentersWithPostId = {
                ...objRentersWithPostId,
                [post?.id]: [rentersResponse?.data?.response?.rows],
              };

              objRoomsWithPostId = {
                ...objRoomsWithPostId,
                [post?.id]: [roomResponse?.data?.response?.rows],
              };
            } else {
              throw new Error("Lỗi khi gọi API");
            }
          }
        });

      setTimeout(() => {
        setRentersList(objRentersWithPostId);
        setRoomsList(objRoomsWithPostId);
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  }, [posts_current_user, reGetRoom, reGetRenter]);

  const keyOfPosts = Object.keys(rentersList);

  return (
    <div className="flex flex-col gap-6 mb-20">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-medium ">Tạo hợp đồng</h1>
      </div>
      {keyOfPosts?.map((key) => (
        <div key={key}>
          <CreateContract
            users={rentersList[key]}
            roomsList={roomsList}
            postId={key}
          />
        </div>
      ))}
    </div>
  );
};

export default ManageRenter;
