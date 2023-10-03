import React from "react";
import { useSelector } from "react-redux";

import anonAvatar from "../assets/anon-avatar.png";

const User = () => {
  const { current_user } = useSelector((state) => state.user);
  return (
    <div className="flex items-center gap-2">
      <img
        src={current_user?.avatar || anonAvatar}
        alt="avatar"
        className="w-10 h-10 object-cover rounded-full border border-gray-300"
      />
      <div className="flex items-center flex-col">
        <span>
          Xin chào, <span className="font-semibold">{current_user?.name}</span>
        </span>
        <small>
          Mã tài khoản:{" "}
          <span className="font-semibold">
            {current_user?.id?.match(/\d/g)?.join("")?.slice(0, 6)}
          </span>
        </small>
      </div>
    </div>
  );
};

export default User;
