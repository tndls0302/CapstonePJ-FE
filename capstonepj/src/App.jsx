import { Routes, Route } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import TopPick from "./pages/TopPick";
/*import Bookmark from "./pages/Bookmark"; -> 모달로 처리 예정*/
import Mypage from "./pages/Mypage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Mainpage />} />
      <Route path="/toppick" element={<TopPick />} />
      {/*<Route path="/bookmark" element={<Bookmark />} /> -> 모달로 처리 예정*/}
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;
