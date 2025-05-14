import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    // 임시로 로컬에서 액세스 토큰 처리 (백엔드가 준비되면 여기에 요청 추가)
    const fetchKakaoToken = async () => {
      try {
        // 임시로 로컬에서 accessToken 반환
        const accessToken = "temporaryAccessToken"; // 임시 토큰

        // 로컬 저장소에 accessToken 저장
        localStorage.setItem("accessToken", accessToken);

        // 로그인 성공 시 메인 페이지로 이동
        navigate("/mainpage");
      } catch (err) {
        console.error("로그인 실패:", err);
        alert("로그인에 실패했습니다.");
        navigate("/login");
      }
    };

    /*
    const fetchKakaoToken = async () => {
      try { 
        const res = await axios.post(
          "http://localhost:5173/auth/kakao", // 백엔드 API 주소
          { code },
          { withCredentials: true }
        );

        // accessToken / userInfo 저장
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        // 로그인 성공 시 메인페이지로 이동
        navigate("/mainpage");
      } catch (err) {
        console.error("로그인 실패:", err);
        alert("로그인에 실패했습니다.");
        navigate("/login");
      }
    }; */

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
