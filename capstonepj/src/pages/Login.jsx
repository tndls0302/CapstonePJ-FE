import React from "react";
import { Apple } from "lucide-react";
import logo from "../assets/mmm.png";
import kakaoLogo from "../assets/kakaoLogo.png";

function Login() {
  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = "f80a0259d3afd5dbe8a014ab127b63cc";
    const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoAuthUrl;
  };

  const handleAppleLogin = () => {
    alert("Apple 로그인은 iOS 또는 Mac 환경에서만 사용 가능합니다.");
  };

  return (
    <div className="flex h-screen bg-white">
      {/* 로고 영역 */}
      <div className="w-[60%] flex items-center justify-end pr-4">
        <img
          src={logo}
          alt="로고"
          className="w-3/4 max-w-xs transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* 로그인 폼 */}
      <div className="w-[90%] flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">로그인</h2>

          {/* 카카오 로그인 */}
          <button
            onClick={handleKakaoLogin}
            className="w-full py-3 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-xl mb-4 hover:brightness-105 transition flex items-center justify-center gap-2"
          >
            <img src={kakaoLogo} alt="카카오 로고" className="w-6 h-6" />{" "}
            카카오로 로그인
          </button>

          {/* Apple 로그인 */}
          <button
            onClick={handleAppleLogin}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:opacity-70 transition flex items-center justify-center gap-2"
          >
            <Apple size={18} /> Apple로 로그인
          </button>

          <p className="text-xs text-gray-400 mt-6 text-center">
            로그인 시 <span className="underline">이용약관</span> 및{" "}
            <span className="underline">개인정보처리방침</span>에 동의합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
