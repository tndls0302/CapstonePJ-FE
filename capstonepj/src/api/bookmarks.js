import axiosInstance from "./axiosInstance";

// 장소 찜 등록/삭제
export const toggleBookmarks = async (placeId) => {
  return axiosInstance.post(`/api/bookmarks/${placeId}`);
};

// 찜 리스트 조회
export const getBookmarks = async () => {
  const res = await axiosInstance.get("/api/bookmarks");
  return res.data.Places;
};

// 찜 개수 기준 맛집 추천 조회
export const getTopBookmarks = async () => {
  const res = await axiosInstance.get("/api/bookmarks/top");
  return res.data;
};
