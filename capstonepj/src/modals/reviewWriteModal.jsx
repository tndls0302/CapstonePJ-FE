import React, { useState } from "react";
import { postReview } from "../api/review";

function ReviewWriteModal({ placeId, onClose }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    const dto = { placeId, content, rating };
    const formData = new FormData();
    formData.append(
      "reviewSaveReqDto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    images.forEach((img) => formData.append("reviewImage", img));

    try {
      await postReview(formData);
      alert("리뷰가 등록되었습니다!");
      onClose();
    } catch (err) {
      console.error("리뷰 등록 실패", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-deepBlue">
          리뷰 작성
        </h2>

        <textarea
          className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          rows={5}
          placeholder="리뷰를 작성해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mb-4 flex items-center space-x-4">
          <label className="font-semibold text-gray-700">⭐ 평점:</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 px-3 py-1 rounded-md w-20 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <label className="block mb-4 text-gray-700 font-semibold cursor-pointer">
          이미지 첨부
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt={`preview-${i}`}
                className="w-20 h-20 object-cover rounded-md border border-gray-300"
              />
            ))}
          </div>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-vintagePink text-white hover:bg-pink-700 transition"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewWriteModal;
