import { Routes, Route } from "react-router-dom";

import {
  Home,
  HomePage,
  Login,
  RentalApartment,
  RentalHouse,
  RentalRoom,
  RentalSpace,
} from "./containers/Public";

import { Path } from "./utils/constants";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={Path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />}></Route>
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
          <Route path={Path.CHO_THUE_MAT_BANG} element={<RentalSpace />} />
          <Route path={Path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
          <Route path={Path.NHA_CHO_THUE} element={<RentalHouse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
