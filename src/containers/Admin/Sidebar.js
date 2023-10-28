import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import anonAvatar from "../../assets/anon-avatar.png";
import icons from "../../utils/icons";

import * as actions from "../../store/actions";

import menuAdmin from "../../utils/menuAdmin";

const { AiOutlineLogout } = icons;

const activeStyle =
  "text-white font-bold flex items-center gap-3 border-b border-gray-500 py-2 rounded-md";
const notActiveStyle =
  "text-white flex items-center gap-3 border-b border-gray-500 py-2 rounded-md cursor-pointer";

const Sidebar = () => {
  const { current_user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-[256px] flex-none px-4 py-8 bg-secondary1">
      {current_user && Object.keys(current_user).length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-white">Admin Phongtro123</h2>
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
        </div>
      )}
      <div className="mt-10">
        {menuAdmin.map((item) => (
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
