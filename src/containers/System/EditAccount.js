import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import nonAvatar from "../../assets/anon-avatar.png";

import { Button, InputFormV2, InputReadOnly, Loading } from "../../components";

import { apiUpdateUser, apiUploadImages } from "../../services";
import { getCurrentUser } from "../../store/actions";

// import { fileToBase64 } from "../../utils/tobase64";

const EditAccount = () => {
  const dispatch = useDispatch();

  const { current_user } = useSelector((state) => state.user);

  const [payload, setPayload] = useState({
    name: current_user?.name,
    avatar: current_user?.avatar,
    zalo: current_user?.zalo || "",
    fbUrl: current_user?.fbUrl || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = async (e) => {
    // const imageBase64 = await fileToBase64(e.target.files[0]);
    // setPayload((prev) => ({
    //   ...prev,
    //   avatar: imageBase64,
    // }));
    setIsLoading(true);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);

    const response = await apiUploadImages(formData);
    if (response.status === 200)
      setPayload((prev) => ({ ...prev, avatar: response?.data?.secure_url }));

    setIsLoading(false);
  };

  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload);
    if (response?.data.err === 0) {
      Swal.fire(
        "Done!",
        "Chỉnh sửa thông tin cá nhân thành công!",
        "success"
      ).then(() => {
        dispatch(getCurrentUser());
      });
    } else {
      Swal.fire("Oops!", "Có lỗi xảy ra!", "error");
    }
  };

  return (
    <div className="px-6 py-4 flex flex-col items-center gap-10">
      <h1 className="w-full text-start text-3xl font-medium py-4 border-b border-gray-200">
        Cập nhật thông tin cá nhân
      </h1>
      <div className="w-3/5 py-6">
        <div className=" flex flex-col gap-6 justify-center">
          <InputReadOnly
            label="Mã thành viên"
            value={
              `#${current_user?.id?.match(/\d/g)?.join("")?.slice(0, 6)}` || ""
            }
            flexRow
          />
          <InputReadOnly
            label="Số điện thoại"
            value={current_user?.phone}
            flexRow
            editPhone
          />
          <InputFormV2
            name="name"
            label="Tên hiển thị"
            setValue={setPayload}
            value={payload.name}
            flexRow
          />
          <InputFormV2
            name="zalo"
            label="Zalo"
            setValue={setPayload}
            value={payload.zalo}
            flexRow
          />
          <InputFormV2
            name="fbUrl"
            label="Facebook"
            setValue={setPayload}
            value={payload.fbUrl}
            flexRow
          />

          <div className="flex gap-2`">
            <label htmlFor="password" className="w-[25%] flex-none">
              Mật khẩu
            </label>
            <small className="flex-auto h-12 p-2 text-blue-500 cursor-pointer">
              Đổi mật khẩu
            </small>
          </div>

          <div className="flex gap-2 mb-8">
            <label htmlFor="avatar" className="w-[25%] flex-none">
              Ảnh đại diện
            </label>
            <div className="flex justify-center items-center gap-6">
              <img
                src={payload.avatar || nonAvatar}
                alt="avatar"
                className="w-28 h-28 object-cover rounded-full"
              />
              <input
                type="file"
                id="avatar"
                onChange={handleUploadFile}
                className="appearance-none my-4"
              />
              {isLoading && <Loading />}
            </div>
          </div>

          <Button
            text="Cập nhật"
            bgColor="bg-blue-600"
            textColor="text-white"
            fontSz={"font-medium"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
