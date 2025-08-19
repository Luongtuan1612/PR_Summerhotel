import React from "react";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import { MapPin } from "lucide-react";

const RoomCard = ({ room }) => {
  return (
    <div className="group bg-white border rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      {/* Hình ảnh */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
      </div>

      {/* Nội dung */}
      <div className="p-5 flex flex-col h-full">
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">
          {room.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{room.description}</p>

        {room.location && (
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <MapPin size={16} className="mr-1" />
            {room.location}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold text-blue-600">
            {formatPrice(room.price)} <span className="text-sm text-gray-500">/ đêm</span>
          </p>
          <Link
            to={`/room/${room.id}`}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
