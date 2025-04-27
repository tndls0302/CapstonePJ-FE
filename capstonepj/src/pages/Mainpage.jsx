import React, { useEffect, useState } from "react";
import MainMap from "../components/MainMap";
import { useLocation, useNavigate } from "react-router-dom";
import MainModal from "../modals/mainModal";
import BookmarkModal from "../modals/bookmarkModal";
import Sidebar from "../components/sidebar";

function Mainpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modalType = searchParams.get("modal"); // 쿼리 파라미터에서 modal값 가져옴
    setCurrentModal(modalType);
  }, [location.search]); // location.search가 변경될 때마다 이펙트 실행

  const closeModal = () => {
    setCurrentModal(null);
    navigate("/", { replace: true }); // replace로 URL 변경
  };

  const openModal = (modalType) => {
    if (currentModal === modalType) {
      closeModal(); // 모달이 열려있다면 다시 눌렀을 때 닫기
    } else {
      // 새 모달을 열 때는 URL에 modal 쿼리 추가
      setCurrentModal(modalType);
      navigate(`/?modal=${modalType}`, { replace: true });
    }
  };

  return (
    <div className="flex h-screen w-screen relative">
      {/* 사이드바 */}
      <Sidebar openModal={openModal} />

      {/* 카카오맵 */}
      <div className="flex-1">
        <MainMap />
      </div>

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

export default Mainpage;
