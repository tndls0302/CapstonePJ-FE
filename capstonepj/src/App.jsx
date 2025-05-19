import { Routes, Route } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import TopPick from "./pages/TopPick";
import Mypage from "./pages/Mypage";
import KakaoCallback from "./pages/KakaoCallback";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Mainpage />} />
      <Route path="/toppick" element={<TopPick />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
