// pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Apple } from "lucide-react";
import logo from "../assets/mmm.png";
import kakaoLogo from "../assets/kakaoLogo.png";

function Login() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const isLoggedIn = true;
    if (isLoggedIn) {
      navigate("/mainpage");
    } else {
      alert("로그인 실패!");
    }
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

          <button
            onClick={handleKakaoLogin}
            className="w-full py-3 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-xl mb-4 hover:brightness-105 transition flex items-center justify-center gap-2"
          >
            <img src={kakaoLogo} alt="카카오 로고" className="w-6 h-6" />{" "}
            {/* 카카오 로고 추가 */}
            카카오로 로그인
          </button>

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
