import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swl from "sweetalert2";

import { InputForm, Button } from "../../components";

import * as actions from "../../store/actions";
import validateFields from "../../utils/Common/validateFields";
import { Path } from "../../utils/constants";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, msg, update } = useSelector(
    (state) => state.auth
  );

  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    !isAdmin && dispatch(actions.logout());
    isLoggedIn && isAdmin && navigate(`/admin/${Path.DASHBOARD}`);
  }, [isLoggedIn, isAdmin, navigate]);

  useEffect(() => {
    msg &&
      Swl.fire("Oops!", msg, "notice").then((result) => {
        if (result.isConfirmed) dispatch(actions.resetMsg());
      });
  }, [msg, update]);

  const handleSubmit = async () => {
    const invalidIndex = await validateFields(payload, setInvalidFields);
    if (invalidIndex === 0) dispatch(actions.loginAdmin(payload));
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] mt-4 m-auto rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">
        Đăng nhập với tư cách quản trị viên
      </h3>
      <div className="w-full flex flex-col gap-5">
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
          text={"Đăng nhập"}
          bgColor={"bg-secondary1"}
          textColor={"text-white"}
          fullWidth
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoginAdmin;
