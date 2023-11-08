import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

import { Button } from "../../components";

import icons from "../../utils/icons";

const { AiFillWarning, TbLock } = icons;

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(actions.getAllUsers());
  }, []);

  console.log(users);

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý người dùng</h1>
      </div>
      {users && users.length > 0 && (
        <table className="w-full table-fixed shadow-lg">
          <thead>
            <tr className=" bg-secondary1 text-white [&>*]:border [&>*]:p-1">
              <th>Mã thành viên</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Ngày tạo tài khoản</th>
              <th>Số bài đăng</th>
              <th>Trạng thái</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                className="[&>*]:border [&>*]:p-1 [&>*]:text-center h-16"
                key={user?.id}
              >
                <td>{`#${user?.id?.match(/\d/g)?.join("")?.slice(0, 6)}`}</td>
                <td>{user?.name}</td>
                <td>{user?.phone}</td>
                <td>
                  {new Date()
                    .toISOString(user?.createdAt)
                    .replace(/T.*/, "")
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td>0</td>
                <td>bth</td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      IcAfter={AiFillWarning}
                      IcTitle="Cảnh báo"
                      bgColor="bg-yellow-500"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                      // onClick={() => {
                      //   dispatch(actions.editPost(post));
                      //   setIsEdit(true);
                      // }}
                    />
                    <Button
                      IcAfter={TbLock}
                      IcTitle="Khóa"
                      bgColor="bg-secondary2"
                      textColor="text-white"
                      px="px-3"
                      noUnderline
                      // onClick={() => handleDeletePost(post.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
