import { Path } from "./constants";
import icons from "./icons";

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons;

const menuAdmin = [
  {
    id: 1,
    text: "Tổng quan",
    path: `/admin/${Path.DASHBOARD}`,
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Danh sách tin đăng",
    path: `/admin/${Path.POSTS_ADMIN}`,
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Danh sách người dùng",
    path: `/admin/${Path.USERS_ADMIN}`,
    icon: <BiUserPin />,
  },
  {
    id: 4,
    text: "Thông tin admin",
    path: `/admin/${Path.PROFILE_ADMIN}`,
    icon: <BiUserPin />,
  },
];

export default menuAdmin;
