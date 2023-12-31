import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { Button, UpdatePost } from "../../components";

import * as actions from "../../store/actions";
import { apiDeletePost } from "../../services";

import { Path } from "../../utils/constants";
import icons from "../../utils/icons";
import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";
import RentersList from "./RentersList";

const { FiEdit, ImBin, AiFillEye } = icons;

const ManagePost = () => {
  const dispatch = useDispatch();

  const { posts_current_user, dataEdit } = useSelector((state) => state.post);

  const [isEdit, setIsEdit] = useState(false);
  const [showRenters, setShowRenters] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, updateData]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  useEffect(() => {
    setPosts(posts_current_user);
  }, [posts_current_user]);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response?.data.err === 0) setUpdateData((prev) => !prev);
    else Swal.fire("Oops!", "Xóa tin đăng thất bại!", "error");
  };

  const handleFilterByStatus = (statusCode) => {
    if (statusCode === 1) {
      const activePost = posts_current_user?.filter((post) =>
        checkStatus(post?.overviews?.expire?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (statusCode === 0) {
      const expiredPosts = posts_current_user?.filter(
        (post) => !checkStatus(post?.overviews?.expire?.split(" ")[3])
      );
      setPosts(expiredPosts);
    } else setPosts(posts_current_user);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          className="outline-none border border-gray-200 rounded-md p-2 shadow-sm"
          onChange={(e) => handleFilterByStatus(+e.target.value)}
        >
          <option value="-1">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Đã hết hạn</option>
        </select>
      </div>
      {posts && posts.length > 0 ? (
        <table className="w-full table-fixed">
          {
            <thead>
              <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1">
                <th>Mã tin</th>
                <th>Ảnh đại diện</th>
                <th>Tiêu đề</th>
                <th>Giá</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th>Danh sách đăng ký</th>
                <th>Tùy chọn</th>
              </tr>
            </thead>
          }
          <tbody>
            {posts?.map((post) => (
              <tr
                className="[&>*]:border [&>*]:p-1 [&>*]:text-center h-20"
                key={post.id}
              >
                <td>{post?.overviews?.code}</td>
                <td className="">
                  <img
                    src={JSON.parse(post?.images?.image)[0] || ""}
                    alt="avatar-post"
                    className="block mr-auto ml-auto w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td>{`${
                  post?.title?.length > 50
                    ? `${post?.title?.slice(0, 50)}...`
                    : post?.title
                }`}</td>
                <td>{post?.attributes?.price}</td>
                <td>{post?.overviews?.created}</td>
                <td>{post?.overviews?.expire}</td>
                <td>
                  {checkStatus(post?.overviews?.expire?.split(" ")[3])
                    ? "Đang hoạt động"
                    : "Đã hết hạn"}
                </td>
                <td>
                  <Button
                    text="Xem người đăng kí"
                    textColor="text-orange-500"
                    fullWidth
                    onClick={() => {
                      dispatch(actions.getRenters(post.id));
                      dispatch(actions.getPostsLimit({ id: post.id }));
                      setTimeout(() => setShowRenters(true), 500);
                      // setShowRenters(true);
                    }}
                  />
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/chi-tiet/${formatVietnameseToString(
                        post?.title?.replace("/", "")
                      )}/${post.id}`}
                      target="_blank"
                    >
                      <Button
                        IcTitle="Xem"
                        IcAfter={AiFillEye}
                        bgColor="bg-secondary1"
                        textColor="text-white"
                        px="px-3"
                        noUnderline
                      />
                    </Link>

                    <Button
                      IcTitle="Sửa"
                      IcAfter={FiEdit}
                      bgColor="bg-green-600"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                      onClick={() => {
                        dispatch(actions.editPost(post));
                        setIsEdit(true);
                      }}
                    />
                    <Button
                      IcTitle="Xóa"
                      IcAfter={ImBin}
                      bgColor="bg-secondary2"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                      onClick={() => handleDeletePost(post.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="w-full">
          Bạn chưa có tin đăng.{" "}
          <Link
            to={`../${Path.CREATE_POST}`}
            className="text-orange-600 font-semibold"
          >
            Nhấn vào đây
          </Link>{" "}
          để đăng tin.
        </span>
      )}
      {showRenters && <RentersList setShowRenters={setShowRenters} />}
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
