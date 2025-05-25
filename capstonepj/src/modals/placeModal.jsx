import React from "react";

const PlaceModal = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-4 text-gray-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 이미지 */}
        {place.photoUrls && (
          <img
            src={place.photoUrls}
            alt="음식점 사진"
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}

        {/* 음식점 이름 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {place.businessName}
        </h2>

        {/* 주소 */}
        <p className="text-sm text-gray-500 mb-2">{place.address}</p>

        {/* 메뉴 */}
        <div className="text-sm text-gray-700 mb-2">
          {place.menu1 && (
            <p>
              {place.menu1} - ₩{Number(place.price1).toLocaleString()}
            </p>
          )}
          {place.menu2 && (
            <p>
              {place.menu2} - ₩{Number(place.price2).toLocaleString()}
            </p>
          )}
        </div>

        {/* 기타 정보 */}
        <div className="text-xs text-gray-500">{place.weekdayDescriptions}</div>
      </div>
    </div>
  );
};

export default PlaceModal;
