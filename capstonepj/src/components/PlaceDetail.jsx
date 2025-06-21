/*
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import {
  getReviewsByPlaceId as getPlaceReviews,
  postReview,
} from "../api/review";

export default function PlaceDetail({ place }) {
  const placeId = place?.id;

  return (
    <section className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {place.name || "맛집 상세 정보"}
      </h1>

      <div className="mb-4 border p-4 rounded bg-white shadow-sm">
        <p>
          <strong>맛집 ID:</strong> {placeId}
        </p>
        <p>
          <strong>주소:</strong> {place.address || "주소 정보 없음"}
        </p>
        <p>
          <strong>설명:</strong> {place.description || "설명 없음"}
        </p>
        <p>
          <strong>평점:</strong> {place.rating || "0.0"}
        </p>
      </div>

      <ReviewSection placeId={placeId} />
    </section>
  );
}

function ReviewSection({ placeId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const data = await getPlaceReviews(placeId);
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("리뷰를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (placeId) fetchReviews();
  }, [placeId]);

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("별점과 리뷰 내용을 모두 입력해주세요.");
      return;
    }

    const dto = {
      placeId,
      rating,
      content: comment,
    };

    setLoading(true);
    try {
      await postReview(dto, []); // 이미지 없는 기본 제출
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error(err);
      setError("리뷰 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <section className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">리뷰 작성 및 목록</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8 border rounded-lg p-6 shadow-sm"
      >
        <div className="mb-3">
          <p className="font-semibold mb-1">별점</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`text-3xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                } focus:outline-none`}
                aria-label={`${star}점 별점`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="font-semibold mb-1 block">
            리뷰 내용
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="맛집에 대한 솔직한 후기를 작성해주세요."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 disabled:opacity-50 transition"
        >
          {loading ? "작성중..." : "리뷰 작성"}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center font-semibold">{error}</p>
        )}
      </form>

      <div>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">
            아직 작성된 리뷰가 없습니다.
          </p>
        ) : (
          <ul className="space-y-6">
            {reviews.map(
              ({
                reviewId,
                rating,
                content,
                createdAt,
                memberName,
                memberImage,
              }) => (
                <li
                  key={reviewId}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{memberName || "익명"}</p>
                    <p className="text-yellow-400 font-bold">
                      {"★".repeat(rating)}
                      {"☆".repeat(5 - rating)}
                    </p>
                  </div>
                  <p className="mb-2 whitespace-pre-line">{content}</p>
                  <p className="text-xs text-gray-400 text-right">
                    {formatDate(createdAt)}
                  </p>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </section>
  );
}*/
