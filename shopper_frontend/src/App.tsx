import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import History from "./pages/History";
import Rides from "./pages/Rides";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Rides />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
