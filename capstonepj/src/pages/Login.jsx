//import React, { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import logo from "../assets/mmm.png";
import kakaoLogo from "../assets/kakaologin.png";
import GoogleLogo from "../assets/googlelogin.png";

function Login() {
  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

    console.log(kakaoAuthUrl);
    window.location.href = kakaoAuthUrl;
  };

  // TODO: Google OAuth 연동
  const handleGoogleLogin = () => {
    alert("구글로그인");
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-[60%] flex items-center justify-end pr-4">
        <img
          src={logo}
          alt="로고"
          className="w-3/4 max-w-xs transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="w-[90%] flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">로그인</h2>

          {/* 카카오 로그인 */}
          <button
            onClick={handleKakaoLogin}
            className="w-full py-3 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-xl mb-4 hover:brightness-90 transition flex items-center justify-center gap-2"
          >
            <img src={kakaoLogo} alt="카카오 로고" className="w-7 h-7" /> 카카오
            로그인
          </button>

          {/* 구글 로그인 */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white text-[#3C1E1E] font-semibold border rounded-lg mb-4 hover:brightness-90 transition flex items-center justify-center gap-2"
          >
            <img src={GoogleLogo} alt="구글 로고" className="w-6 h-6" /> 구글
            로그인
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
