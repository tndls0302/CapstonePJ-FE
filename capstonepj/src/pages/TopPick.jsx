import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainModal from "../modals/mainModal";
import BookmarkModal from "../modals/bookmarkModal";
import Sidebar from "../components/sidebar";
import { restaurantData } from "../components/FoodData";
import { topRestaurants } from "../components/FoodData";
import { regions } from "../components/FoodData";
import foodImage1 from "../assets/food1.jpg";
import foodImage2 from "../assets/food2.jpg";

function TopPick() {
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("서울");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modalType = queryParams.get("modal");
    if (modalType === "main") {
      setIsMainModalOpen(true);
    } else if (modalType === "bookmark") {
      setIsBookmarkModalOpen(true);
    }
  }, [location]);

  const closeMainModal = () => {
    setIsMainModalOpen(false);
    navigate("/toppick");
  };

  const closeBookmarkModal = () => {
    setIsBookmarkModalOpen(false);
    navigate("/toppick");
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const restaurants = restaurantData[selectedRegion] || [];

  return (
    <div className="flex">
      {/* 사이드바 */}
      <Sidebar />

      <div className="flex-1 p-8 min-h-screen bg-[#EFDADA] flex flex-col items-center">
        {/* 메인 타이틀 */}
        <h1 className="text-3xl font-extrabold mb-8 text-[#C28CA9] text-center">
          만원 이하 Top 맛집
        </h1>

        {/* 메인 Top 맛집 슬라이더 (대표 이미지) */}
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl bg-white mb-12">
          <div className="flex items-center">
            <div className="w-1/2 h-64 overflow-hidden relative rounded-l-2xl">
              <img
                src={foodImage2} // {topRestaurants[0].image}
                alt={topRestaurants[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 가게 이름 및 설명 */}
            <div className="w-1/2 p-4">
              <div className="text-xl font-bold text-[#C28CA9]">
                {topRestaurants[0].name}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {topRestaurants[0].description} {/* 가게 설명 추가 */}
              </div>
            </div>
          </div>
        </div>

        {/* 지역 선택 버튼 */}
        <h2 className="text-2xl font-bold mt-16 mb-6 text-[#C28CA9] text-center">
          지역별 맛집 추천
        </h2>
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {regions.map((region) => (
            <button
              key={region}
              className={`px-5 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                region === selectedRegion ? "bg-[#D8B5C7]" : "bg-white"
              } text-[#C28CA9] border-[#C28CA9]`}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* 맛집 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={foodImage1} //{restaurant.image}
                  alt={restaurant.menu}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{restaurant.name}</h3>
                  <div className="flex items-center text-yellow-500 text-sm mb-2">
                    ⭐ {restaurant.rating}
                  </div>
                  <p className="text-gray-700 font-medium">
                    {restaurant.menu}{" "}
                    <span className="text-orange-600">{restaurant.price}</span>
                  </p>
                  <p className="text-gray-400 text-sm">{restaurant.address}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">등록된 맛집이 없습니다.</p>
          )}
        </section>

        {/* Main Modal */}
        {isMainModalOpen && (
          <MainModal isOpen={isMainModalOpen} onClose={closeMainModal} />
        )}

        {/* Bookmark Modal */}
        {isBookmarkModalOpen && (
          <BookmarkModal
            isOpen={isBookmarkModalOpen}
            onClose={closeBookmarkModal}
          />
        )}
      </div>
    </div>
  );
}

export default TopPick;
