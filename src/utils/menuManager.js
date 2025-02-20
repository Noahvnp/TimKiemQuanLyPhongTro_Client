import { Path } from "./constants";
import icons from "./icons";

const {
  ImPencil2,
  MdOutlineLibraryBooks,
  BiUserPin,
  BsJournals,
  MdOutlinePayments,
} = icons;

const menuManager = [
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: `/he-thong/${Path.MANAGE_POST}`,
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Quản lý hợp đồng",
    path: `/he-thong/${Path.MANAGE_CONTRACT}`,
    icon: <BsJournals />,
  },

  {
    id: 4,
    text: " Quản lý thanh toán",
    path: `/he-thong/${Path.MANAGE_PAYMENT}`,
    icon: <MdOutlinePayments />,
  },
  {
    id: 5,
    text: "Thông tin tài khoản",
    path: `/he-thong/${Path.EDIT_ACCOUNT}`,
    icon: <BiUserPin />,
  },
];

export default menuManager;
