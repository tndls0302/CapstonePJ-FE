import { useParams } from "react-router-dom";
import PlaceDetail from "../components/PlaceDetail";
import ReviewSection from "../components/ReviewSection";

export default function PlaceDetailPage() {
  const { id } = useParams();

  // ▫️ui 확인용 더미 데이터
  const dummyPlace = {
    id,
    name: "만원국밥",
    address: "서울시 어딘가",
    description: "뜨끈한 국밥이 7,000원!",
    rating: 4.8,
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PlaceDetail place={dummyPlace} />
      <hr className="my-6" />
      <ReviewSection placeId={id} />
    </div>
  );
}
