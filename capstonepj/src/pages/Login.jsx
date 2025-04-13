import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import kakaoLogo from "../assets/kakaoLogo.png";
import appleLogo from "../assets/appleLogo.png";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    alert("로그인 완료!");

    navigate("/main");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-zinc-600 text-white text-center p-10 rounded-lg shadow-2xl w-full max-w-md mx-4">
        {/* 로고 */}
        <div className="flex justify-center mt-4 mb-8">
          <img src="/logo.png" alt="로고" className="h-12" />
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="mail"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-200 text-gray-900 p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-200 text-gray-900 p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-vintagePink hover:bg-palePink text-white p-3 rounded border border-white"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 회원가입 */}
        <p className="text-center text-gray-300 mt-6">
          아직 계정이 없나요?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-gray-300 hover:text-white underline"
          >
            회원가입
          </button>
        </p>

        {/* 소셜 로그인 */}
        <div className="text-center">
          <hr className="my-6 border-gray-500" />
          <p className="text-sm mb-3">SNS 로그인</p>
          <div className="flex justify-center space-x-4">
            <button className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center">
              <img src={kakaoLogo} alt="카카오 로그인" className="w-8 h-8" />
            </button>
            <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
              <img src={appleLogo} alt="애플 로그인" className="w-8 h-8" />
            </button>
          </div>
        </div>

        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default Login;
