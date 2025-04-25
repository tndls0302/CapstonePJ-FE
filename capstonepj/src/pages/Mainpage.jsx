import React, { useState } from "react";
import MainMap from "../components/MainMap";
import { useNavigate } from "react-router-dom";
import MainModal from "../modals/mainModal"; // ✈️ 추천 모달

function Mainpage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      {/* 사이드바 */}
      <aside className="w-24 bg-zinc-700 text-white flex flex-col items-center py-10 rounded-r-2xl shadow-lg">
        <div className="flex flex-col items-center space-y-8">
          <button
            className="text-2xl hover:scale-110 transition-transform"
            onClick={() => setIsModalOpen(!isModalOpen)} // 모달 창
          >
            ✈️
          </button>
          <button className="text-2xl hover:scale-110 transition-transform">
            ⭐
          </button>
          <button className="text-2xl hover:scale-110 transition-transform">
            ❤️
          </button>
          <button
            className="text-2xl hover:scale-110 transition-transform"
            onClick={() => navigate("/mypage")}
          >
            🍀
          </button>
        </div>
        <button className="text-2xl hover:scale-110 transition-transform mt-auto pt-10">
          ⚙️
        </button>
      </aside>

      {/* 카카오맵 */}
      <div className="flex-1">
        <MainMap />
      </div>

      {/* ✈️ mainModal */}
      <MainModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Mainpage;
