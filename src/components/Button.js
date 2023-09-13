import React, { memo } from "react";

const Button = ({
  text,
  textColor,
  fontSz,
  bgColor,
  IcAfter,
  onClick,
  fullWidth,
  px,
}) => {
  return (
    <button
      type="button"
      className={`py-2 ${px ? px : "px-2"} ${textColor} ${fontSz} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {text}
      {IcAfter && <IcAfter />}
    </button>
  );
};

export default memo(Button);
