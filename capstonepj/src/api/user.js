import axiosInstance from "./axios";

// 유저 정보 조회
export const getMyPage = async () => {
  try {
    const response = await axiosInstance.get("/api/user/mypage");
    return response.data;
  } catch (error) {
    console.error("마이페이지 조회 실패:", error);
    throw error;
  }
};

// 닉네임 수정
export const updateNickname = async (nickname) => {
  const res = await axiosInstance.patch("/api/user/nickname", { nickname });
  return res.data;
};

// 프로필 이미지 변경
export const updateProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstance.patch("/api/user/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 리뷰 삭제
export const deleteReview = async (reviewId) => {
  const res = await axiosInstance.delete(`/api/reviews/${reviewId}`);
  return res.data;
};
