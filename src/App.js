import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  HomePage,
  Login,
  RentalPage,
  DetailPost,
  DetailSearch,
} from "./containers/Public";

import { CreatePost, System } from "./containers/System";

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
    <div className="bg-primary">
      <Routes>
        <Route path={Path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.CHO_THUE_CAN_HO} element={<RentalPage />} />
          <Route path={Path.CHO_THUE_MAT_BANG} element={<RentalPage />} />
          <Route path={Path.CHO_THUE_PHONG_TRO} element={<RentalPage />} />
          <Route path={Path.NHA_CHO_THUE} element={<RentalPage />} />
          <Route path={Path.DETAIL_SEARCH} element={<DetailSearch />} />
          <Route
            path={Path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
        </Route>
        <Route path={Path.SYSTEM} element={<System />}>
          <Route path={Path.CREATE_POST} element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
