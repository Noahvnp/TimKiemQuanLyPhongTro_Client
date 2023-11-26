import React, { memo } from "react";
import { MdClose } from "react-icons/md";

const CloseBtn = ({ setShow }) => {
  return (
    <span
      title="Đóng"
      className="rounded-md cursor-pointer"
      onClick={() => setShow(false)}
    >
      <MdClose color="red" size={30} />
    </span>
  );
};

export default memo(CloseBtn);
