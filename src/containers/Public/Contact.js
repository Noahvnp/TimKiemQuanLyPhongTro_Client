import React, { useState } from "react";

import { Button, InputForm } from "../../components";
import Swal from "sweetalert2";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const handleSubmit = () => {
    Swal.fire(
      `Cảm ơn ${payload.name ? payload.name : ""}!`,
      "Phản hồi của bạn đã được chúng tôi ghi nhận.",
      "success"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold my-6">Liên hệ với chúng tôi</h1>
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-4 rounded-3xl p-6 text-white text-lg font-medium bg-gradient-to-br from-blue-700 to-cyan-400">
          <h4 className="text-xl font-medium">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTroTot.Com
          </span>
          <span>Điện thoại: 0917 686 101</span>
          <span>Email: cskh.phongtrotot@gmail.com Zalo: 0123 123 123</span>
          <span>Viber: 0917 686 101</span>
          <span>Địa chỉ: Xuân Khánh, Ninh Kiều, Cần Thơ</span>
        </div>

        <div className="flex-1 bg-white border border-gray-300 shadow-md rounded-lg p-6">
          <h4 className="text-xl font-medium">Liên hệ trực tuyến</h4>
          <div className="mt-1 flex flex-col gap-3">
            <InputForm
              label="HỌ TÊN CỦA BẠN"
              value={payload.name}
              setValue={setPayload}
              keyValue="name"
            />
            <InputForm
              label="SỐ ĐIỆN THOẠI"
              value={payload.phone}
              setValue={setPayload}
              keyValue="phone"
            />
            <div>
              <label htmlFor="desc" className="text-sm">
                NỘI DUNG
              </label>
              <textarea
                id="desc"
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
                name="content"
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              textColor="text-white"
              fontSz={"font-medium"}
              bgColor="bg-blue-600"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
