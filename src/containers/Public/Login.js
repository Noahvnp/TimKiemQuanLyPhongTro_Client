import React, { useEffect, useState } from "react";
import Swl from "sweetalert2";

import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
    // isRegister ? navigate("/register") : navigate("/login");
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    msg && Swl.fire("Oops!", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    const finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    const invalidIndex = await validate(finalPayload);
    if (invalidIndex === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };

  // Kiểm tra dữ liệu đầu vào
  const validate = async (payload) => {
    let invalidIndex = 0;
    let fields = Object.entries(payload); //Chuyển objects thành mảng như sau: [name, value]
    // Kiểm tra xem có trường nào bị bỏ trống không?
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này!",
          },
        ]);
        invalidIndex++;
      }
    });

    // Validate fields
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 kí tự!",
              },
            ]);
            invalidIndex++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            //Kiểm tra xem phần tử có phải là kiểu số hay chưa: +item[1] ==> number
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ!",
              },
            ]);
            invalidIndex++;
          }
          break;

        default:
          break;
      }
    });
    return invalidIndex;
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] mt-4 m-auto rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Tạo tài khoản mới" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label={"HỌ TÊN"}
            value={payload.name}
            setValue={setPayload}
            keyValue={"name"}
          />
        )}
        <InputForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label={"SỐ ĐIỆN THOẠI"}
          value={payload.phone}
          setValue={setPayload}
          keyValue={"phone"}
        />
        <InputForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label={"MẬT KHẨU"}
          value={payload.password}
          setValue={setPayload}
          keyValue={"password"}
          type="password"
        />
        <Button
          text={isRegister ? "Tạo tài khoản" : "Đăng nhập"}
          bgColor={"bg-secondary1"}
          textColor={"text-white"}
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="mt-7 flex justify-between ">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                setIsRegister(false);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu?
            </small>
            <small
              className="text-[blue] hover:text-[red] cursor-pointer"
              onClick={() => {
                setIsRegister(true);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
