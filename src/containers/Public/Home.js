import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import Header from "./Header";
import { Navigation, Search } from "../Public";
import { Intro, Contact } from "../../components";
import icons from "../../utils/icons";

const { GrLinkTop } = icons;

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center h-full">
      <Header />
      <Navigation />
      <Search />
      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify start mt-3">
        <Outlet />
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

export default Home;
