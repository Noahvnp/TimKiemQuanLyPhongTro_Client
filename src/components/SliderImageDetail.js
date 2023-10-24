import React, { memo } from "react";

import Slider from "react-slick";

const SliderImageDetail = ({ images }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((image, index) => (
            <div
              key={image}
              className="bg-black flex justify-center h-[320px] px-12 relative"
            >
              <img
                src={image}
                alt="slider"
                className="object-contain m-auto h-full"
              />
              <span className="absolute bottom-3 right-0 left-0 text-center z-10 font-semibold text-white">{`${
                index + 1
              }/${images.length}`}</span>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(SliderImageDetail);
