import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";

import { Path } from "../utils/constants";

const Navigation = ({ isAdmin }) => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div
      className={`w-full h-[40px] flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center bg-secondary1 text-white`}
    >
      <div className="w-3/5 h-full flex items-center text-sm font-medium">
        <div className="h-full flex">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-secondary2 flex items-center p-3 bg-secondary2"
                : "hover:bg-secondary2 flex items-center p-3"
            }
          >
            Trang chủ
          </NavLink>
        </div>
        {categories.length > 0 &&
          categories.map((item) => (
            <div key={item.code} className="h-full flex">
              <NavLink
                to={`/${formatVietnameseToString(item.value)}`}
                target={`${isAdmin ? "_blank" : ""}`}
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-secondary2 flex items-center p-3 bg-secondary2"
                    : "hover:bg-secondary2 flex items-center p-3"
                }
              >
                {item.value}
              </NavLink>
            </div>
          ))}

        <div className="h-full flex">
          <NavLink
            to={`/${Path.CONTACT}`}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-secondary2 flex items-center p-3 bg-secondary2"
                : "hover:bg-secondary2 flex items-center p-3"
            }
          >
            Liên hệ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
