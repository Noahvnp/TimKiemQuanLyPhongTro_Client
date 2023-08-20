import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logowithoutbg.png";

import icons from "../../utils/icons";
import { Path } from "../../utils/constants";
import { Button } from "../../components";

const { AiOutlinePlusCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(Path.LOGIN);
  }, []);

  return (
    <div className="w-1100 flex items-center justify-between">
      <img
        src={logo}
        alt="logo"
        className="w-[240px] h-[70px] object-contain"
      />
      <div className="flex items-center gap-1">
        <small>Phongtro123.com xin chào!</small>
        <Button
          text={"Đăng nhập"}
          textColor="text-white"
          bgColor="bg-[#3961fb]"
          onClick={goLogin}
        />
        <Button
          text={"Đăng ký"}
          textColor="text-white"
          bgColor="bg-[#3961fb]"
        />
        <Button
          text={"Đăng tin mới"}
          textColor="text-white"
          bgColor="bg-secondary2"
          IcAfter={AiOutlinePlusCircle}
        />
      </div>
    </div>
  );
};

export default Header;
