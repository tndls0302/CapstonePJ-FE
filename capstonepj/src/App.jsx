import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import KakaoCallback from "./pages/KakaoCallback";
import PlaceDetailPage from "./pages/PlaceDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Mainpage />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/api/oauth2/callback/kakao" element={<KakaoCallback />} />
      <Route path="/place/:id" element={<PlaceDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
    </Routes>
  );
}

export default App;
