import React, { memo, useState } from "react";
import { Link } from "react-router-dom";

import icons from "../utils/icons";

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;
const indexs = [0, 1, 2, 3];

const Item = ({
  address,
  attributes,
  description,
  images,
  star,
  title,
  user,
  postId,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= star; i++)
      stars.push(<GrStar className="star-item" size="20" color="yellow" />);
    return stars;
  };
  return (
    <div className="w-full flex border-t border-red-600 py-4">
      <Link
        to={`chi-tiet/${title}/${postId}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative"
      >
        {images.length > 0 &&
          images
            .filter((image, indexImage) =>
              indexs.some((index) => index === indexImage)
            )
            ?.map((imageSelected, indexImageSelected) => (
              <img
                key={indexImageSelected}
                src={imageSelected}
                alt="preview"
                className="w-[48%] h-[120px] object-cover"
              />
            ))}

        <span className="bg-overlay-30 text-white px-1 rounded-md absolute left-1 bottom-2">
          {images.length} ảnh
        </span>
        <span
          className="text-white px-1 absolute right-5 bottom-2"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <RiHeartFill size={30} color="red" cursor={"pointer"} />
          ) : (
            <RiHeartLine size={30} />
          )}
        </span>
      </Link>
      <div className="w-3/5">
        <div className="w-full flex gap-4 justify-between">
          <div className="text-red-600 uppercase font-medium">
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            {title}
          </div>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between text-sm">
          <span className="flex-2 text-base font-bold text-green-600">
            {attributes?.price}
          </span>
          <span className="flex-1 text-sm">{attributes?.acreage}</span>
          <span className="flex-3 text-sm">
            {`${address.split(",")[address.split(",").length - 2]}, 
            ${address.split(",")[address.split(",").length - 1]}`}
          </span>
        </div>
        <p className="text-gray-500 w-full h-[100px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center mt-3 mb-5 justify-between">
          <div className="flex items-center">
            <img
              src="https://phongtro123.com/images/default-user.png"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full mr-2"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-sm bg-blue-700 text-white py-1 px-2 rounded-md"
            >
              Gọi {user.phone}
            </button>
            <button
              type="button"
              className="text-sm text-blue-700 py-1 px-2 rounded-md border border-blue-700"
            >
              Zalo {user?.zalo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
