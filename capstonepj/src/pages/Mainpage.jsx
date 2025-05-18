import React, { useEffect, useState, useRef } from "react";
import MainMap from "../components/MainMap";
import { useLocation, useNavigate } from "react-router-dom";
import MainModal from "../modals/mainModal";
import BookmarkModal from "../modals/bookmarkModal";
import {
  Sparkles,
  MapPin,
  Utensils,
  Plane,
  Heart,
  Star,
  User,
} from "lucide-react";
import {
  topRestaurants,
  restaurantData,
  regions,
} from "../components/FoodData";
import logo from "../assets/mmm.png";

function Mainpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const recommendRef = useRef(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modalType = searchParams.get("modal");
    setCurrentModal(modalType);
  }, [location.search]);

  const closeModal = () => {
    setCurrentModal(null);
    navigate("/", { replace: true });
  };

  const openModal = (modalType) => {
    if (currentModal === modalType) {
      closeModal();
    } else {
      setCurrentModal(modalType);
      navigate(`/?modal=${modalType}`, { replace: true });
    }
  };

  const scrollToRecommend = () => {
    recommendRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectedRestaurants = restaurantData[selectedRegion];

  return (
    <div className="flex flex-col min-h-screen w-full font-['Pretendard'] bg-gradient-to-br from-sky-200 to-green-100 overflow-x-hidden">
      {/* 헤더 */}
      <header className="w-full h-20 bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-deepBlue tracking-tight">
            <img src={logo} alt="로고" className="h-14 w-26" />
          </h1>
        </div>
        <div className="space-x-4 text-deepBlue text-sm font-medium flex items-center">
          <button
            onClick={() => openModal("main")}
            className="flex items-center gap-1 hover:text-vintagePink hover:scale-105 transition-transform"
          >
            <Plane size={16} /> 맛집 탐방
          </button>
          <button
            onClick={() => openModal("bookmark")}
            className="flex items-center gap-1 hover:text-vintagePink hover:scale-105 transition-transform"
          >
            <Heart size={16} /> 찜
          </button>
          <button
            onClick={scrollToRecommend}
            className="flex items-center gap-1 hover:text-vintagePink hover:scale-110 transition"
          >
            <Star size={16} /> 맛집 추천
          </button>
          <button
            onClick={() => navigate("/mypage")}
            className="flex items-center gap-1 hover:text-vintagePink hover:scale-105 transition"
          >
            <User size={16} /> MY
          </button>
        </div>
      </header>

      {/* 지도 영역 */}
      <main className="flex justify-center px-4 py-6">
        <div className="w-full max-w-6xl h-[75vh] rounded-2xl shadow-xl border-[1.5px] border-white overflow-hidden">
          <MainMap />
        </div>
      </main>

      {/* 인기 맛집 섹션 */}
      <section
        ref={recommendRef}
        className="w-full mt-10 px-6 py-10 bg-white/50 border-t-2 border-b-2 border-dashed border-blue-200"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-deepBlue mb-4 flex items-center">
            <Sparkles className="mr-2 text-vintagePink" /> 인기 맛집
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {topRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="min-w-[200px] bg-white rounded-xl shadow-md p-4 flex-shrink-0 hover:scale-[1.05] transition-transform"
              >
                <div className="flex items-center justify-center mb-2">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-32 h-32 object-cover aspect-square rounded-lg mb-2"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {restaurant.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Star size={16} color="#FEBD4B" className="mr-1" /> 평점:{" "}
                  {restaurant.rating}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <MapPin size={16} color="#BC381D" className="mr-1" /> 위치:{" "}
                  {restaurant.address}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Utensils size={16} color="#B3B72F" className="mr-1" />{" "}
                  {restaurant.menu} · {restaurant.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 지역별 추천 맛집 섹션 */}
      <section className="w-full px-6 py-10 bg-white/70 border-t-2 border-dashed border-blue-200 mt-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-deepBlue mb-4 flex items-center">
            <Sparkles className="mr-2 text-vintagePink" /> 지역별 맛집
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-transform ${
                  selectedRegion === region
                    ? "bg-deepBlue text-white"
                    : "bg-white text-deepBlue border-2 border-deepBlue"
                } hover:bg-deepBlue hover:text-white`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {selectedRestaurants ? (
              selectedRestaurants.map((place) => (
                <div
                  key={place.id}
                  className="min-w-[200px] bg-white rounded-xl shadow-md p-4 flex-shrink-0 hover:scale-[1.05] transition-transform"
                >
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-32 h-32 object-cover aspect-square rounded-lg mb-2"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    {place.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Star size={16} color="#FEBD4B" className="mr-1" /> 평점:{" "}
                    {place.rating}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <MapPin size={16} color="#BC381D" className="mr-1" /> 위치:{" "}
                    {place.address}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Utensils size={16} color="#B3B72F" className="mr-1" />{" "}
                    {place.menu} · {place.price}
                  </p>
                </div>
              ))
            ) : (
              <p>선택된 지역에 맛집이 없습니다.</p>
            )}
          </div>
        </div>
      </section>

      {/* 모달 */}
      {currentModal === "main" && (
        <MainModal isOpen={true} onClose={closeModal} />
      )}
      {currentModal === "bookmark" && (
        <BookmarkModal isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
}

export default Mainpage;
