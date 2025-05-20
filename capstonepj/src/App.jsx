import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

//import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
//import TopPick from "./pages/TopPick";
import Mypage from "./pages/Mypage";
import KakaoCallback from "./pages/KakaoCallback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Mainpage />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/api/oauth2/callback/kakao" element={<KakaoCallback />} />
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
    </Routes>
  );
}

export default App;
