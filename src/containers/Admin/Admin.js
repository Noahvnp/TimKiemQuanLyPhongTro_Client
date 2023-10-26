import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { Path } from "../../utils/constants";

const Admin = () => {
  const navigate = useNavigate();

  const { isAdmin, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAdmin === false || isLoggedIn === false)
      navigate(`/admin/${Path.LOGIN_ADMIN}`);
  }, [isAdmin, isLoggedIn]);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-full h-screen flex flex-auto">
        <div className="flex-auto bg-primary  p-4 h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
