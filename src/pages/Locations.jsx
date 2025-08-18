import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import roomsData from "../../public/data/rooms.json";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Lấy query từ URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const locationFilter = queryParams.get("location");

  // Lọc phòng
  const filteredRooms = roomsData.filter((room) => {
    const matchName = room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDesc = room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice =
      (!minPrice || room.price >= parseInt(minPrice)) &&
      (!maxPrice || room.price <= parseInt(maxPrice));
    const matchLocation = !locationFilter || room.location === locationFilter;

    return (matchName || matchDesc) && matchPrice && matchLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 pt-[50px]">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {locationFilter ? `Phòng tại ${locationFilter}` : "Danh sách phòng"}
      </h1>

      {/* Bộ lọc */}
      {/* (giữ nguyên code filter của bạn ở đây) */}

      {/* Danh sách phòng */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không tìm thấy phòng phù hợp.</p>
      )}
    </div>
  );
}
