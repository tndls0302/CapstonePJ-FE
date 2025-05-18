import axiosInstance from "./axiosInstance";

const BASE = "/api/places";

// 위도,경도 2개를 기준으로 장소 리스트 조회
export const getPlacesByBounds = async ({ minLat, maxLat, minLng, maxLng }) => {
  const response = await axiosInstance.get(BASE, {
    params: {
      minLatitude: minLat,
      maxLatitude: maxLat,
      minLongitude: minLng,
      maxLongitude: maxLng,
    },
  });
  return response.data;
};

// 키워드로 장소 검색
export const searchPlaces = async (keyword) => {
  const response = await axiosInstance.get(`${BASE}/search`, {
    params: { keyword },
  });
  return response.data;
};

// 장소 상세 정보 조회 (ID 기반)
export const getPlaceDetailById = async (placeId) => {
  const response = await axiosInstance.get(`${BASE}/${placeId}`);
  return response.data;
};

// 장소 상세 정보 조회 (가게 이름 기반)
export const getPlaceDetailByName = async (name) => {
  const response = await axiosInstance.get(`${BASE}/business-name`, {
    params: { name },
  });
  return response.data;
};
