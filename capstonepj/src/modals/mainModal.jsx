import React from "react";
import { X } from "lucide-react"; // 닫기 아이콘 (lucide-react 설치 필요)

function MainModal({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[420px] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* 배경 */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl shadow-2xl rounded-l-3xl overflow-hidden">
        {/* 닫기 버튼 */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 내용 */}
        <div className="px-6 pb-6 overflow-y-auto h-[90%]">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
            🍽️ 주변 맛집 추천
          </h2>

          {/* 맛집 리스트 예시 */}
          <ul className="space-y-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <li
                key={num}
                className="bg-pink-100 rounded-xl p-4 shadow hover:bg-pink-200 transition-all"
              >
                <h3 className="font-bold text-lg text-pink-700">
                  맛집 {num}호
                </h3>
                <p className="text-sm text-zinc-600 mt-1">
                  이 맛집은 정말 맛있어요! 가까운 곳에 있어요 🍜
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainModal;
