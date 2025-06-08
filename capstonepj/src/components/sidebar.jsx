import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Star, Heart, User, Settings } from "lucide-react"; // 아이콘 불러오기

function Sidebar({ openModal }) {
  const navigate = useNavigate();

  return (
    <aside className="w-24 bg-white/90 backdrop-blur-md shadow-lg rounded-r-2xl flex flex-col items-center py-10 text-deepBlue text-[13px]">
      <div className="flex flex-col items-center space-y-8">
        {/* 홈 */}
        <button
          className="flex flex-col items-center gap-1 hover:text-vintagePink hover:scale-110 transition-transform font-semibold"
          onClick={() => openModal("main")}
          aria-label="맛집 탐방 모달 열기"
        >
          <Plane size={20} />
          <span>맛집 탐방</span>
        </button>

        {/* 찜 */}
        <button
          className="flex flex-col items-center gap-1 hover:text-vintagePink hover:scale-110 transition-transform font-semibold"
          onClick={() => openModal("bookmark")}
          aria-label="찜 모달 열기"
        >
          <Heart size={20} />
          <span>찜</span>
        </button>

        {/* 맛집 추천 */}
        <button
          className="flex flex-col items-center gap-1 hover:text-vintagePink hover:scale-110 transition-transform font-semibold"
          onClick={() => navigate("/main", { state: { showRecommend: true } })}
          aria-label="맛집 추천 섹션 이동"
        >
          <Star size={20} />
          <span>맛집 추천</span>
        </button>

        {/* 마이페이지 */}
        <button
          className="flex flex-col items-center gap-1 hover:text-vintagePink hover:scale-110 transition-transform font-semibold"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지 이동"
        >
          <User size={20} />
          <span>MY</span>
        </button>
      </div>

      {/* 설정 버튼 - 하단 고정 */}
      <button
        className="flex flex-col items-center gap-1 hover:text-vintagePink hover:scale-110 transition-transform font-semibold mt-auto pt-10"
        aria-label="설정"
      >
        <Settings size={20} />
        <span>설정</span>
      </button>
    </aside>
  );
}

export default Sidebar;
