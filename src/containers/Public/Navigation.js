import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";
import { apiGetAllCategories } from "../../services/categoryService";

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      const response = await apiGetAllCategories();
      if (response?.data.err === 0) {
        setCategories(response.data.response);
      }
    };
    fetchAllCategories();
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
