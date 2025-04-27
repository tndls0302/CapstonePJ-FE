import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainModal from "../modals/mainModal";
import BookmarkModal from "../modals/bookmarkModal";
import Sidebar from "../components/sidebar";
import profileImage from "../assets/profile.png";

function MyPage() {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState(null);

  const openModal = (modalType) => {
    if (currentModal === modalType) {
      closeModal(); // 모달이 이미 열려있으면 다시 누르면 닫기
    } else {
      setCurrentModal(modalType);
      navigate(`/?modal=${modalType}`, { replace: true });
    }
  };

  const closeModal = () => {
    setCurrentModal(null); // currentModal을 null로 설정하여 모달을 닫기
    navigate("/", { replace: true }); // URL에서 모달 파라미터를 제거
  };

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
    reports: 10, // 제보 갯수 예시
  };

  // 평균 평점 계산 함수
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // 소수점 1자리로 반올림
  };

  const averageRating = calculateAverageRating(user.reviews); // 평균 평점 계산

  return (
    <div className="flex h-screen bg-palePink justify-center overflow-hidden">
      {" "}
      {/* 사이드바 */}
      <Sidebar openModal={openModal} />
      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex justify-center p-10 overflow-hidden">
        {" "}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex w-full max-w-screen-xl relative border-[10px] border-gray-300 overflow-hidden">
          {" "}
          {/* 바인더 링 */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-400 rounded-full"></div>
            ))}
          </div>
          {/* 프로필 섹션 */}
          <div className="w-1/3 text-center relative left-5">
            <div className="bg-gray-50 p-7 rounded-lg shadow-md border border-gray-300">
              <img
                src={profileImage} // 추후 {user.profileImage}로
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto border-4 border-gray-300 shadow-md"
              />
              <h2 className="mt-4 text-lg font-semibold bg-gray-200 px-4 py-2 inline-block rounded-md">
                {user.nickname}
              </h2>

              {/* 사용자 통계 섹션 */}
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clipboard-list text-vintagePink text-lg"></i>{" "}
                    <span className="text-base font-semibold text-gray-700">
                      총 리뷰 수
                    </span>
                  </div>
                  <span className="text-xl font-semibold text-highlightPink">
                    {user.reviews.length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-star text-vintagePink text-lg"></i>{" "}
                    <span className="text-base font-semibold text-gray-700">
                      평균 평점
                    </span>
                  </div>
                  <span className="text-xl font-semibold text-highlightPink">
                    ⭐ {averageRating}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-flag text-vintagePink text-lg"></i>{" "}
                    <span className="text-base font-semibold text-gray-700">
                      총 제보 수
                    </span>
                  </div>
                  <span className="text-xl font-semibold text-highlightPink">
                    {user.reports}
                  </span>
                </div>
              </div>
            </div>
            {/* 제보하기 버튼 */}
            <button
              onClick={() => openModal("report")}
              className="mt-4 mx-auto px-8 py-4 bg-vintagePink text-white rounded-full shadow-lg transform scale-90 hover:scale-95 transition-all duration-200"
            >
              맛집 제보하기
            </button>
          </div>
          {/* 활동기록 섹션 */}
          <div className="w-2/3 pl-16">
            <h2 className="text-xl font-semibold mb-5 pb-4 border-b border-dashed border-gray-400 my-4">
              📜 활동 기록
            </h2>
            <div className="space-y-5 bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-md max-h-[500px] overflow-y-auto">
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
      {/* 모달을 currentModal 상태에 따라 조건부렌더링 */}
      {currentModal === "main" && (
        <MainModal isOpen={true} onClose={closeModal} />
      )}
      {currentModal === "bookmark" && (
        <BookmarkModal isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
}

export default MyPage;
