import React from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";

export default function PlaceList({ places, onToggleBookmark }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {places.map((place) => (
        <div key={place.id} className="border rounded p-4 flex items-center">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-20 h-20 rounded mr-4"
          />
          <div className="flex-grow">
            <h3 className="font-bold">{place.name}</h3>
            <p>평점: {place.rating}</p>
          </div>
          <button onClick={() => onToggleBookmark(place.id)}>
            {place.isBookmarked ? (
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIconOutline className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
