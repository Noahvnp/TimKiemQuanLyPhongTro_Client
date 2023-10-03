import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import anonAvatar from "../../assets/anon-avatar.png";
import icons from "../../utils/icons";

import * as actions from "../../store/actions";

import menuSidebar from "../../utils/menuSidebar";

const { AiOutlineLogout } = icons;

const activeStyle =
  "hover:bg-gray-200 font-bold flex items-center gap-3 border-b border-gray-200 py-2 rounded-md";
const notActiveStyle =
  "hover:bg-gray-200 flex items-center gap-3 border-b border-gray-200 py-2 rounded-md cursor-pointer";

const Sidebar = () => {
  const { current_user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-[256px] flex-none px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={current_user?.avatar || anonAvatar}
            alt="avatar"
            className="w-12 h-12  object-cover rounded-full border border-gray-300"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{current_user?.name}</span>
            <small>{current_user?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {current_user?.id?.match(/\d/g)?.join("")?.slice(0, 6)}
          </small>
        </span>
      </div>
      <div className="mt-10">
        {menuSidebar.map((item) => (
          <NavLink
            to={item?.path}
            key={item?.id}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item?.icon}
            {item?.text}
          </NavLink>
        ))}
        <span
          className={notActiveStyle}
          onClick={() => dispatch(actions.logout())}
        >
          {" "}
          <AiOutlineLogout /> Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
