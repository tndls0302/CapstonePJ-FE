import React, { useEffect, useState, useCallback } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import useUserLocation from "../hooks/userLocation";
import { getPlacesByBounds } from "../api/places";

function MainMap() {
  const userLocation = useUserLocation(); // 사용자 위치
  const [mapCenter, setMapCenter] = useState(null); // 지도 중심
  const [places, setPlaces] = useState([]); // 장소 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [bounds, setBounds] = useState(null); // 지도 범위 저장

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
    console.log("지도 범위 파라미터 확인", bounds);
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
      setPlaces(data);
    } catch (error) {
      console.error(
        "장소 불러오기 실패:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }, [bounds]);

  if (!userLocation || !mapCenter) {
    return <div>지도를 불러오는 중...</div>;
  }

  return (
    <div className="w-full h-screen">
      <Map
        center={mapCenter}
        /*
        onCenterChanged={(map) => {
          const center = map.getCenter();
          setMapCenter({ lat: center.getLat(), lng: center.getLng() });
        }}*/
        onBoundsChanged={handleBoundsChanged}
        style={{ width: "100%", height: "100%" }}
        level={5}
      >
        {/* 현재 위치 마커 */}
        <MapMarker position={userLocation} clickable={false} />
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
              <div className="bg-white border-2 border-deepBlue text-black font-semibold px-4 py-2 rounded-md shadow text-xs whitespace-nowrap">
                <br />₩{" "}
                {Number(place.price1)
                  ? Number(place.price1).toLocaleString()
                  : "-"}
                원
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
    </div>
  );
}

export default MainMap;
