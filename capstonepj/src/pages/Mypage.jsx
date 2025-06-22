import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainModal from "../modals/mainModal";
import BookmarkModal from "../modals/bookmarkModal";
import Sidebar from "../components/sidebar";
import { getMyPage } from "../api/members";
import { getMyReviews } from "../api/review";

function MyPage() {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState(null);
  const [myPageData, setMyPageData] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
  const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyPage();
        console.log("마이페이지 데이터:", data);

        setMyPageData(data);

        const reviewData = await getMyReviews();
        console.log("내 리뷰 데이터:", reviewData);

        setMyReviews(reviewData.reviews || []);
      } catch (error) {
        console.error("마이페이지 정보 불러오기 실패", error);
        if (error.response) {
          console.error("응답 데이터:", error.response.data);
          console.error("응답 상태 코드:", error.response.status);
        }
      }
    }
    fetchData();
  }, []);

  const openModal = (modalType) => {
    if (currentModal === modalType) {
      closeModal();
    } else {
      setCurrentModal(modalType);
      navigate(`/?modal=${modalType}`, { replace: true });
    }
  };

  const closeModal = () => {
    setCurrentModal(null);
    navigate("/main", { replace: true });
  };

  if (!myPageData) return <div className="text-center p-8">로딩 중...</div>;

  return (
    <div className="flex h-screen w-screen bg-palePink overflow-hidden">
      <Sidebar openModal={openModal} />
      <main className="flex-1 flex justify-center items-center overflow-hidden">
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col lg:flex-row w-full max-w-screen-xl h-[90%] border-[10px] border-gray-300 relative">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-400 rounded-full"></div>
            ))}
          </div>

          {/* 프로필 섹션 */}
          <div className="lg:w-1/3 text-center mb-6 lg:mb-0 lg:mr-10 lg:ml-10 overflow-y-auto">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
              <img
                src={
                  myPageData.picture && myPageData.picture.startsWith("http")
                    ? myPageData.picture
                    : `${BASE_URL}${myPageData.picture}`
                }
                alt="프로필 이미지"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-gray-300 shadow-md"
              />

              <h2 className="mt-4 text-lg font-semibold bg-gray-200 px-4 py-2 inline-block rounded-md">
                {myPageData.nickName}
              </h2>

              <div className="mt-4 space-y-4 text-left">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 text-sm font-medium">
                  <span className="text-gray-700">총 리뷰 수</span>
                  <span className="text-highlightPink text-xl font-semibold">
                    {myPageData.reviewCount}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 text-sm font-medium">
                  <span className="text-gray-700">평균 평점</span>
                  <span className="text-highlightPink text-xl font-semibold">
                    ⭐ {myPageData.ratingAverage.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 text-sm font-medium">
                  <span className="text-gray-700">총 제보 수</span>
                  <span className="text-highlightPink text-xl font-semibold">
                    {myPageData.reportCount}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openModal("report")}
              className="mt-6 w-72 px-6 py-3 bg-vintagePink text-white rounded-full shadow-md hover:scale-105 transition"
            >
              맛집 제보하기
            </button>
          </div>

          {/* 활동기록 */}
          <div className="lg:w-2/3 lg:ml-10 lg:mr-10 flex flex-col justify-between overflow-y-auto">
            <div>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-dashed border-gray-400">
                📜 활동 기록
              </h2>
              {/* 내 리뷰 리스트 */}
              {myReviews.length === 0 ? (
                <p className="text-gray-500 italic">
                  아직 작성한 리뷰가 없어요.
                </p>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {myReviews.map((review) => (
                    <div
                      key={review.reviewId}
                      className="p-4 bg-white rounded-xl shadow border border-gray-200"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          {review.createdAt.slice(0, 10)}
                        </span>
                        <span className="text-sm text-yellow-500">
                          ⭐ {review.rating}
                        </span>
                      </div>
                      <p className="text-gray-800">{review.content}</p>
                      {review.feedImageUrls?.length > 0 && (
                        <div className="flex mt-2 gap-2">
                          {review.feedImageUrls.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt={`리뷰 이미지 ${i + 1}`}
                              className="w-20 h-20 object-cover rounded border border-gray-300"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col text-sm font-medium bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
              <span className="text-base font-semibold text-gray-700">
                등급: {myPageData.grade}
              </span>
              <span className="text-sm text-gray-600">
                다음 등급까지: {myPageData.reviewToNextGrade}
              </span>
              <div className="w-full bg-gray-200 h-3 mt-2 rounded-full">
                <div
                  className="bg-vintagePink h-3 rounded-full"
                  style={{ width: `${myPageData.progressRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
