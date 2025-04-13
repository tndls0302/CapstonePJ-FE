// 사용자 현재 위치
import { useState, useEffect } from "react";

function useUserLocation(defaultLocation = { lat: 37.5665, lng: 126.978 }) {
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("위치 가져오기 실패:", err);
        }
      );
    }
  }, []);

  return location;
}

export default useUserLocation;
