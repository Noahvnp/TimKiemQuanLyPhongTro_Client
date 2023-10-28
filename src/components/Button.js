import React, { memo } from "react";

const Button = ({
  text,
  textColor,
  fontSz,
  noUnderline,
  bgColor,
  IcTitle,
  IcBefore,
  IcAfter,
  onClick,
  fullWidth,
  px,
  className,
}) => {
  return (
    <button
      type="button"
      className={`py-2 ${px ? px : "px-2"} ${textColor} ${fontSz} ${
        noUnderline ? "hover:no-underline" : ""
      } ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1 ${className}`}
      onClick={onClick}
    >
      {IcBefore && (
        <span title={IcTitle || ""}>
          <IcBefore />
        </span>
      )}
      {text}
      {IcAfter && (
        <span title={IcTitle || ""}>
          <IcAfter />
        </span>
      )}
    </button>
  );
};

export default memo(Button);
