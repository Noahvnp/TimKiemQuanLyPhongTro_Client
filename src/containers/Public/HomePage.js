import React from "react";
import { useSearchParams } from "react-router-dom";

import { textHomeContent } from "../../utils/constants";
import { Province } from "../../components";
import { List, Pagination } from "../Public";

function HomePage() {
  const [params] = useSearchParams();
  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{textHomeContent.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">
          {textHomeContent.HOME_DESCRIPTION}
        </p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List page={params.get("page") || 1} />
          <Pagination page={params.get("page") || 1} />
        </div>
        <div className="w-[30%] border border-green-500">Sidebar</div>
      </div>
    </div>
  );
}

export default HomePage;
