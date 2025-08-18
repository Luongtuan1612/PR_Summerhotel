import { useLocation } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import roomsData from "../../public/data/rooms.json";

export default function Rooms() {
  // Lấy query từ URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const locationFilter = queryParams.get("location");

  // Lọc theo location (nếu có)
  const filteredRooms = roomsData.filter((room) => {
    return !locationFilter || room.location === locationFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-[50px]">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        {locationFilter ? `Phòng tại ${locationFilter}` : "Danh sách phòng"}
      </h1>

      {/* Danh sách phòng */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>Không tìm thấy phòng phù hợp.</p>
        </div>
      )}
    </div>
  );
}
