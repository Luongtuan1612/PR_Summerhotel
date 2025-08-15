import { useParams, Link } from "react-router-dom";
import roomsData from "../../public/data/rooms.json";

export default function RoomDetail() {
  const { id } = useParams();
  const room = roomsData.find((r) => r.id === parseInt(id));

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Ảnh phòng */}
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-[400px] object-cover rounded-lg shadow-lg"
      />

      {/* Thông tin */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold">{room.name}</h1>
        <p className="mt-2 text-gray-500">{room.description}</p>
        <p className="mt-4 text-2xl font-semibold text-blue-600">
          {room.price.toLocaleString()}₫ / đêm
        </p>

        {/* Tiện nghi */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Tiện nghi:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {room.amenities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Nút đặt phòng */}
        <Link
  to={`/booking/${room.id}`}
  className="inline-block mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
>
  Đặt phòng ngay
</Link>

        {/* Quay lại */}
        <div className="mt-4">
          <Link to="/rooms" className="text-blue-500 hover:underline">
            ← Quay lại danh sách phòng
          </Link>
        </div>
      </div>
    </div>
  );
}
