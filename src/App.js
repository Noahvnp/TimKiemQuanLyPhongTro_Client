import { Routes, Route } from "react-router-dom";

import {
  Home,
  HomePage,
  Login,
  RentalApartment,
  RentalHouse,
  RentalRoom,
  RentalSpace,
  DetailPost,
} from "./containers/Public";

import { Path } from "./utils/constants";

function App() {
  return (
    <div className="bg-primary">
      <Routes>
        <Route path={Path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={Path.HOME__PAGE} element={<HomePage />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
          <Route path={Path.CHO_THUE_MAT_BANG} element={<RentalSpace />} />
          <Route path={Path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
          <Route path={Path.NHA_CHO_THUE} element={<RentalHouse />} />
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
