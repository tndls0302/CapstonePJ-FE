import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// 장소 상세 조회
export async function getPlaceDetail(placeId) {
  const response = await axios.get(`${BASE_URL}/places/${placeId}`);
  return response.data;
}

// 장소 리뷰 조회
export async function getPlaceReviews(placeId) {
  const response = await axios.get(`${BASE_URL}/places/${placeId}/reviews`);
  return response.data;
}

// 리뷰 작성
export async function postReview(placeId, { rating, content }) {
  const response = await axios.post(`${BASE_URL}/places/${placeId}/reviews`, {
    rating,
    content,
  });
  return response.data;
}

// 찜 기능능
export async function toggleFavorite(placeId) {
  const response = await axios.post(`${BASE_URL}/places/${placeId}/favorites`);
  return response.data; // 토글 후 현재 상태 반환
}
