import { Routes, Route } from "react-router-dom";

import { Home, Login } from "./containers/Public";
import { Path } from "./utils/constants";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={Path.HOME} element={<Home />}>
          <Route path={Path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
