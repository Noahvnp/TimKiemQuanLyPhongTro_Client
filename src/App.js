import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  HomePage,
  Login,
  RentalPage,
  DetailPost,
  DetailSearch,
  Contact,
} from "./containers/Public";

import {
  CreatePost,
  EditAccount,
  ManagePost,
  System,
} from "./containers/System";

import {
  Admin,
  Dashboard,
  LoginAdmin,
  Posts,
  Profile,
  Users,
} from "./containers/Admin";

import { Path } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "./store/actions";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllCategories());
    dispatch(actions.getAllPrices());
    dispatch(actions.getAllAcreages());
    dispatch(actions.getAllProvinces());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser());
    }, 1000);
  }, [isLoggedIn]);

  return (
    <div className="bg-primary overflow-hidden">
      <Routes>
        {/* Dành cho khách vãng lai */}
        <Route path={Path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.CHO_THUE_CAN_HO} element={<RentalPage />} />
          <Route path={Path.CHO_THUE_MAT_BANG} element={<RentalPage />} />
          <Route path={Path.CHO_THUE_PHONG_TRO} element={<RentalPage />} />
          <Route path={Path.NHA_CHO_THUE} element={<RentalPage />} />
          <Route path={Path.DETAIL_SEARCH} element={<DetailSearch />} />
          <Route path={Path.CONTACT} element={<Contact />} />
          <Route
            path={Path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          <Route path={Path.DETAIL_ALL} element={<DetailPost />} />
        </Route>

        {/* Dành cho người dùng có tài khoản */}
        <Route path={Path.SYSTEM} element={<System />}>
          <Route path="*" element={<ManagePost />} />
          <Route path={Path.CREATE_POST} element={<CreatePost />} />
          <Route path={Path.MANAGE_POST} element={<ManagePost />} />
          <Route path={Path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>

        {/* Dùng cho quản trị viên */}
        <Route path={Path.ADMIN} element={<Admin />}>
          <Route path={Path.LOGIN_ADMIN} element={<LoginAdmin />} />
          <Route path="*" element={<Dashboard />} />
          <Route path={Path.DASHBOARD} element={<Dashboard />} />
          <Route path={Path.POSTS_ADMIN} element={<Posts />} />
          <Route path={Path.USERS_ADMIN} element={<Users />} />
          <Route path={Path.PROFILE_ADMIN} element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
