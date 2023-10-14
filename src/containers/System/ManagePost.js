import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Button, UpdatePost } from "../../components";

import * as actions from "../../store/actions";

const ManagePost = () => {
  const dispatch = useDispatch();

  const { posts_current_user, dataEdit } = useSelector((state) => state.post);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );
  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select className="outline-none border border-gray-200 rounded-md p-2 shadow-sm">
          <option>Lọc theo trạng thái</option>
        </select>
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1">
            <th>Mã tin</th>
            <th>Ảnh đại diện</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {posts_current_user ? (
            posts_current_user?.map((post) => (
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
                  <div className="flex items-center justify-evenly">
                    <Button
                      text="Sửa"
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
                      text="Xóa"
                      bgColor="bg-secondary2"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <span>Bạn chưa có tin đăng. Nhấn vào đây để đăng tin.</span>
          )}
        </tbody>
      </table>

      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
