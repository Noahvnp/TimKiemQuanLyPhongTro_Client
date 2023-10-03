import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Path } from "../../utils/constants";
import { Header, Sidebar } from "../System";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={`/${Path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-auto h-full">
        <Sidebar />

        <div className="flex-auto bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
