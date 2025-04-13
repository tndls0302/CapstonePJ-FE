import React from "react";

function MyPage() {
  const user = {
    nickname: "행복한 먹보",
    profileImage: "/assets/profile.png",
    reviews: [
      {
        id: 1,
        images: ["/assets/food1.jpg", "/assets/food2.jpg", "/assets/food3.jpg"],
        text: "맛있어요~ 😋",
        likes: 12,
      },
      {
        id: 2,
        images: ["/assets/food1.jpg", "/assets/food2.jpg", "/assets/food3.jpg"],
        text: "정말 맛있는 음식이었어요!",
        likes: 20,
      },
      {
        id: 3,
        images: ["/assets/food1.jpg", "/assets/food2.jpg", "/assets/food3.jpg"],
        text: "또 방문할 예정입니다:)",
        likes: 30,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-palePink flex justify-center">
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

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex justify-center p-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 flex w-[1200px] relative border-[10px] border-gray-300">
          {/* 바인더 링 */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-400 rounded-full"></div>
            ))}
          </div>

          {/* 프로필 섹션 */}
          <div className="w-1/3 text-center relative left-5">
            <div className="bg-gray-50 p-5 rounded-lg shadow-md border border-gray-300">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto border-4 border-gray-300 shadow-md"
              />
              <h2 className="mt-4 text-lg font-semibold bg-gray-200 px-4 py-2 inline-block rounded-md">
                {user.nickname}
              </h2>
            </div>
          </div>

          {/* 활동기록 섹션 */}
          <div className="w-2/3 pl-16">
            <h2 className="text-xl font-semibold mb-5 pb-4 border-b border-dashed border-gray-400 my-4">
              📜 활동 기록
            </h2>
            <div className="space-y-5 bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-md">
              {user.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative before:absolute before:top-0 before:left-1/2 before:w-10 before:h-10 before:bg-gray-100 before:rounded-full before:-translate-x-1/2"
                >
                  <div className="flex space-x-2">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`review-${idx}`}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-800 text-sm italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    👍 {review.likes}명 공감
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* 리뷰 리스트 */
function ActivityCard() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="font-semibold">맛있어요~ 🤤</p>
      <div className="flex mt-2 space-x-2">
        <img
          src="/assets/food1.jpg"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <img
          src="/assets/food2.jpg"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <img
          src="/assets/food3.jpg"
          className="w-24 h-24 rounded-lg object-cover"
        />
      </div>
      <button className="mt-2 flex items-center text-gray-600 text-sm">
        👍 공감하기 12
      </button>
    </div>
  );
}

/* 사이드바 버튼 */
function SidebarButton({ icon, active, className }) {
  return (
    <button
      className={`mb-6 text-2xl ${active ? "text-yellow-400" : "text-white"} ${className}`}
    >
      {icon}
    </button>
  );
}

export default MyPage;
