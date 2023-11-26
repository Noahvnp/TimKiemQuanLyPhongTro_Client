import { Path } from "./constants";
import icons from "./icons";

const {
  ImPencil2,
  MdOutlineLibraryBooks,
  MdOutlinePayments,
  BiUserPin,
  GrContact,
  BsJournals,
  BsJournalPlus,
} = icons;

const menuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: `/he-thong/${Path.CREATE_POST}`,
    icon: <ImPencil2 />,
  },
  {
    id: 4,
    text: "Tạo hợp đồng",
    path: `/he-thong/${Path.CREATE_CONTRACT}`,
    icon: <BsJournalPlus />,
  },
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
    id: 5,
    text: " Quản lý thanh toán",
    path: `/he-thong/${Path.MANAGE_PAYMENT}`,
    icon: <MdOutlinePayments />,
  },
  {
    id: 6,
    text: "Sửa thông tin cá nhân",
    path: `/he-thong/${Path.EDIT_ACCOUNT}`,
    icon: <BiUserPin />,
  },
  {
    id: 7,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <GrContact />,
  },
];

export default menuSidebar;
