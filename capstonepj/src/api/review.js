import axiosInstance from "./axiosInstance";

const BASE = "/api/reviews";

// 리뷰 등록
export const postReview = async (dtoObject, imageFiles) => {
  const formData = new FormData();

  // 1. reviewSaveReqDto 필드에 JSON 문자열로 추가
  formData.append(
    "reviewSaveReqDto",
    new Blob([JSON.stringify(dtoObject)], { type: "application/json" })
  );

  // 2. 이미지 파일들을 반복문으로 추가
  imageFiles.forEach((file) => {
    formData.append("reviewImage", file);
  });

  const response = await axiosInstance.post(`${BASE}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 특정 장소 리뷰 조회
export const getReviewsByPlaceId = async (placeId) => {
  const response = await axiosInstance.get(`${BASE}/all/${placeId}`);
  const { reviewListResDto, pageInfoResDto } = response.data;

  return {
    reviews: reviewListResDto,
    pageInfo: pageInfoResDto,
  };
};
