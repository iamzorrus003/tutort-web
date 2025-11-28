import { Route, Routes, BrowserRouter } from "react-router-dom";
import HeroDraft1 from "./components/hero/draft-1/index.tsx";
import RootComp from "./components/RootComp/index.tsx";

import "./app.css";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="" element={<RootComp />} />
      <Route path="/mockup-landing-draft-1" element={<HeroDraft1 />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
