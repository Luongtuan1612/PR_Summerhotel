import React from "react";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

const RoomCard = ({ room }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{room.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{room.description}</p>
        <p className="mt-2 font-semibold text-blue-600">
          {formatPrice(room.price)} / đêm
        </p>
        <Link
          to={`/room/${room.id}`}
          className="mt-3 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
