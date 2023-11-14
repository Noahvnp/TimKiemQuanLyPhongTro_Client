const validateFields = async (payload, setInvalidFields) => {
  let invalidIndex = 0;
  let fields = Object.entries(payload); //Chuyển objects thành mảng như sau: [name, value]
  // Kiểm tra xem có trường nào bị bỏ trống không?
  fields.forEach((item) => {
    if (item[1] === "" || item[1] === null) {
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

      case "priceNumber":
      case "acreageNumber":
      case "electrictCost":
      case "waterCost":
      case "depositAmount":
      case "monthlyRent":
      case "amount":
        if (isNaN(+item[1])) {
          //Kiểm tra xem phần tử có phải là kiểu số hay chưa: +item[1] ==> number
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Trường này phải là số!",
            },
          ]);
          invalidIndex++;
        } else if (+item[1] === 0) {
          //Kiểm tra xem phần tử có phải là kiểu số hay chưa: +item[1] ==> number
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Bạn không được bỏ trống trường này!",
            },
          ]);
          invalidIndex++;
        }
        break;

      case "yearOfBirth":
        if (+item[1] > new Date().getFullYear()) {
          //Kiểm tra xem phần tử có phải là kiểu số hay chưa: +item[1] ==> number
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Năm sinh không hợp lệ!",
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

export default validateFields;
