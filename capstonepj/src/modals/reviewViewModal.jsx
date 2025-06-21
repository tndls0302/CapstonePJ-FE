import React, { useEffect, useState } from "react";
import { getReviewsByPlaceId } from "../api/review";

function ReviewViewModal({ placeId, onClose }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await getReviewsByPlaceId(placeId);
        setReviews(res);
      } catch (err) {
        console.error("리뷰 불러오기 실패", err);
      }
    }
    fetchReviews();
  }, [placeId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="모달 닫기"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-deepBlue">
          리뷰 보기
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">아직 리뷰가 없습니다.</p>
        ) : (
          <ul className="space-y-6">
            {reviews.map((review) => (
              <li
                key={review.reviewId}
                className="border-b pb-4 last:border-none"
              >
                <div className="flex items-center mb-2 space-x-4">
                  <img
                    src={review.memberImage || "/default-profile.png"}
                    alt={review.memberName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-lg">
                      {review.memberName || "익명"}
                    </p>
                    <p className="text-yellow-400 font-bold">
                      {"★".repeat(review.rating)}{" "}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>
                </div>

                <p className="whitespace-pre-line mb-2">{review.content}</p>

                {review.feedImageUrls?.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {review.feedImageUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`review-img-${i}`}
                        className="w-24 h-24 object-cover rounded-md shadow"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReviewViewModal;
