import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();
  const hasRequested = useRef(false);
  const [status, setStatus] = useState("대기중...");

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (!authCode) {
      alert("인가 코드가 없습니다. 다시 로그인해주세요.");
      navigate("/");
      return;
    }

    if (hasRequested.current) {
      console.warn("이미 요청을 보냈음");
      return;
    }

    hasRequested.current = true;
    console.log("인가 코드:", authCode);

    const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

    const getIdToken = async () => {
      try {
        setStatus("서버에 로그인 요청 중...");

        // 1단계: 인가 코드로 idToken 받기
        const CallbackResponse = await axios.get(
          `${API_BASE_URL}/api/oauth2/callback/kakao?code=${encodeURIComponent(authCode)}`
        );

        const { idToken } = CallbackResponse.data;

        // idToken 유효성 확인
        if (!idToken) {
          console.error("idToken이 존재하지 않습니다");
          throw new Error("idToken 없음");
        }

        // 2단계: idToken으로 자체 JWT 요청
        const jwtResponse = await axios.post(
          `${API_BASE_URL}/api/kakao/token`,
          {
            authCode: idToken,
          }
        );
        const { accessToken, refreshToken } = jwtResponse.data.data;

        if (!accessToken || !refreshToken) {
          throw new Error("JWT 발급 실패");
        }

        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        //로그인 처리
        setStatus("로그인 성공! 메인으로 이동합니다...");
        navigate("/main");
      } catch (err) {
        console.log("에러 전체:", err);
        if (err.response) {
          console.log("응답 status:", err.response.status);
          console.log("응답 data:", err.response.data);
          console.log("응답 headers:", err.response.headers);
        }
        hasRequested.current = false;

        alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    getIdToken();

    return () => {
      hasRequested.current = false;
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">{status}</p>
      </div>
    </div>
  );
}

export default KakaoCallback;
