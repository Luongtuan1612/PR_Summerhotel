import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import RoomCard from "../components/RoomCard";
import roomsData from "../../public/data/rooms.json";

export default function Home() {
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Xử lý tìm kiếm
  const handleSearch = ({ location, adults }) => {
    const result = roomsData.filter(
      (room) => room.location === location && room.capacityAdults >= adults
    );
    setFilteredRooms(result);
  };

  return (
    <div>
      {/* Banner */}
      <section className="relative h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
          alt="SummerHotel Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay đồng bộ */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Chào mừng đến với SummerHotel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg md:text-xl max-w-2xl"
          >
            Trải nghiệm kỳ nghỉ sang trọng, dịch vụ tận tâm và không gian thư giãn tuyệt vời.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-10 w-full max-w-3xl"
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Kết quả tìm kiếm */}
      {filteredRooms.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Kết quả tìm kiếm
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* Phòng nổi bật */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Phòng nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {roomsData.slice(0, 3).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
}
