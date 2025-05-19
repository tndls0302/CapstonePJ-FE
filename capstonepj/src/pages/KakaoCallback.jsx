import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();
  const hasRequested = useRef(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (!code) return;

    if (hasRequested.current) return;
    hasRequested.current = true;

    const fetchToken = async () => {
      try {
        const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

        const response = await axios.post(
          `${BASE_API_URL}/api/kakao/token`,
          { authCode: code },
          { withCredentials: true }
        );

        const { accessToken, refreshToken } = response.data;

        if (!accessToken || !refreshToken) {
          throw new Error("토큰 누락");
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        url.searchParams.delete("code");
        window.history.replaceState({}, document.title, url.toString());

        const usedCode = sessionStorage.getItem("usedKakaoCode");
        if (usedCode === code) {
          navigate("/login");
          return;
        }

        sessionStorage.setItem("usedKakaoCode", code);

        navigate("/mainpage");
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        navigate("/login");
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
