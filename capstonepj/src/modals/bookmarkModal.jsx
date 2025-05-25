import React, { useEffect, useState } from "react";
import { X, Heart, Star, MapPin, Utensils } from "lucide-react";
import { toggleBookmarks, getBookmarks } from "../api/bookmarks";

function BookmarkModal({ isOpen, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* //예시 맛집 목록
  const dummyStores = [
    {
      id: 1,
      name: "삼거리 떡볶이",
      location: "서울 강남구",
      rating: 4.2,
      image: "https://via.placeholder.com/150",
      menu: "떡볶이",
      price: "₩6,000",
    },
    {
      id: 2,
      name: "마포 치킨하우스",
      location: "서울 마포구",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
      menu: "치킨",
      price: "₩12,000",
    },
    {
      id: 3,
      name: "종로 김밥천국",
      location: "서울 종로구",
      rating: 4.0,
      image: "https://via.placeholder.com/150",
      menu: "김밥",
      price: "₩4,500",
    },
  ]; 
  
  // 찜 상태 관리
  const [bookmarks, setBookmarks] = useState(() =>
    dummyStores.reduce((acc, store) => {
      acc[store.id] = true;
      return acc;
    }, {})
  );

  // 하트 토글 함수
  const toggleBookmarks = (id) => {
    setBookmarks((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };
  */

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const places = await getBookmarks();
      setBookmarks(places);
    } catch (error) {
      console.error("찜 목록 가져오기 실패", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (placeId) => {
    try {
      await toggleBookmarks(placeId);
      fetchBookmarks();
    } catch (error) {
      console.error("찜 토글 실패", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchBookmarks();
  }, [isOpen]);

  // 찜한 가게 리스트 필터링
  // const bookmarkedStores = dummyStores.filter((store) => bookmarks[store.id]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[380px] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-start pl-8 bg-black/20 overflow-x-hidden">
        <div
          className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[360px] border-4 border-dashed border-rose-300 relative
               max-h-[90vh] overflow-y-auto scrollbar-hide"
        >
          {/* 헤더 */}
          <div className="bg-rose-100 px-6 py-4 flex justify-between items-center border-b-2 border-dashed border-rose-300">
            <h2 className="text-xl font-bold text-rose-700">❤️ 찜한 가게</h2>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-800"
              aria-label="모달 닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 절취선 모양 */}
          <div className="h-4 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-full border-t border-dashed border-rose-400" />
          </div>

          {/* 본문 */}
          <div className="px-4 py-4 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <p className="text-center text-rose-400">불러오는 중...</p>
            ) : bookmarks.length === 0 ? (
              <p className="text-center text-rose-400 font-semibold">
                찜한 가게가 없습니다.
              </p>
            ) : (
              bookmarks.map((store) => (
                <div
                  key={store.placeId}
                  className="mb-5 p-4 rounded-xl shadow-md border border-rose-200 bg-[#fff7f9] transition-transform hover:scale-[1.01]"
                >
                  <div className="flex justify-center mb-3">
                    <img
                      src={store.photoUrls}
                      alt={store.businessName}
                      className="w-32 h-32 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <h3 className="text-md font-semibold text-center text-rose-600 mb-2">
                    {store.businessName}
                  </h3>
                  <div className="text-sm text-gray-800 space-y-1 px-2">
                    <p className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      평점: {store.rating}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      위치: {store.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-pink-500" />
                      메뉴1: {store.menu1} · {store.price1}
                    </p>
                    <p className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-pink-500" />
                      메뉴2: {store.menu2} · {store.price2}
                    </p>
                  </div>
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => handleToggle(store.placeId)}
                      className="text-red-500 hover:scale-110 transition-transform"
                      aria-label="찜 토글 버튼"
                    >
                      <Heart className="w-6 h-6" fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 바코드 모양 */}
          <div className="bg-rose-100 px-6 py-3 text-center border-t-2 border-dashed border-rose-300 text-sm text-rose-700 tracking-widest font-mono">
            BOOKMARK-ID: I LIKE !t ❤️
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkModal;
