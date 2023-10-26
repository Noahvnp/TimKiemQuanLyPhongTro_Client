import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swl from "sweetalert2";

import { InputForm, Button } from "../../components";

import * as actions from "../../store/actions";
import validateFields from "../../utils/Common/validateFields";

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
    msg &&
      Swl.fire("Oops!", msg, "notice").then((result) => {
        if (result.isConfirmed) dispatch(actions.resetMsg());
      });
  }, [msg, update]);

  const handleSubmit = async () => {
    const finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    const invalidIndex = await validateFields(finalPayload, setInvalidFields);
    if (invalidIndex === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
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
