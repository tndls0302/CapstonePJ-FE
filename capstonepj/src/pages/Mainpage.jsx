import React from "react";
import MainMap from "../components/MainMap";

function Mainpage() {
  return (
    <div className="flex h-screen w-screen">
      {/* 사이드바 */}
      <aside className="w-24 bg-zinc-700 text-white flex flex-col items-center py-10 rounded-r-2xl shadow-lg">
        <div className="flex flex-col items-center space-y-8">
          <button className="text-2xl hover:scale-110 transition-transform">
            ✈️
          </button>
          <button className="text-2xl hover:scale-110 transition-transform">
            ⭐
          </button>
          <button className="text-2xl hover:scale-110 transition-transform">
            ❤️
          </button>
          <button className="text-2xl hover:scale-110 transition-transform">
            🍀
          </button>
        </div>
        <button className="text-2xl hover:scale-110 transition-transform mt-auto pt-10">
          ⚙️
        </button>
      </aside>

      {/* 카카오맵 불러오기 */}
      <div className="flex-1">
        <MainMap />
      </div>
    </div>
  );
}

export default Mainpage;
