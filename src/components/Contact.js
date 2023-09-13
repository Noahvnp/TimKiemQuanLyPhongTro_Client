import React, { memo } from "react";
import { text } from "../utils/dataContact";
import Button from "./Button";

const Contact = () => {
  return (
    <div className=" w-3/5 bg-white border-8 border-dashed border-blue-100 rounded-md px-20 py-10 m-2 shadow-md flex flex-col gap-5 justify-center items-center">
      <img
        src={text.image}
        alt="bg-support"
        className="w-full h-40 object-contain"
      />
      <p className="text-lg">{text.content}</p>
      <div className="w-full flex items-center justify-between">
        {text.contacts.map((contact, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-orange-600 font-medium">{contact.text}</span>
            <span className="text-blue-900 text-lg font-medium">
              {contact.phone}
            </span>
            <span className="text-blue-900 text-lg font-medium">
              {contact.zalo}
            </span>
          </div>
        ))}
      </div>
      <Button
        text={"Gửi liên hệ"}
        textColor={"text-white"}
        bgColor={"bg-blue-600"}
        fontSz={"font-medium"}
        px={"px-6"}
      />
    </div>
  );
};

export default memo(Contact);
