import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();
  const hasRequested = useRef(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    console.log("인가 코드:", code);

    if (!code) return;

    //중복 API 요청 방지
    if (hasRequested.current) return;
    hasRequested.current = true;

    const getKakaoToken = async () => {
      try {
        const response = await axios.post(
          `/api/kakao/token`, //상대 경로 요청: 프록시 처리
          { authCode: code },
          { withCredentials: true }
        );
        console.log("응답 데이터:", response.data);

        //토큰 저장
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        //인가코드 중복 처리
        url.searchParams.delete("code");
        window.history.replaceState({}, document.title, url.toString());

        const usedCode = sessionStorage.getItem("usedKakaoCode");
        if (usedCode === code) {
          navigate("/login");
          return;
        }

        sessionStorage.setItem("usedKakaoCode", code);

        //리다이렉트
        navigate("/");
      } catch (err) {
        console.error("토큰 발급 실패:", err);
        alert("로그인에 실패");
        navigate("/login");
      }
    };

    getKakaoToken();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
