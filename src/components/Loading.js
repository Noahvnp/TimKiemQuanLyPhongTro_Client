import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = ({ className }) => {
  return (
    <div className={className}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      <small>Vui lòng đợi...</small>
    </div>
  );
};

export default Loading;
