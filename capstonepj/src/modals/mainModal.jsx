import React, { useState, useEffect } from "react";
//import axios from "axios";
import { X, Star, MapPin, Utensils, Coins } from "lucide-react";
import { getPlacesByBounds, searchPlaces } from "../api/places";

function MainModal({ isOpen, onClose, userLat, userLng }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultPlaces, setDefaultPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 1. 근처 맛집 리스트 불러오기
  useEffect(() => {
    if (!isOpen || !userLat || !userLng) return;

    const bounds = {
      minLat: userLat - 0.01,
      maxLat: userLat + 0.01,
      minLng: userLng - 0.01,
      maxLng: userLng + 0.01,
    };

    getPlacesByBounds(bounds)
      .then((places) => {
        setDefaultPlaces(places);
      })
      .catch((err) => {
        console.error("기본 장소 불러오기 실패:", err);
      });
  }, [isOpen, userLat, userLng]);

  // 2. 검색어 입력 시 검색 API 호출
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      searchPlaces(searchTerm)
        .then((results) => {
          setSearchResults(results);
        })
        .catch((err) => {
          console.error("검색 실패:", err);
          setSearchResults([]);
        });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const displayList = isSearching ? searchResults : defaultPlaces;

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

        {/* 리스트 */}
        {displayList.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            {isSearching
              ? "검색 결과가 없습니다."
              : "근처 맛집 정보를 불러오는 중..."}
          </p>
        ) : (
          displayList.map((place, index) => (
            <div
              key={place.placeId || index}
              className="mb-5 p-4 rounded-xl shadow-md border border-pink-200 bg-[#fff7f9] transition-transform hover:scale-[1.01]"
            >
              <div className="flex justify-center mb-3">
                <img
                  src={
                    isSearching
                      ? "/search-result.jpg"
                      : place.imageUrl || "/default.jpg"
                  }
                  alt={isSearching ? place.businessName : place.name}
                  className="w-32 h-32 object-cover rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-md font-semibold text-center text-vintagePink mb-2">
                {isSearching ? place.businessName : place.name}
              </h3>
              <div className="text-sm text-gray-800 space-y-1 px-2">
                <p className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  평점: {place.rating || "4.8"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  위치: {place.address || "주소 정보 없음"}
                </p>
                <p className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-pink-500" />
                  {place.menu || "대표 메뉴 없음"} ·{" "}
                  {place.price || "₩정보 없음"}
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
