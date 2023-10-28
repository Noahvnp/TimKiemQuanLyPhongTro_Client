import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { Header } from "../System";
import { Sidebar } from "../Admin";

import { Path } from "../../utils/constants";

const Admin = () => {
  const navigate = useNavigate();

  const { isAdmin, isLoggedIn } = useSelector((state) => state.auth);

  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    if (!isAdmin || !isLoggedIn) {
      setIsHide(true);
      navigate(`/admin/${Path.LOGIN_ADMIN}`);
    }
  }, [isAdmin, isLoggedIn, isHide]);

  useEffect(() => {
    isAdmin && setIsHide(false);
  }, [isAdmin]);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* {!isHide && <Header />} */}
      <div className="w-full h-screen flex flex-auto">
        {!isHide && <Sidebar />}
        <div className="flex-auto bg-primary  p-4 h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
