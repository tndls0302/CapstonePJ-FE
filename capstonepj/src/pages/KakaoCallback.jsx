import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    const fetchKakaoToken = async () => {
      try {
        const res = await axios.get(
          `https://mixmix2.store/api/oauth2/callback/kakao?code=${code}`,
          { withCredentials: true }
        );

        const { accessToken, refreshToken, nickname } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("nickname", nickname);

        navigate("/mainpage");
      } catch (err) {
        console.error("로그인 실패:", err);
        alert("로그인에 실패했습니다.");
        navigate("/login");
      }
    };

    if (code) {
      fetchKakaoToken();
    } else {
      alert("인가 코드가 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
