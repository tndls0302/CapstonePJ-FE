import React, { useState, useMemo } from "react";
import { X, Star, MapPin, Utensils, Coins } from "lucide-react";
import { foodTravel } from "../components/FoodData";

function MainModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFoodTickets = useMemo(() => {
    return foodTravel.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.items.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[380px] max-w-[100vw] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full bg-white/90 backdrop-blur-lg shadow-2xl border-r-2 border-dashed border-vintagePink p-5 overflow-y-auto scrollbar-hide rounded-r-2xl">
        {/* 닫기 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-black transition"
            aria-label="모달 닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 제목 */}
        <h2 className="text-lg font-bold text-vintagePink mb-3 flex items-center gap-2">
          <Coins className="w-5 h-5 text-vintagePink" />
          근처 만원 미만 맛집
        </h2>

        {/* 검색창 */}
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:border-vintagePink focus:ring-vintagePink focus:ring-1 focus:outline-none"
        />

        {/* 맛집 리스트 */}
        {filteredFoodTickets.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            검색 결과가 없습니다.
          </p>
        ) : (
          filteredFoodTickets.map((ticket, index) => (
            <div
              key={index}
              className="mb-5 p-4 rounded-xl shadow-md border border-pink-200 bg-[#fff7f9] transition-transform hover:scale-[1.01]"
            >
              <div className="flex justify-center mb-3">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-32 h-32 object-cover rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-md font-semibold text-center text-vintagePink mb-2">
                {ticket.title}
              </h3>
              <div className="text-sm text-gray-800 space-y-1 px-2">
                <p className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  평점: {ticket.rating || "4.8"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  위치: {ticket.address || "부산 해운대구"}
                </p>
                <p className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-pink-500" />
                  {ticket.menu || "떡볶이"} · {ticket.price || "₩6,000"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MainModal;
