import { Routes, Route } from "react-router-dom";

import {
  Home,
  HomePage,
  Login,
  RentalPage,
  DetailPost,
  DetaiSearch,
} from "./containers/Public";

import { Path } from "./utils/constants";

function App() {
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
          <Route path={Path.DETAIL_SEARCH} element={<DetaiSearch />} />
          <Route
            path={Path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
