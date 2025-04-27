import React, { useEffect, useState, useCallback } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import useUserLocation from "../hooks/userLocation";

function MainMap() {
  const userLocation = useUserLocation(); // 사용자 위치
  const [mapCenter, setMapCenter] = useState(null); // 지도 중심
  const [restaurants, setRestaurants] = useState([]); // 음식점 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
      // 예시 데이터
      setRestaurants([
        {
          id: 1,
          name: "김밥천국",
          lat: userLocation.lat + 0.003,
          lng: userLocation.lng + 0.003,
          price: 5000,
        },
        {
          id: 2,
          name: "맛있는 분식집",
          lat: userLocation.lat - 0.003,
          lng: userLocation.lng - 0.003,
          price: 7000,
        },
        {
          id: 3,
          name: "돼지국밥 명가",
          lat: userLocation.lat + 0.004,
          lng: userLocation.lng - 0.003,
          price: 8000,
        },
      ]);
    }
  }, [userLocation]);

  // 초기 중심 좌표 설정
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  // 음식점 데이터 호출 함수
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/restaurants?lat=${mapCenter.lat}&lng=${mapCenter.lng}&maxPrice=10000`
      );
      const data = await res.json();
      setRestaurants(data);
      console.log("음식점 데이터:", data);
    } catch (error) {
      console.error("음식점 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [mapCenter]);

  // 지도 중심 변경 핸들러
  const handleCenterChanged = (map) => {
    const center = map.getCenter();
    setMapCenter({ lat: center.getLat(), lng: center.getLng() });
  };

  if (!userLocation || !mapCenter) {
    return <div>지도를 불러오는 중...</div>;
  }

  return (
    <div className="w-full h-screen">
      <Map
        center={mapCenter}
        onCenterChanged={handleCenterChanged}
        style={{ width: "100%", height: "100%" }}
        level={5}
      >
        {/* 현재 위치 마커 */}
        <MapMarker
          position={userLocation}
          title=""
          clickable={false}
        ></MapMarker>
        <CustomOverlayMap position={userLocation} yAnchor={1.2}>
          <div className="bg-vintagePink border-2 border-vintagePink text-white font-semibold px-4 py-2 rounded-md shadow text-xs whitespace-nowrap">
            현재 위치
          </div>
        </CustomOverlayMap>

        {/* 음식점 마커 */}
        {restaurants.map((r) => (
          <React.Fragment key={r.id}>
            <MapMarker position={{ lat: r.lat, lng: r.lng }} />
            <CustomOverlayMap
              position={{ lat: r.lat, lng: r.lng }}
              yAnchor={1.2}
            >
              <div className="bg-white border-2 border-vintagePink text-black font-semibold px-4 py-2 rounded-md shadow text-xs whitespace-nowrap">
                {r.name}
                <br />₩ {r.price.toLocaleString()}원
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </Map>

      {/* 로딩 중 */}
      {loading && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow z-50 text-sm">
          음식점을 불러오는 중...
        </div>
      )}

      {/* 음식점이 없는 경우 */}
      {!loading && restaurants.length === 0 && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow z-50 text-sm">
          주변에 음식점이 없습니다.
        </div>
      )}

      {/* 재검색 버튼 */}
      {userLocation &&
        mapCenter &&
        (userLocation.lat !== mapCenter.lat ||
          userLocation.lng !== mapCenter.lng) && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={() => {
                console.log("재검색 위치:", mapCenter);
                fetchRestaurants(); // 지도 중심 기준으로 음식점 불러오기
              }}
              className="w-60 border-2 border-vintagePink text-gray-600 bg-white px-7 py-2 rounded-full shadow-lg font-semibold hover:bg-vintagePink hover:text-white"
            >
              여기서 재검색
            </button>
          </div>
        )}
    </div>
  );
}

export default MainMap;
