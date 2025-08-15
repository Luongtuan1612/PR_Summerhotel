import { useState } from "react";
import RoomCard from "../components/RoomCard";
import roomsData from "../../public/data/rooms.json";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredRooms = roomsData.filter((room) => {
    const matchName = room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDesc = room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice =
      (!minPrice || room.price >= parseInt(minPrice)) &&
      (!maxPrice || room.price <= parseInt(maxPrice));
    return (matchName || matchDesc) && matchPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh sách phòng</h1>

      {/* Bộ lọc */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm phòng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 col-span-2"
        />
        <input
          type="number"
          placeholder="Giá tối thiểu"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Giá tối đa"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

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
