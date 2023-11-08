import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, RegisterModal } from "../components/";

import icons from "../utils/icons";
import anonAvatar from "../assets/anon-avatar.png";

const { BsDot, BsTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

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

      <Button
        text="Đăng kí ngay"
        textColor="text-white"
        fontSz="font-medium"
        bgColor="bg-secondary1"
        fullWidth
        onClick={() => (isLoggedIn ? setIsRegister(true) : navigate("/login"))}
      />
      {isRegister && <RegisterModal setIsRegister={setIsRegister} />}
    </div>
  );
};

export default memo(BoxInfo);
