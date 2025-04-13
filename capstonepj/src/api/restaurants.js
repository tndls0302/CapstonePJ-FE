// 음식점 더미 데이터
export const getMockRestaurants = async ({ lat, lng }) => {
  // 여기서 lat/lng 기반 필터링은 생략
  return [
    {
      id: 1,
      name: "최고 국밥",
      lat: lat + 0.001,
      lng: lng + 0.001,
      price: 7000,
    },
    {
      id: 2,
      name: "김밥천국",
      lat: lat - 0.0015,
      lng: lng + 0.002,
      price: 5000,
    },
  ];
};
