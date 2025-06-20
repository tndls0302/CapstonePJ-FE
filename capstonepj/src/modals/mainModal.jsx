import React, { useEffect, useState } from "react";
import {
  getPlacesByBounds,
  getPlaceDetailById,
  searchPlaces,
} from "../api/places";
import { Utensils, Tag, MapPin, Phone, UtensilsCrossed } from "lucide-react";

function MainModal({ userLocation, isOpen, onClose }) {
  const [places, setPlaces] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLocation) return;

    const OFFSET = 0.02;
    const bounds = {
      minLat: userLocation.lat - OFFSET,
      maxLat: userLocation.lat + OFFSET,
      minLng: userLocation.lng - OFFSET,
      maxLng: userLocation.lng + OFFSET,
    };

    async function fetchNearbyPlaces() {
      setLoading(true);
      try {
        const res = await getPlacesByBounds(bounds);
        setPlaces(res.data.placeCsvData || []);
      } catch (err) {
        console.error("근처 맛집 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNearbyPlaces();
  }, [userLocation]);

  const handleSearch = async () => {
    const trimmedKeyword = searchKeyword.trim();
    if (!trimmedKeyword) {
      alert("검색어를 입력하세요.");
      return;
    }
    try {
      const data = await searchPlaces(trimmedKeyword);
      setSearchResults(data.PlaceNames || []);
    } catch (error) {
      console.error("검색 실패", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const handlePlaceClick = async (placeId) => {
    try {
      const detail = await getPlaceDetailById(placeId);
      setPlaceDetail(detail);
    } catch (err) {
      console.error("상세 정보 요청 실패", err);
    }
  };

  const handleClose = () => {
    setSearchKeyword("");
    setSearchResults([]);
    setPlaceDetail(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90vw] max-w-xl max-h-[80vh] overflow-auto p-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="가게 이름 또는 메뉴 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-vintagePink text-white px-4 rounded-r hover:bg-pink-600"
          >
            검색
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">로딩 중...</p>}

        {placeDetail ? (
          <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-300 rounded-xl shadow-xl p-4 w-[320px]">
            {placeDetail.photoUrls?.split(",")[0] && (
              <img
                src={placeDetail.photoUrls.split(",")[0]}
                alt="가게 사진"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}

            <h3 className="text-xl font-extrabold text-deepBlue mb-2 truncate">
              {placeDetail.businessName || "가게 이름 없음"}
            </h3>

            <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
              <MapPin className="w-4 h-4 mr-1 text-vintagePink" />
              <span>{placeDetail.address}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
              <Utensils className="w-4 h-4 mr-1 text-vintagePink" />
              <span>
                {placeDetail.menu1 || "-"}
                {placeDetail.menu2 ? `, ${placeDetail.menu2}` : ""}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
              <Tag className="w-4 h-4 mr-1 text-vintagePink" />
              <span>
                {placeDetail.price1
                  ? `${Number(placeDetail.price1).toLocaleString()} ₩`
                  : "가격 정보 없음"}
              </span>
            </div>

            {placeDetail.contactNumber && (
              <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
                <Phone className="w-4 h-4 mr-1 text-vintagePink" />
                <span>{placeDetail.contactNumber}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
              <UtensilsCrossed className="w-4 h-4 mr-1 text-vintagePink" />
              <span>{placeDetail.category}</span>
            </div>
          </div>
        ) : (
          <>
            {searchResults.length > 0 ? (
              <div>
                <h4 className="font-semibold mb-2">검색 결과</h4>
                <ul className="divide-y divide-gray-200 max-h-64 overflow-auto">
                  {searchResults.map((place) => (
                    <li
                      key={place.placeId}
                      onClick={() => handlePlaceClick(place.placeId)}
                      className="cursor-pointer py-2 hover:bg-gray-100"
                    >
                      {place.businessName}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <h4 className="font-semibold mb-2">내 위치 근처 맛집</h4>
                {places.length === 0 ? (
                  <p>조건에 맞는 음식점이 없습니다.</p>
                ) : (
                  <ul className="divide-y divide-gray-200 max-h-64 overflow-auto">
                    {places.map((place) => (
                      <li
                        key={place.placeId}
                        onClick={() => handlePlaceClick(place.placeId)}
                        className="cursor-pointer py-2 hover:bg-gray-100"
                      >
                        <div className="font-semibold text-vintagePink">
                          {place.businessName}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Utensils className="w-4 h-4 mr-1 text-vintagePink" />
                          <span>{place.menu1}</span>
                          <Tag className="w-4 h-4 ml-4 mr-1 text-vintagePink" />
                          <span>
                            ₩ {Number(place.price1)?.toLocaleString() || "-"}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MainModal;
