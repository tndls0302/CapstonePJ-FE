import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ openModal }) {
  const navigate = useNavigate();

  return (
    <aside className="w-24 bg-zinc-700 text-white flex flex-col items-center py-10 rounded-r-2xl shadow-lg">
      <div className="flex flex-col items-center space-y-8">
        {/* ✈️ 버튼 - 메인 이동 + 모달 열기 */}
        <button
          className="text-2xl hover:scale-110 transition-transform"
          onClick={() => openModal("main")}
        >
          ✈️
        </button>

        {/* ⭐ 버튼 - TopPick 이동 */}
        <button
          className="text-2xl hover:scale-110 transition-transform"
          onClick={() => navigate("/toppick")}
        >
          ⭐
        </button>

        {/* ❤️ 버튼 - 북마크 모달 열기 */}
        <button
          className="text-2xl hover:scale-110 transition-transform"
          onClick={() => openModal("bookmark")}
        >
          ❤️
        </button>

        {/* 🍀 버튼 - 마이페이지 이동 */}
        <button
          className="text-2xl hover:scale-110 transition-transform"
          onClick={() => navigate("/mypage")}
        >
          🍀
        </button>
      </div>

      {/* 설정 ⚙️ 버튼 (아직 기능 없음) */}
      <button className="text-2xl hover:scale-110 transition-transform mt-auto pt-10">
        ⚙️
      </button>
    </aside>
  );
}

export default Sidebar;
