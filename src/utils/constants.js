export const Path = {
  HOME: "/*",
  HOME__PAGE: ":page",
  LOGIN: "login",
  REGISTER: "register",

  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  NHA_CHO_THUE: "nha-cho-thue",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  DETAIL_ALL: "chi-tiet/*",
  DETAIL_SEARCH: "tim-kiem",

  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-moi-bai-dang",
  MANAGE_POST: "quan-ly-bai-dang",
  EDIT_ACCOUNT: "sua-thong-tin-ca-nhan",
  CONTACT: "lien-he",

  ADMIN: "/admin/*",
  LOGIN_ADMIN: "login",
  DASHBOARD: "dashboard",
  POSTS_ADMIN: "posts",
  USERS_ADMIN: "users",
  PROFILE_ADMIN: "profile",
};

export const textHomeContent = {
  HOME_TITLE: "Kênh thông tin Phòng Trọ số 1 Việt Nam",
  HOME_DESCRIPTION:
    "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const location = [
  {
    name: "Phòng trọ Hồ Chí Minh ",
    image: "https://phongtro123.com/images/location_hcm.jpg",
    code: "CHMN",
  },
  {
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
    code: "NNIT",
  },
  {
    name: "Phòng trọ Đà Nẵng",
    image: "https://phongtro123.com/images/location_dn.jpg",
    code: "NONG",
  },
];
