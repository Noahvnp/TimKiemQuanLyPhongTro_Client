import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

import Header from "./Header";
import { Navigation, Search } from "../Public";
import { Intro, Contact } from "../../components";
import icons from "../../utils/icons";

import * as actions from "../../store/actions";

const { GrLinkTop } = icons;

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllCategories());
    dispatch(actions.getAllPrices());
    dispatch(actions.getAllAcreages());
    dispatch(actions.getAllProvinces());
  }, []);

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
