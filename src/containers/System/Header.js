import React from "react";

import { Navigation } from "../../components";

const Header = () => {
  return (
    <div className="w-full flex flex-none">
      <div className="w-[256px] flex justify-center items-center font-bold bg-secondary1 text-white flex-none">
        Phongtro123.com
      </div>
      <div className="flex-auto">
        <Navigation isAdmin={true} />
      </div>
    </div>
  );
};

export default Header;
