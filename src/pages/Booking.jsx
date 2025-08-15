import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import roomsData from "../../public/data/rooms.json";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = roomsData.find((r) => r.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  // Kiểm tra đăng nhập
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Vui lòng đăng nhập để đặt phòng!");
      navigate("/login");
    } else {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }));
    }
  }, [navigate]);

  if (!room) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy phòng</h2>
        <Link to="/rooms" className="text-blue-500 hover:underline">
          Quay lại danh sách phòng
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Cảm ơn ${formData.name} đã đặt phòng ${room.name}!\nChúng tôi sẽ liên hệ qua email ${formData.email}`
    );

    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Đặt phòng: {room.name}</h1>
      <p className="text-gray-500 mb-8">
        Giá: {room.price.toLocaleString()}₫ / đêm
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
          readOnly
          className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          readOnly
          className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>

        <input
          type="number"
          name="guests"
          placeholder="Số khách"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          required
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
        >
          Xác nhận đặt phòng
        </button>
      </form>

      <div className="mt-4">
        <Link to={`/room/${room.id}`} className="text-blue-500 hover:underline">
          ← Quay lại chi tiết phòng
        </Link>
      </div>
    </div>
  );
}
