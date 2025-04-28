import React, { useState } from "react";
import { X } from "lucide-react";
import { foodTravel } from "../components/FoodData";

function MainModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 필터링
  const filteredFoodTickets = foodTravel.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.items.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[500px] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
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

        {/* 제목 */}
        <div className="px-8 py-1">
          <h2 className="text-2xl font-semibold text-deepBlue">
            ✈️ 내 주변 맛집
          </h2>
        </div>

        {/* 상단 검색창 */}
        <div className="px-7 py-5">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[27rem] p-2 rounded-md border border-gray-300 focus:border-vintagePink focus:ring-vintagePink focus:ring-1 focus:outline-none"
          />
        </div>

        {/* 내용 */}
        <div className="px-8 pb-7 overflow-y-scroll h-[90%] space-y-6">
          {filteredFoodTickets.map((ticket, index) => (
            <div
              key={index}
              className="bg-blue-100 border-2 border-dashed border-blue-400 rounded-2xl p-6 shadow-md text-center"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                {ticket.title}
              </h3>

              {/* 음식점 이미지 */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />

              <ul className="mt-4 space-y-1 text-left text-black text-sm">
                {ticket.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>

              <div className="mt-4 border-t border-dashed border-vintagePink pt-3">
                <p className="font-mono text-xs tracking-widest">
                  TICKET-{index + 1}-FOOD
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainModal;
