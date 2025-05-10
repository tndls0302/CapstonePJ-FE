import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainModal from "../modals/mainModal";
import BookmarkModal from "../modals/bookmarkModal";
import Sidebar from "../components/sidebar";

function MyPage() {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState(null);

  const openModal = (modalType) => {
    if (currentModal === modalType) {
      closeModal();
    } else {
      setCurrentModal(modalType);
      navigate(`/?modal=${modalType}`, { replace: true });
    }
  };

  const closeModal = () => {
    setCurrentModal(null);
    navigate("/", { replace: true });
  };

  const recommendedPlaces = [
    {
      id: 1,
      name: "홍대 맛나분식",
      description: "매콤한 떡볶이와 고소한 튀김이 환상의 조합!",
      image: "/assets/food1.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "이태원 소고기집",
      description: "육즙 가득한 한우를 맛보고 싶다면 여기!",
      image: "/assets/food2.jpg",
      rating: 4.6,
    },
    {
      id: 3,
      name: "성수 브런치카페",
      description: "분위기 좋은 공간에서 즐기는 감성 브런치 🌿",
      image: "/assets/food3.jpg",
      rating: 4.9,
    },
  ];

  return (
    <div className="flex h-screen bg-sky-200 justify-center overflow-hidden">
      <Sidebar openModal={openModal} />
      <main className="flex-1 flex justify-center p-10 overflow-hidden">
        <div className="bg-white rounded-3xl shadow-xl p-8 flex w-full max-w-screen-xl relative border-[10px] border-gray-300 overflow-hidden">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-400 rounded-full"></div>
            ))}
          </div>

          {/* 오늘의 추천 맛집 (왼쪽) */}
          <div className="w-1/3 text-center relative left-5">
            <div className="bg-gray-50 p-7 rounded-lg shadow-md border border-gray-300">
              <img
                src={recommendedPlaces[0].image}
                alt="추천 맛집"
                className="w-40 h-40 rounded-xl mx-auto object-cover border-4 border-gray-300 shadow-md"
              />
              <h2 className="mt-4 text-lg font-semibold bg-highlightPink text-white px-4 py-2 inline-block rounded-md">
                오늘의 추천 🍽️
              </h2>
              <p className="mt-3 text-base font-medium text-gray-700">
                {recommendedPlaces[0].name}
              </p>
              <p className="mt-2 text-sm text-gray-600 italic">
                "{recommendedPlaces[0].description}"
              </p>
              <div className="mt-3 text-yellow-500 text-lg">
                ⭐ {recommendedPlaces[0].rating}
              </div>
            </div>

            <button
              onClick={() => openModal("bookmark")}
              className="mt-4 mx-auto px-8 py-4 bg-vintagePink text-white rounded-full shadow-lg transform scale-90 hover:scale-95 transition-all duration-200"
            >
              찜한 맛집 보기
            </button>
          </div>

          {/* 맛집 추천 리스트 (오른쪽) */}
          <div className="w-2/3 pl-16">
            <h2 className="text-xl font-semibold mb-5 pb-4 border-b border-dashed border-gray-400 my-4">
              🗂️ 추천 맛집 리스트
            </h2>
            <div className="space-y-5 bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-md max-h-[500px] overflow-y-auto">
              {recommendedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-24 h-24 rounded-lg object-cover border border-gray-300"
                  />
                  <div className="flex flex-col justify-between h-full">
                    <h3 className="text-lg font-bold text-gray-800">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      {place.description}
                    </p>
                    <span className="text-yellow-500 font-semibold mt-1">
                      ⭐ {place.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {currentModal === "main" && (
        <MainModal isOpen={true} onClose={closeModal} />
      )}
      {currentModal === "bookmark" && (
        <BookmarkModal isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
}

export default MyPage;
