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
<<<<<<< HEAD
    text: "Quản lý hợp đồng",
    path: `/he-thong/${Path.MANAGE_RENTER}`,
=======
    text: "Quản lý người thuê",
    path: "/he-thong/quan-ly-nguoi-thue",
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
    icon: <PiUserListFill />,
  },
  {
    id: 4,
<<<<<<< HEAD
    text: "Tạo hợp đồng",
    path: `/he-thong/${Path.CREATE_CONTRACT}`,
    icon: <PiUserListFill />,
  },
  {
    id: 5,
=======
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
    text: "Sửa thông tin cá nhân",
    path: `/he-thong/${Path.EDIT_ACCOUNT}`,
    icon: <BiUserPin />,
  },
  {
<<<<<<< HEAD
    id: 6,
=======
    id: 5,
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
    text: "Liên hệ",
    path: "/lien-he",
    icon: <GrContact />,
  },
];

export default menuSidebar;
