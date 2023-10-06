import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import { Path } from "../../utils/constants";
import icons from "../../utils/icons";

import { Header, Sidebar } from "../System";
import { Intro, Contact } from "../../components";

const { GrLinkTop } = icons;
const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={`/${Path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-auto h-full">
        <Sidebar />
        <div className="flex-auto bg-white p-4">
          <Outlet />
        </div>
      </div>
      <Intro />
      <Contact />
      <div className="h-[200px]"></div>
      <ScrollToTop
        className="!flex !justify-center !items-center !bg-red-500 !rounded-full"
        smooth
        component={<GrLinkTop />}
      />
    </div>
  );
};

export default System;
