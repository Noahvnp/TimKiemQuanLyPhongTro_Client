import { Path } from "./constants";
import icons from "./icons";

const { RxDashboard, MdOutlineLibraryBooks, BiUserPin, CgProfile } = icons;

const menuAdmin = [
  {
    id: 1,
    text: "Tổng quan",
    path: `/admin/${Path.DASHBOARD}`,
    icon: <RxDashboard />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: `/admin/${Path.POSTS_ADMIN}`,
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Quản lý người dùng",
    path: `/admin/${Path.USERS_ADMIN}`,
    icon: <BiUserPin />,
  },
  {
    id: 4,
    text: "Thông tin cá nhân",
    path: `/admin/${Path.PROFILE_ADMIN}`,
    icon: <CgProfile />,
  },
];

export default menuAdmin;
