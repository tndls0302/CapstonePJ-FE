import axiosInstance from "./axiosInstance";

const BASE = "/api/members";

export const getMyPage = async () => {
  const response = await axiosInstance.get(`${BASE}/my-page`);
  return response.data.data;
};
