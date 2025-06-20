import React, { useEffect, useState, useCallback, useRef } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import useUserLocation from "../hooks/userLocation";
import { getPlacesByBounds, getPlaceDetailById } from "../api/places";
import { Utensils, Tag, MapPin, Phone, UtensilsCrossed } from "lucide-react";

function MainMap() {
  const userLocation = useUserLocation(); // 사용자 위치
  const [mapCenter, setMapCenter] = useState(null); // 지도 중심
  const [places, setPlaces] = useState([]); // 장소 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [bounds, setBounds] = useState(null); // 지도 범위 저장
  const [placeDetail, setPlaceDetail] = useState(null); // 상세 정보
  const detailRef = useRef(null);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  // 지도 범위 변경 핸들러
  const handleBoundsChanged = (map) => {
    const b = map.getBounds();
    const sw = b.getSouthWest();
    const ne = b.getNorthEast();

    setBounds({
      minLat: sw.getLat(),
      maxLat: ne.getLat(),
      minLng: sw.getLng(),
      maxLng: ne.getLng(),
    });

    const center = map.getCenter();
    setMapCenter({ lat: center.getLat(), lng: center.getLng() });
  };

  // 장소 데이터 호출 함수
  const fetchPlaces = useCallback(async () => {
    if (!bounds) return;

    const { minLat, maxLat, minLng, maxLng } = bounds;
    console.log("요청 보낼 bounds 확인:", bounds); //🔧디버깅용

    if (
      minLat == null ||
      maxLat == null ||
      minLng == null ||
      maxLng == null ||
      isNaN(minLat) ||
      isNaN(maxLat) ||
      isNaN(minLng) ||
      isNaN(maxLng)
    ) {
      console.error("유효하지 않은 지도 범위입니다.", bounds);
      return;
    }

    setLoading(true);
    try {
      const data = await getPlacesByBounds(bounds);
      console.log("불러온 장소 리스트:", data); //🔧디버깅용

      setPlaces(data.data.placeCsvData || []);
    } catch (error) {
      console.error(
        "장소 불러오기 실패:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }, [bounds]);

  // bounds가 바뀔 때 자동으로 fetchPlaces 호출
  useEffect(() => {
    if (bounds) {
      fetchPlaces();
    }
  }, [bounds, fetchPlaces]);

  // 마커 클릭 시 장소 상세 정보 불러오기
  const handleMarkerClick = async (placeId) => {
    try {
      console.log("요청 보낼 placeId:", placeId); //🔧디버깅용
      const detail = await getPlaceDetailById(placeId);
      console.log("상세 정보 확인:", detail); //🔧디버깅용
      setPlaceDetail(detail);
    } catch (err) {
      console.error("장소 상세 정보 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        placeDetail &&
        detailRef.current &&
        !detailRef.current.contains(event.target)
      ) {
        setPlaceDetail(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [placeDetail]);

  if (!userLocation || !mapCenter) {
    return <div>지도를 불러오는 중...</div>;
  }

  console.log("현재 불러온 places 배열:", places); //🔧디버깅용

  return (
    <div className="relative w-full h-screen">
      <Map
        center={mapCenter}
        onBoundsChanged={handleBoundsChanged}
        onDragStart={() => setPlaceDetail(null)}
        onZoomChanged={() => setPlaceDetail(null)}
        style={{ width: "100%", height: "100%" }}
        level={5}
      >
        {/* 현재 위치 마커 */}
        <MapMarker position={userLocation} clickable={true} />
        <CustomOverlayMap position={userLocation} yAnchor={1.2}>
          <div className="bg-deepBlue border-2 border-deepBlue text-white font-semibold px-4 py-2 rounded-md shadow text-xs whitespace-nowrap">
            현재 위치
          </div>
        </CustomOverlayMap>

        {/* 장소 마커 */}
        {places.map((place) => (
          <React.Fragment key={place.placeId}>
            <MapMarker
              position={{ lat: place.latitude, lng: place.longitude }}
            />
            <CustomOverlayMap
              position={{ lat: place.latitude, lng: place.longitude }}
              yAnchor={1.2}
            >
              <div
                onClick={() => handleMarkerClick(place.placeId)}
                className="bg-white border-2 border-deepBlue text-black font-semibold px-3 py-2 rounded-md shadow text-xs max-w-[160px] cursor-pointer"
              >
                {" "}
                <div className="text-lg font-extrabold text-deepBlue drop-shadow-md truncate mb-2">
                  {place.businessName || "가게 이름 없음"}
                </div>
                <div className="flex items-center space-x-1 text-gray-700 mb-1 truncate">
                  <Utensils className="w-4 h-4 text-gray-600" />
                  <span>최저가 메뉴: {place.menu1}</span>
                </div>
                <div className="flex items-center space-x-1 text-vintagePink font-bold">
                  <Tag className="w-4 h-4 text-vintagePink" />
                  <span>{Number(place.price1)?.toLocaleString() || "-"} ₩</span>
                </div>
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </Map>

      {/* 로딩 중 */}
      {loading && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow z-50 text-sm">
          음식점을 불러오는 중...
        </div>
      )}

      {/* 음식점이 없는 경우 */}
      {!loading && places.length === 0 && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow z-50 text-sm">
          조건에 알맞는 음식점이 없습니다.
        </div>
      )}

      {/* 재검색 버튼 */}
      {userLocation &&
        mapCenter &&
        (userLocation.lat !== mapCenter.lat ||
          userLocation.lng !== mapCenter.lng) && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={fetchPlaces}
              className="w-60 border-2 border-vintagePink text-gray-600 bg-white px-7 py-2 rounded-full shadow-lg font-semibold hover:bg-vintagePink hover:text-white"
            >
              여기서 재검색
            </button>
          </div>
        )}

      {/* 장소 상세 정보 카드 */}
      {placeDetail && (
        <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-300 rounded-xl shadow-xl p-4 w-[320px]">
          {/* 이미지 */}
          {placeDetail.photoUrls && placeDetail.photoUrls.split(",")[0] && (
            <img
              src={placeDetail.photoUrls.split(",")[0]}
              alt="가게 사진"
              className="w-full h-40 object-cover rounded-md mb-3"
            />
          )}

          {/* 가게 이름 */}
          <h3 className="text-xl font-extrabold text-deepBlue mb-2 truncate">
            {placeDetail.businessName || "가게 이름 없음"}
          </h3>

          {/* 주소 */}
          <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
            <MapPin className="w-4 h-4 mr-1 text-vintagePink" />
            <span className="truncate">{placeDetail.address}</span>
          </div>

          {/* 메뉴 */}
          <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
            <Utensils className="w-4 h-4 mr-1 text-vintagePink" />
            <span>
              {placeDetail.menu1 || "-"}
              {placeDetail.menu2 ? `, ${placeDetail.menu2}` : ""}
            </span>
          </div>

          {/* 가격 */}
          <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
            <Tag className="w-4 h-4 mr-1 text-vintagePink" />
            <span>
              {placeDetail.price1
                ? ` ${Number(placeDetail.price1).toLocaleString()} ₩`
                : "가격 정보 없음"}
            </span>
          </div>

          {/* 전화번호 */}
          {placeDetail.contactNumber && (
            <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
              <Phone className="w-4 h-4 mr-1 text-vintagePink" />
              <span>{placeDetail.contactNumber}</span>
            </div>
          )}

          {/* 카테고리 */}
          <div className="flex items-center text-sm text-gray-600 mb-1 space-x-1">
            <UtensilsCrossed className="w-4 h-4 mr-1 text-vintagePink" />
            <span>{placeDetail.category}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMap;
