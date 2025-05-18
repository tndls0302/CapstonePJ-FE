import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가코드:", code);

    const KakaoLogin = async () => {
      try {
        if (!code) {
          throw new Error("카카오 인가 코드 없음");
        }

        const tokenRes = await axios.get(
          `/api/oauth2/callback/kakao?code=${code}`
        );

        console.log("토큰 응답 데이터:", tokenRes.data);

        const { accessToken, refreshToken } = tokenRes.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/mainpage");
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("로그인에 실패했습니다.");
        navigate("/login");
      }
    };

    KakaoLogin();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
