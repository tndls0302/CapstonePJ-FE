import React, { useState } from "react";
import { X, Heart } from "lucide-react";

function BookmarkModal({ isOpen, onClose }) {
  // 예시 맛집 목록
  const dummyStores = [
    { id: 1, name: "맛집 1호", location: "서울 강남구", rating: 4.2 },
    { id: 2, name: "맛집 2호", location: "서울 마포구", rating: 4.6 },
    { id: 3, name: "맛집 3호", location: "서울 종로구", rating: 4.0 },
    { id: 4, name: "맛집 4호", location: "서울 용산구", rating: 4.8 },
    { id: 5, name: "맛집 5호", location: "서울 성동구", rating: 4.1 },
    { id: 6, name: "맛집 6호", location: "서울 서초구", rating: 4.3 },
    { id: 7, name: "맛집 7호", location: "서울 은평구", rating: 4.0 },
    { id: 8, name: "맛집 8호", location: "서울 송파구", rating: 4.7 },
    { id: 9, name: "맛집 9호", location: "서울 중랑구", rating: 4.5 },
    { id: 10, name: "맛집 10호", location: "서울 강북구", rating: 4.4 },
  ];

  // 찜 상태 관리
  const [bookmarks, setBookmarks] = useState({});

  // 하트 토글 함수
  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[500px] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[450px] border-4 border-dashed border-red-300 relative overflow-hidden">
          {/* 헤더 */}
          <div className="bg-red-100 px-6 py-4 flex justify-between items-center border-b-2 border-dashed border-red-300">
            <h2 className="text-xl font-bold text-red-700">❤️ 찜하기</h2>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 절취선 */}
          <div className="h-4 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-full border-t border-dashed border-red-400" />
          </div>

          {/* 본문 */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <ul className="space-y-4">
              {dummyStores.map((store) => (
                <li
                  key={store.id}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 shadow hover:bg-red-100 transition-all flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg text-red-700">
                      🍜 {store.name}
                    </h3>
                    <p className="text-sm text-zinc-600 mt-1">
                      위치: {store.location}
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      ⭐ 평점: {store.rating}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleBookmark(store.id)}
                    className="text-red-500 hover:scale-110 transition-transform"
                  >
                    <Heart
                      className="w-6 h-6"
                      fill={bookmarks[store.id] ? "currentColor" : "none"}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 바코드 영역 */}
          <div className="bg-red-100 px-6 py-3 text-center border-t-2 border-dashed border-red-300 text-sm text-red-700 tracking-widest font-mono">
            BOOKMARK-ID: 20250426-LIKE ❤️
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkModal;
