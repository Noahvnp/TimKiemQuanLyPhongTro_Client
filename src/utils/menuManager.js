import { Path } from "./constants";
import icons from "./icons";

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons;

const menuManager = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: `/he-thong/${Path.CREATE_POST}`,
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: `/he-thong/${Path.MANAGE_POST}`,
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: `/he-thong/${Path.EDIT_ACCOUNT}`,
    icon: <BiUserPin />,
  },
];

export default menuManager;
