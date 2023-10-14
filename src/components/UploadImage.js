import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import icons from "../utils/icons";

import { apiUploadImages } from "../services";
import Loading from "./Loading";

const { BsCameraFill, ImBin } = icons;

const UploadImage = ({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
}) => {
  const { dataEdit } = useSelector((state) => state.post);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      let images = dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : null;
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    let images = [];
    let files = e.target.files;
    let formData = new FormData();

    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response?.data?.secure_url];
    }

    setImagesPreview((prev) => [...prev, ...images]);
    setIsLoading(false);
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((img) => img !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((img) => img !== image),
    }));
  };

  return (
    <div className="pt-4 flex flex-col gap-3">
      <h2 className="font-bold text-xl">Hình ảnh</h2>
      <span>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn.</span>
      <div>
        <label
          htmlFor="add-img"
          className="w-full h-[200px] border-4 border-blue-200 border-dashed rounded-md flex flex-col items-center justify-center text-center"
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <BsCameraFill size={50} color="blue" />
              Thêm ảnh
            </>
          )}
        </label>

        <input
          type="file"
          id="add-img"
          multiple
          hidden
          onChange={(e) => handleFiles(e)}
          onFocus={() => setInvalidFields([])}
        />
        <small className="text-red-500">
          {invalidFields?.some((field) => field.name === "images") &&
            invalidFields?.find((field) => field.name === "images").message}
        </small>
        {imagesPreview.length > 0 && (
          <h3 className="mt-6 font-medium">Ảnh đã chọn</h3>
        )}
        <div className="flex items-center gap-4 py-2">
          {imagesPreview?.map((image, i) => (
            <div className="w-40 h-40 relative" key={i}>
              <img
                src={image}
                alt="preview"
                className="w-full h-full rounded-md object-cover"
              />
              <span
                title="Xoá"
                className="absolute top-1 right-1 p-2 cursor-pointer bg-gray-100 hover:bg-secondary1 hover:text-white rounded-full"
                onClick={() => handleDeleteImage(image)}
              >
                <ImBin />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
