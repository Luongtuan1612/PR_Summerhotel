// src/components/SearchBar.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaChild, FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [location, setLocation] = useState("Hà Nội");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSearchClick = () => {
    onSearch({ location, checkIn, checkOut, adults, children });
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
    >
      {/* Địa điểm */}
      <div className="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-300 flex-1">
        <FaMapMarkerAlt className="text-gray-500" />
        <div className="flex flex-col flex-1">
          <label className="text-xs font-semibold text-gray-500">Địa điểm</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="outline-none bg-transparent text-sm text-gray-800"
          >
            <option>Hà Nội</option>
            <option>Hồ Chí Minh</option>
            <option>Đà Nẵng</option>
            <option>Nha Trang</option>
          </select>
        </div>
      </div>

      {/* Ngày nhận - trả */}
      <div className="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-300">
        <FaCalendarAlt className="text-gray-500" />
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500">Ngày nhận - Trả phòng</label>
          <div className="flex items-center gap-1 text-sm text-gray-800">
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent outline-none"
            />
            <span>-</span>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Người lớn */}
      <div className="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-300">
        <FaUser className="text-gray-500" />
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500">Người lớn</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="bg-transparent outline-none text-sm text-gray-800"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Trẻ em */}
      <div className="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-300">
        <FaChild className="text-gray-500" />
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500">Trẻ em</label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="bg-transparent outline-none text-sm text-gray-800"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nút tìm kiếm */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSearchClick}
        className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 hover:bg-blue-700 transition-all"
      >
        <FaSearch />
      </motion.button>
    </motion.div>
  );
}
