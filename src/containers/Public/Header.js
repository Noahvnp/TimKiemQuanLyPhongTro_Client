import React, { useEffect, useCallback, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/logowithoutbg.png";

import icons from "../../utils/icons";
import { Path } from "../../utils/constants";
import { Button, User } from "../../components";
import * as actions from "../../store/actions";
import menuManager from "../../utils/menuManager";

const { BsChevronDown, AiOutlinePlusCircle, AiOutlineLogout } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const headerRef = useRef();
  const [searchParams] = useSearchParams();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isShowMenu, setIsShowMenu] = useState(false);

  const goLogin = useCallback(
    (flag) => {
      navigate(Path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams, location?.pathname]);

  return (
    <div ref={headerRef} className="w-3/5 flex items-center justify-between">
      <Link to={"/"}>
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>
      <div className="flex items-center gap-1">
        {!isLoggedIn && (
          <div className="flex items-center gap-1">
            <small>Phongtro123.com xin chào!</small>
            <Button
              text={"Đăng nhập"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => goLogin(false)}
            />
            <Button
              text={"Đăng ký"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => goLogin(true)}
            />
          </div>
        )}

        {isLoggedIn && (
          <div className="flex items-center gap-10 relative">
            <User />
            <Button
              text={"Quản lý tài khoản"}
              IcAfter={BsChevronDown}
              textColor="text-white"
              bgColor="bg-blue-700"
              onClick={() => setIsShowMenu((prev) => !prev)}
            />
            {isShowMenu && (
              <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col gap-2">
                {menuManager.map((item) => (
                  <Link
                    to={item?.path}
                    key={item?.id}
                    className="hover:text-orange-500 text-blue-600 flex items-center gap-2 border-b border-gray-200 py-2"
                  >
                    {item?.icon}
                    {item?.text}
                  </Link>
                ))}
                <span
                  onClick={() => {
                    setIsShowMenu(false);
                    dispatch(actions.logout());
                  }}
                  className="cursor-pointer hover:text-orange-500 text-blue-600 flex items-center gap-2  py-2"
                >
                  <AiOutlineLogout />
                  Đăng xuất
                </span>
              </div>
            )}
          </div>
        )}
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
