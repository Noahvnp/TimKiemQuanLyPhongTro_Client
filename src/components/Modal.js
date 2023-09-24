import React, { useState, useEffect, memo } from "react";
import icons from "../utils/icons";
import Button from "./Button";
import {
  getNumbersFromAcreage,
  getNumbersFromPrice,
} from "../utils/Common/getNumbers";
import { getGapsAcreages, getGapsPrices } from "../utils/Common/getCodes";

const { GrLinkPrevious } = icons;

const Modal = ({
  setIsShowModal,
  content,
  name,
  defaultText,
  queries,
  arrMinMax,
  handleSubmit,
}) => {
  const [percent1, setPercent1] = useState(
    name === "price"
      ? arrMinMax?.priceArr[0]
      : name === "acreage"
      ? arrMinMax?.acreageArr[0]
      : 0
  );
  const [percent2, setPercent2] = useState(
    name === "price"
      ? arrMinMax?.priceArr[1]
      : name === "acreage"
      ? arrMinMax?.acreageArr[1]
      : 100
  );
  const [activeEl, setActiveEl] = useState("");

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (percent1 <= percent2) {
        activedTrackEl.style.left = `${+percent1}%`;
        activedTrackEl.style.right = `${100 - +percent2}%`;
      } else {
        activedTrackEl.style.left = `${+percent2}%`;
        activedTrackEl.style.right = `${100 - +percent1}%`;
      }
    }
  }, [percent1, percent2]);

  const handleStrack = (e, value) => {
    const trackEl = document.getElementById("track");
    const trackRect = trackEl.getBoundingClientRect(); //Lấy ra props của thẻ có id "track"
    let percent = value
      ? value
      : Math.round(
          //  Lấy vị trị client click trong element track (khoảng giữa) trừ đi điểm đầu (left)
          //  => percent trong khoảng từ 0 ->100
          ((e.clientX - trackRect.left) * 100) / trackRect.width
        );
    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      activeEl && setActiveEl("");
      setPercent1(percent);
    } else {
      activeEl && setActiveEl("");
      setPercent2(percent);
    }
  };

  const convertPercentToValue = (percent) =>
    name === "price"
      ? //Chia 10 để làm tròn 1 chữ số thập phân
        Math.ceil(Math.round(percent * 1.5) / 10)
      : name === "acreage"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5 // Nhân 5 để lấy step = 5 trong input range
      : 0;

  const convertValueToPercent = (value) => {
    let target = name === "price" ? 15 : name === "acreage" ? 90 : 1;
    return Math.floor((value / target) * 100);
  };

  const handleSetValueSelected = (code, value) => {
    setActiveEl(code);
    let arrMaxMin =
      name === "price"
        ? getNumbersFromPrice(value)
        : getNumbersFromAcreage(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPercent1(0);
        setPercent2(convertValueToPercent(1));
      } else if (arrMaxMin[0] === 20) {
        setPercent1(0);
        setPercent2(convertValueToPercent(20));
      } else if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPercent1(100);
        setPercent2(100);
      }
    } else if (arrMaxMin.length === 2) {
      setPercent1(convertValueToPercent(arrMaxMin[0]));
      setPercent2(convertValueToPercent(arrMaxMin[1]));
    }
  };

  const handleBeforeSubmit = (e) => {
    let min = percent1 <= percent2 ? percent1 : percent2;
    let max = percent1 >= percent2 ? percent1 : percent2;
    let arrMinMax = [convertPercentToValue(min), convertPercentToValue(max)];
    const gaps =
      name === "price"
        ? getGapsPrices(arrMinMax, content)
        : getGapsAcreages(arrMinMax, content);
    handleSubmit(
      e,
      {
        [name]: `Từ ${convertPercentToValue(min)} - ${convertPercentToValue(
          max
        )} ${name === "price" ? " triệu" : " m2"}`,
        [`${name}Code`]: gaps?.map((gap) => gap.code),
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  return (
    <div
      className=" bg-overlay-70 z-20 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      onClick={() => setIsShowModal(false)}
    >
      <div
        className="w-2/5 bg-white rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
      >
        <div className="h-[45px] px-3 flex items-center border-b border-gray-300">
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>

        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col gap-2">
            <span className="py-2 flex gap-2 border-b border-gray-200">
              <input
                type="radio"
                name={name}
                id={"defaultValue"}
                value={defaultText || ""}
                checked={!queries[`${name}Code`]}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor={"defaultValue"}>{defaultText}</label>
            </span>
            {content?.map((item) => (
              <span
                key={item.code}
                className="py-2 flex gap-2 border-b border-gray-200"
              >
                <input
                  type="radio"
                  name={name}
                  id={item.code}
                  value={item.code}
                  checked={item.code === queries[`${name}Code`]}
                  onChange={(e) =>
                    handleSubmit(e, {
                      [name]: item.value,
                      [`${name}Code`]: item.code,
                    })
                  }
                />
                <label htmlFor={item.code}>{item.value}</label>
              </span>
            ))}
          </div>
        )}

        {(name === "acreage" || name === "price") && (
          <>
            <div className="px-12 py-20">
              <div className="flex flex-col items-center justify-center relative">
                <div className="absolute top-[-48px] left-0 right-0 text-center text-xl text-orange-600 font-bold">
                  {percent1 === 100 && percent2 === 100
                    ? `Trên ${convertPercentToValue(percent1)} ${
                        name === "price" ? " triệu" : " m2"
                      } `
                    : percent1 === 0 &&
                      (convertPercentToValue(percent2) === 1 ||
                        convertPercentToValue(percent2) === 20)
                    ? `Dưới ${convertPercentToValue(percent2)} ${
                        name === "price" ? " triệu" : " m2"
                      } `
                    : `Từ ${
                        percent1 <= percent2
                          ? convertPercentToValue(percent1)
                          : convertPercentToValue(percent2)
                      } - ${
                        percent2 >= percent1
                          ? convertPercentToValue(percent2)
                          : convertPercentToValue(percent1)
                      } ${name === "price" ? " triệu" : " m2"}`}
                </div>
                <div
                  onClick={(e) => handleStrack(e)}
                  id="track"
                  className="slider-track w-full h-[5px] bg-gray-300 rounded-full absolute top-0 bottom-0"
                ></div>
                <div
                  onClick={(e) => handleStrack(e)}
                  id="track-active"
                  className="slider-track-active h-[5px] bg-orange-600 rounded-full absolute top-0 bottom-0"
                ></div>
                <input
                  type="range"
                  max={100}
                  min={0}
                  step={1}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                  value={percent1}
                  onChange={(e) => {
                    activeEl && setActiveEl("");
                    setPercent1(+e.target.value);
                  }}
                />
                <input
                  type="range"
                  max={100}
                  min={0}
                  step={1}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                  value={percent2}
                  onChange={(e) => {
                    activeEl && setActiveEl("");
                    setPercent2(+e.target.value);
                  }}
                />
                <div className="absolute top-5 left-0 right-0 flex items-center justify-between">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStrack(e);
                    }}
                    className="cursor-pointer"
                  >
                    0
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStrack(e, 100);
                    }}
                    className="mr-[-24px] cursor-pointer"
                  >
                    {name === "price"
                      ? "15 triệu +"
                      : name === "acreage"
                      ? "90 m2 +"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="mt-14">
                <h4 className="text-sm font-semibold mb-4">Chọn nhanh</h4>
                <div className="w-full flex flex-wrap items-center gap-3">
                  {content?.map((item) => (
                    <Button
                      key={item.code}
                      text={item.value}
                      fontSz={"text-sm"}
                      bgColor={"bg-gray-200"}
                      noUnderline={true}
                      className={`${
                        activeEl === item.code ? "bg-blue-500 text-white" : ""
                      } `}
                      onClick={() =>
                        handleSetValueSelected(item.code, item.value)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button
              text={"ÁP DỤNG"}
              fullWidth={true}
              noUnderline={true}
              className={"bg-[#FFA500] font-semibold"}
              onClick={(e) => handleBeforeSubmit(e)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
