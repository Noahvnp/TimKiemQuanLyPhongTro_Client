import React, { memo } from "react";

import icons from "../utils/icons";
import anonAvatar from "../assets/anon-avatar.png";
import { Button } from "../components/";

const { BsDot, BsTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
  return (
    <div className="bg-yellow-400  border border-gray-300 rounded-md flex flex-col items-center gap-2 p-4">
      <img
        src={userData?.avatar || anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl">{userData?.name}</h3>
      <span className=" flex items-center justify-center">
        <BsDot color="green" size={30} />
        <span>Đang hoạt động</span>
      </span>

      <a
        href={`tel:${userData?.phone}`}
        className="bg-[#13BB7B] w-full rounded-md py-2 text-white font-bold text-lg flex items-center justify-center gap-1"
      >
        {" "}
        <BsTelephoneFill /> {userData?.phone}
      </a>

      <a
        href={`https://zalo.me/${userData?.zalo}`}
        className="bg-white border border-gray-600 w-full rounded-md py-1 font-bold text-lg flex items-center justify-center"
      >
        {" "}
        <SiZalo color="blue" size={32} />
      </a>
    </div>
  );
};

export default memo(BoxInfo);
