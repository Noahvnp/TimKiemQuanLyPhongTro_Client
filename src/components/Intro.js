import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import icons from "../utils/icons";
import Button from "./Button";

import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";
import { text } from "../utils/dataIntro";

const { GrStar } = icons;
const arrStar = [1, 2, 3, 4, 5];

const Intro = () => {
  const { categories } = useSelector((state) => state?.app);

  return (
    <div className="border w-3/5 bg-white rounded-md px-20 py-10 m-8 shadow-md flex flex-col justify-center items-center">
      <h3 className="font-bold text-lg">{text.title}</h3>
      <p className="text-gray-700 text-center mt-4">
        {text.description}
        <span>
          {categories?.length > 0 &&
            categories.map((category, index) => (
              <Link
                to={`${formatVietnameseToString(category.value)}`}
                key={category.code}
                className="text-blue-600 hover:text-orange-600 font-medium"
              >
                {" "}
                {category.value.toLowerCase()},
              </Link>
            ))}
        </span>
        {text.description2}
      </p>
      <div className="w-full flex items-center justify-around p-8">
        {text.statistic.map((item, index) => (
          <div
            className="flex flex-col justify-center items-center"
            key={index}
          >
            <h4 className="font-bold text-xl">{item.value}</h4>
            <p className="text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
      <h3 className="font-bold text-lg">{text.content}</h3>
      <div className="flex items-center justify-center gap-1">
        {arrStar.map((item) => (
          <span key={item}>
            <GrStar color="yellow" size={24} />
          </span>
        ))}
      </div>
      <i className="text-gray-600 text-center mt-2">"{text.comment}"</i>
      <span className="text-gray-700 mt-2">{text.author}</span>
      <h3 className="font-bold text-lg pt-6">{text.question}</h3>
      <p className="py-3 text-sm">{text.anwser}</p>
      <Button
        text={"Đăng tin ngay"}
        bgColor="bg-secondary2"
        textColor="text-white"
        px={"px-6"}
        fontSz={"font-medium"}
      />
      <div className="h-12"></div>
    </div>
  );
};

export default memo(Intro);
