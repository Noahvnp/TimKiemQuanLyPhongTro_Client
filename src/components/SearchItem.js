import React, { memo } from "react";

function SearchItem({ IconBefore, IconAfter, text, fontWeight }) {
  return (
    <div className="w-full bg-white py-2 px-4 rounded-md text-[13.3px] text-gray-400 flex items-center justify-between">
      <div className="flex items-center gap-1">
        {IconBefore}
        <span
          className={`${
            fontWeight && "font-medium text-black"
          } overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {text}
        </span>
      </div>
      {IconAfter}
    </div>
  );
}

export default memo(SearchItem);
