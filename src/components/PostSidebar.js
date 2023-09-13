import React from "react";
import moment from "moment";
import "moment/locale/vi";

const PostSidebar = ({ title, image, price, createdAt }) => {
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-5000">
      <img
        src={image[0]}
        alt="anh"
        className="w-[65px] h-[65px] flex-none object-contain rounded-sm"
      />
      <div className="w-full flex flex-col justify-between gap-2">
        <h4 className="text-blue-600 text-sm">{`${title?.slice(0, 50)}...`}</h4>
        <div className="w-full flex items-center justify-between">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-400">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
