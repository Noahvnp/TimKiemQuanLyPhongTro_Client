import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import * as actions from "../../store/actions";

import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";

const Navigation = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.getAllCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-[40px] flex justify-center items-center bg-secondary1 text-white">
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
          categories.map((item) => {
            return (
              <div key={item.code} className="h-full flex">
                <NavLink
                  to={formatVietnameseToString(item.value)}
                  className={({ isActive }) =>
                    isActive
                      ? "hover:bg-secondary2 flex items-center p-3 bg-secondary2"
                      : "hover:bg-secondary2 flex items-center p-3"
                  }
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
