import { Path } from "./constants";
import icons from "./icons";

const {
  ImPencil2,
  MdOutlineLibraryBooks,
  BiUserPin,
  GrContact,
  PiUserListFill,
} = icons;

const menuSidebar = [
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
    text: "Quản lý người thuê",
    path: "/he-thong/quan-ly-nguoi-thue",
    icon: <PiUserListFill />,
  },
  {
    id: 4,
    text: "Sửa thông tin cá nhân",
    path: `/he-thong/${Path.EDIT_ACCOUNT}`,
    icon: <BiUserPin />,
  },
  {
    id: 5,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <GrContact />,
  },
];

export default menuSidebar;
