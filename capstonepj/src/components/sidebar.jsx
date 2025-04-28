import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ openModal }) {
  const navigate = useNavigate();

  return (
    <aside className="w-24 bg-zinc-700 text-white flex flex-col items-center py-10 rounded-r-2xl shadow-lg">
      <div className="flex flex-col items-center space-y-8">
        {/* ✈️ 버튼 - 메인 이동 + 모달 열기 */}
        <button
          className="flex flex-col items-center hover:scale-110 transition-transform"
          onClick={() => openModal("main")}
        >
          <span className="text-2xl">✈️</span>
          <span className="text-xs text-gray-300 font-semibold mt-1">홈</span>
        </button>

        {/* ⭐ 버튼 - TopPick 이동 */}
        <button
          className="flex flex-col items-center hover:scale-110 transition-transform"
          onClick={() => navigate("/toppick")}
        >
          <span className="text-2xl">⭐</span>
          <span className="text-xs text-gray-300 font-semibold mt-1">추천</span>
        </button>

        {/* ❤️ 버튼 - 북마크 모달 열기 */}
        <button
          className="flex flex-col items-center hover:scale-110 transition-transform"
          onClick={() => openModal("bookmark")}
        >
          <span className="text-2xl">❤️</span>
          <span className="text-xs text-gray-300 font-semibold mt-1">찜</span>
        </button>

        {/* 🍀 버튼 - 마이페이지 이동 */}
        <button
          className="flex flex-col items-center hover:scale-110 transition-transform"
          onClick={() => navigate("/mypage")}
        >
          <span className="text-2xl">🍀</span>
          <span className="text-xs text-gray-300 font-semibold mt-1">MY</span>
        </button>
      </div>

      {/* 설정 ⚙️ 버튼 (아직 기능 없음) */}
      <button className="flex flex-col items-center hover:scale-110 transition-transform mt-auto pt-10">
        <span className="text-2xl">⚙️</span>
        <span className="text-xs text-gray-300 font-semibold mt-1">설정</span>
      </button>
    </aside>
  );
}

export default Sidebar;
