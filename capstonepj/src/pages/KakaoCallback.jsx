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

    const usedCode = sessionStorage.getItem("usedKakaoCode");
    if (usedCode === code) {
      navigate("/login");
      return;
    }
    if (hasRequested.current) return;
    hasRequested.current = true;

    sessionStorage.setItem("usedKakaoCode", code);

    console.log("인가코드:", code);

    const KakaoLogin = async () => {
      try {
        const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
        const tokenRes = await axios.get(
          `${BASE_API_URL}/oauth2/callback/kakao?code=${code}`
        );

        console.log("토큰 응답 데이터:", tokenRes.data);

        const { accessToken, refreshToken } = tokenRes.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        url.searchParams.delete("code");
        window.history.replaceState({}, document.title, url.toString());

        navigate("/mainpage");
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        navigate("/login");
      }
    };

    KakaoLogin();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
