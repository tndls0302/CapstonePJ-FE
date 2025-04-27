import React, { useState } from "react";

function ReportModal({ isOpen, onClose }) {
  const [reportText, setReportText] = useState("");

  const handleReportChange = (e) => {
    setReportText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("제보가 접수되었습니다!");
    onClose(); // 제보 후 모달 닫기
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">제보하기</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={reportText}
            onChange={handleReportChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="제보 내용을 입력해주세요."
          ></textarea>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-sm rounded-md"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md"
            >
              제보하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;
